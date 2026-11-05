import ColorDot from './ColorDot';
import styles from './ColorTag.module.css';

export default function ColorTag({ color }) {
  return (
    <span className={styles.tag}>
      <ColorDot color={color} />
      {color}
    </span>
  );
}
