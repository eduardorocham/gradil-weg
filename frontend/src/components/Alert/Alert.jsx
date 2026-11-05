import styles from './Alert.module.css';

export default function Alert({ type = 'warning', children }) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`${styles.alert} ${styles[type]}`}
    >
      {children}
    </div>
  );
}
