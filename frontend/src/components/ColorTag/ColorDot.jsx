import { COLORS } from '../../utils/constants';
import styles from './ColorTag.module.css';

export default function ColorDot({ color }) {
  return <span className={styles.dot} style={{ background: COLORS[color] }} />;
}
