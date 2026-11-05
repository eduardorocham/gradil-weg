import styles from './StatCard.module.css';

export default function StatCard({ label, value, detail, compact }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${compact ? styles.compact : ''}`}>
        {value}
      </div>
      {detail && <div className={styles.detail}>{detail}</div>}
    </div>
  );
}
