import { useMemo, useState } from "react";
import ApplicationTable from "../../../components/admin/ApplicationTable/ApplicationTable";
import LoadingState from "../../../components/admin/LoadingState/LoadingState";
import styles from "../AdminDashboard.module.css";

export default function ApplicationsSection({ applications, loading, error }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = applications || [];
    if (statusFilter !== "all") {
      list = list.filter((app) => app.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (app) =>
          app.institution_name?.toLowerCase().includes(q) ||
          app.aishe_code?.toLowerCase().includes(q) ||
          app.principal_name?.toLowerCase().includes(q) ||
          app.principal_email?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [applications, search, statusFilter]);

  if (loading) {
    return <LoadingState message="Loading applications..." />;
  }

  return (
    <>
      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.filterBar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search by institution, AISHE code, or principal..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={styles.filterSelect}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="in_progress">In Progress</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <ApplicationTable applications={filtered} />
    </>
  );
}
