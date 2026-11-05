import styles from './Card.module.css';

export default function Card({ title, action, className = '', children }) {
  return (
    <section className={`${styles.card} ${className}`}>
      {(title || action) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
