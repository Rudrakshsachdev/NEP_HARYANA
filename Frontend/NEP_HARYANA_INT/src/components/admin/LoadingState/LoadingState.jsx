import styles from "./LoadingState.module.css";

export default function LoadingState({ message = "Loading data..." }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
}
