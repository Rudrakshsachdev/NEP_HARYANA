from collections import defaultdict
from datetime import timedelta

from django.db.models import Prefetch
from django.utils import timezone

from apps.authentication.models import College, User
from apps.forms.models import IndicatorEntry, NominationHeader
from apps.scoring.mapper import compute_nomination_score, count_completed_indicators

TOTAL_INDICATORS = 20
SCORE_RANGES = [
    ("0-25%", 0, 25),
    ("26-50%", 26, 50),
    ("51-75%", 51, 75),
    ("76-100%", 76, 100),
]


def _headers_queryset():
    return NominationHeader.objects.select_related("user", "user__college").prefetch_related(
        Prefetch("indicators", queryset=IndicatorEntry.objects.all())
    )


def _application_status(header):
    if header.is_submitted:
        return "submitted"
    completed = count_completed_indicators(header)
    if completed > 0:
        return "in_progress"
    return "draft"


def _serialize_application(header, scoring=None):
    if scoring is None:
        scoring = compute_nomination_score(header)
    completed = count_completed_indicators(header)
    user = header.user

    return {
        "id": header.id,
        "form_id": str(header.form_id),
        "institution_name": header.institution_name,
        "aishe_code": header.aishe_code,
        "institution_type": header.institution_type,
        "is_submitted": header.is_submitted,
        "status": _application_status(header),
        "principal_name": user.full_name if user else "",
        "principal_email": user.email if user else "",
        "indicators_completed": completed,
        "total_indicators": TOTAL_INDICATORS,
        "grand_total": scoring.get("grand_total"),
        "percentage": scoring.get("percentage"),
        "award_category": scoring.get("award_category"),
        "existing_total": scoring.get("existing_total"),
        "proposed_total": scoring.get("proposed_total"),
        "created_at": header.created_at,
        "updated_at": header.updated_at,
    }


def get_all_applications():
    applications = []
    for header in _headers_queryset().order_by("-updated_at"):
        applications.append(_serialize_application(header))
    return applications


def get_institutions_summary():
    colleges = College.objects.all().order_by("name")
    headers_by_college_id = {}
    headers_by_aishe = {}

    for header in _headers_queryset():
        if header.user and header.user.college_id:
            headers_by_college_id[header.user.college_id] = header
        headers_by_aishe[header.aishe_code.strip().upper()] = header

    institutions = []
    for college in colleges:
        header = headers_by_college_id.get(college.id) or headers_by_aishe.get(
            college.aishe_code.strip().upper()
        )
        if header:
            scoring = compute_nomination_score(header)
            institutions.append(
                {
                    "college_id": college.id,
                    "name": college.name,
                    "aishe_code": college.aishe_code,
                    "has_application": True,
                    "form_id": str(header.form_id),
                    "application_status": _application_status(header),
                    "is_submitted": header.is_submitted,
                    "indicators_completed": count_completed_indicators(header),
                    "total_indicators": TOTAL_INDICATORS,
                    "grand_total": scoring.get("grand_total"),
                    "percentage": scoring.get("percentage"),
                    "award_category": scoring.get("award_category"),
                    "updated_at": header.updated_at,
                }
            )
        else:
            institutions.append(
                {
                    "college_id": college.id,
                    "name": college.name,
                    "aishe_code": college.aishe_code,
                    "has_application": False,
                    "form_id": None,
                    "application_status": "not_started",
                    "is_submitted": False,
                    "indicators_completed": 0,
                    "total_indicators": TOTAL_INDICATORS,
                    "grand_total": None,
                    "percentage": None,
                    "award_category": None,
                    "updated_at": None,
                }
            )

    return institutions


def get_dashboard_stats():
    headers = list(_headers_queryset())
    total_colleges = College.objects.count()
    registered_principals = User.objects.filter(role="principal").count()
    submitted = sum(1 for h in headers if h.is_submitted)
    in_progress = sum(1 for h in headers if not h.is_submitted and count_completed_indicators(h) > 0)
    draft = len(headers) - submitted - in_progress

    percentages = []
    award_distribution = defaultdict(int)

    for header in headers:
        scoring = compute_nomination_score(header)
        pct = scoring.get("percentage")
        if pct is not None:
            percentages.append(float(pct))
        category = scoring.get("award_category") or "Unrated"
        award_distribution[category] += 1

    average_score = round(sum(percentages) / len(percentages), 1) if percentages else None

    return {
        "total_colleges": total_colleges,
        "total_applications": len(headers),
        "submitted_applications": submitted,
        "in_progress_applications": in_progress,
        "draft_applications": draft,
        "not_started_colleges": max(total_colleges - len(headers), 0),
        "registered_principals": registered_principals,
        "average_score_percentage": average_score,
        "award_distribution": dict(award_distribution),
    }


def get_analytics():
    headers = list(_headers_queryset().order_by("-updated_at"))
    stats = get_dashboard_stats()

    institution_counts = []
    for header in headers:
        institution_counts.append(
            {
                "name": header.institution_name,
                "aishe_code": header.aishe_code,
                "status": _application_status(header),
                "is_submitted": header.is_submitted,
            }
        )

    score_distribution = []
    range_counts = {label: 0 for label, _, _ in SCORE_RANGES}
    for header in headers:
        scoring = compute_nomination_score(header)
        pct = scoring.get("percentage")
        if pct is None:
            continue
        pct = float(pct)
        for label, low, high in SCORE_RANGES:
            if low <= pct <= high:
                range_counts[label] += 1
                break

    for label, _, _ in SCORE_RANGES:
        score_distribution.append({"range": label, "count": range_counts[label]})

    status_breakdown = [
        {"status": "submitted", "count": stats["submitted_applications"]},
        {"status": "in_progress", "count": stats["in_progress_applications"]},
        {"status": "draft", "count": stats["draft_applications"]},
        {"status": "not_started", "count": stats["not_started_colleges"]},
    ]

    now = timezone.now()
    trend_buckets = {}
    for i in range(5, -1, -1):
        month_start = (now.replace(day=1) - timedelta(days=30 * i)).replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )
        key = month_start.strftime("%Y-%m")
        trend_buckets[key] = 0

    for header in headers:
        key = header.created_at.strftime("%Y-%m")
        if key in trend_buckets:
            trend_buckets[key] += 1

    submission_trend = [
        {"month": month, "count": count} for month, count in sorted(trend_buckets.items())
    ]

    recent_activity = []
    for header in headers[:12]:
        recent_activity.append(
            {
                "type": "submission" if header.is_submitted else "update",
                "institution_name": header.institution_name,
                "aishe_code": header.aishe_code,
                "status": _application_status(header),
                "timestamp": header.updated_at,
            }
        )

    top_institutions = []
    scored = []
    for header in headers:
        scoring = compute_nomination_score(header)
        scored.append(
            {
                "institution_name": header.institution_name,
                "aishe_code": header.aishe_code,
                "percentage": scoring.get("percentage"),
                "grand_total": scoring.get("grand_total"),
                "award_category": scoring.get("award_category"),
            }
        )
    scored.sort(key=lambda x: (x["percentage"] or 0), reverse=True)
    top_institutions = scored[:5]

    return {
        "stats": stats,
        "institution_counts": institution_counts,
        "score_distribution": score_distribution,
        "status_breakdown": status_breakdown,
        "submission_trend": submission_trend,
        "recent_activity": recent_activity,
        "top_institutions": top_institutions,
        "award_distribution": stats["award_distribution"],
    }
