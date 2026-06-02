from datetime import timedelta

from django.utils import timezone

from apps.authentication.models import College, User


def get_all_applications():
    return []


def get_institutions_summary():
    colleges = College.objects.all().order_by("name")
    institutions = []

    for college in colleges:
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
                "total_indicators": 0,
                "grand_total": None,
                "percentage": None,
                "award_category": None,
                "updated_at": None,
            }
        )

    return institutions


def get_dashboard_stats():
    total_colleges = College.objects.count()
    registered_principals = User.objects.filter(role="principal").count()

    return {
        "total_colleges": total_colleges,
        "total_applications": 0,
        "submitted_applications": 0,
        "in_progress_applications": 0,
        "draft_applications": 0,
        "not_started_colleges": total_colleges,
        "registered_principals": registered_principals,
        "average_score_percentage": None,
        "award_distribution": {},
    }


def get_analytics():
    stats = get_dashboard_stats()
    now = timezone.now()

    trend_buckets = {}
    for i in range(5, -1, -1):
        month_start = (now.replace(day=1) - timedelta(days=30 * i)).replace(
            day=1, hour=0, minute=0, second=0, microsecond=0
        )
        key = month_start.strftime("%Y-%m")
        trend_buckets[key] = 0

    submission_trend = [
        {"month": month, "count": count} for month, count in sorted(trend_buckets.items())
    ]

    return {
        "stats": stats,
        "institution_counts": [],
        "score_distribution": [],
        "status_breakdown": [
            {"status": "submitted", "count": 0},
            {"status": "in_progress", "count": 0},
            {"status": "draft", "count": 0},
            {"status": "not_started", "count": stats["not_started_colleges"]},
        ],
        "submission_trend": submission_trend,
        "recent_activity": [],
        "top_institutions": [],
        "award_distribution": {},
    }
