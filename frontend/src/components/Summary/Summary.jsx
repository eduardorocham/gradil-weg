import styles from './Summary.module.css';

export default function Summary({ items }) {
  return (
    <div className={styles.summary}>
      {items.map(({ label, value, highlight }) => (
        <div
          key={label}
          className={`${styles.item} ${highlight ? styles.highlight : ''}`}
        >
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}
