import StatsCard from "../../../components/admin/StatsCard/StatsCard";
import BarChart from "../../../components/admin/charts/BarChart";
import DonutChart from "../../../components/admin/charts/DonutChart";
import TrendChart from "../../../components/admin/charts/TrendChart";
import ApplicationTable from "../../../components/admin/ApplicationTable/ApplicationTable";
import LoadingState from "../../../components/admin/LoadingState/LoadingState";
import EmptyState from "../../../components/admin/EmptyState/EmptyState";
import styles from "../AdminDashboard.module.css";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OverviewSection({ stats, analytics, applications, loading, error }) {
  if (loading) {
    return <LoadingState message="Loading dashboard overview..." />;
  }

  const statusBreakdown =
    analytics?.status_breakdown?.map((item) => ({
      label: item.status.replace("_", " "),
      count: item.count,
    })) || [];

  const scoreDistribution = analytics?.score_distribution || [];
  const recentActivity = analytics?.recent_activity || [];
  const recentApps = applications?.slice(0, 5) || [];

  return (
    <>
      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.kpiGrid}>
        <StatsCard
          label="Total Applications"
          value={stats?.total_applications ?? 0}
          hint={`${stats?.submitted_applications ?? 0} submitted`}
          accent="blue"
        />
        <StatsCard
          label="Registered Colleges"
          value={stats?.total_colleges ?? 0}
          hint={`${stats?.not_started_colleges ?? 0} not started`}
          accent="purple"
        />
        <StatsCard
          label="In Progress"
          value={stats?.in_progress_applications ?? 0}
          hint={`${stats?.draft_applications ?? 0} drafts`}
          accent="amber"
        />
        <StatsCard
          label="Average Score"
          value={
            stats?.average_score_percentage != null
              ? `${stats.average_score_percentage}%`
              : "—"
          }
          hint="Across all scored applications"
          accent="green"
        />
      </div>

      <div className={styles.chartsGrid}>
        <BarChart
          title="Application Status"
          subtitle="Breakdown by submission stage"
          data={statusBreakdown}
          labelKey="label"
          valueKey="count"
        />
        <DonutChart
          title="Score Distribution"
          subtitle="Institutions by score percentage range"
          data={scoreDistribution.map((d) => ({
            label: d.range,
            count: d.count,
          }))}
        />
      </div>

      <div className={styles.chartsGrid}>
        <TrendChart
          title="Application Trend"
          subtitle="New applications over the last 6 months"
          data={analytics?.submission_trend || []}
        />
        <div className={styles.sectionCard}>
          <h3>Recent Activity</h3>
          {recentActivity.length === 0 ? (
            <EmptyState
              title="No recent activity"
              description="Updates from institutions will appear here."
            />
          ) : (
            <ul className={styles.activityList}>
              {recentActivity.map((item, index) => (
                <li key={`${item.aishe_code}-${index}`} className={styles.activityItem}>
                  <div>
                    <strong>{item.institution_name}</strong>
                    <span>
                      {item.type === "submission" ? "Submitted application" : "Updated application"}
                    </span>
                  </div>
                  <div className={styles.activityMeta}>
                    <span>{item.status?.replace("_", " ")}</span>
                    <time>{formatDate(item.timestamp)}</time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.sectionCard}>
        <h3>Recent Applications</h3>
        <ApplicationTable applications={recentApps} />
      </div>
    </>
  );
}
