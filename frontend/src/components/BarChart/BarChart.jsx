import * as Progress from '@radix-ui/react-progress';
import styles from './BarChart.module.css';

export default function BarChart({ items }) {
  const max = Math.max(1, ...items.map((item) => item.total));

  return (
    <div className={styles.chart}>
      {items.map(({ label, total }) => (
        <div key={label} className={styles.row}>
          <span className={styles.label}>{label}</span>
          <Progress.Root
            className={styles.track}
            value={total}
            max={max}
            aria-label={label}
          >
            <Progress.Indicator
              className={styles.bar}
              style={{ width: `${(total / max) * 100}%` }}
            />
          </Progress.Root>
          <strong className={styles.total}>{total}</strong>
        </div>
      ))}
    </div>
  );
}
