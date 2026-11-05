import styles from './Grid.module.css';

export default function Grid({ minColumnWidth = 200, gap = 24, children }) {
  return (
    <div
      className={styles.grid}
      style={{
        '--min-column-width': `${minColumnWidth}px`,
        '--gap': `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
