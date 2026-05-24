import { useMemo, useState } from "react";
import InstitutionList from "../../../components/admin/InstitutionList/InstitutionList";
import StatsCard from "../../../components/admin/StatsCard/StatsCard";
import LoadingState from "../../../components/admin/LoadingState/LoadingState";
import styles from "../AdminDashboard.module.css";

export default function InstitutionsSection({ institutions, loading, error }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const summary = useMemo(() => {
    const list = institutions || [];
    return {
      total: list.length,
      withApp: list.filter((i) => i.has_application).length,
      submitted: list.filter((i) => i.application_status === "submitted").length,
      notStarted: list.filter((i) => i.application_status === "not_started").length,
    };
  }, [institutions]);

  const filtered = useMemo(() => {
    let list = institutions || [];
    if (statusFilter !== "all") {
      list = list.filter((inst) => inst.application_status === statusFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (inst) =>
          inst.name?.toLowerCase().includes(q) ||
          inst.aishe_code?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [institutions, search, statusFilter]);

  if (loading) {
    return <LoadingState message="Loading institutions..." />;
  }

  return (
    <>
      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.kpiGrid}>
        <StatsCard label="Total Institutions" value={summary.total} accent="blue" />
        <StatsCard label="With Applications" value={summary.withApp} accent="green" />
        <StatsCard label="Submitted" value={summary.submitted} accent="purple" />
        <StatsCard label="Not Started" value={summary.notStarted} accent="amber" />
      </div>

      <div className={styles.filterBar}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search institutions..."
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
          <option value="not_started">Not Started</option>
        </select>
      </div>

      <InstitutionList institutions={filtered} />
    </>
  );
}
