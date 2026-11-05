import { NavLink } from 'react-router-dom';
import { FenceIcon } from '../Icons/Icons';
import styles from './Sidebar.module.css';

export default function Sidebar({ items }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <FenceIcon />
        </div>
        Gradil
      </div>
      <nav className={styles.menu} aria-label="Menu principal">
        {items.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ''}`
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.footer}>Sistema de pedidos de cercas</div>
    </aside>
  );
}
