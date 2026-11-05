import { Outlet } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import Alert from '../Alert/Alert';
import { DashboardIcon, ListIcon, PlusIcon } from '../Icons/Icons';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

const MENU_ITEMS = [
  { path: '/', label: 'Painel', Icon: DashboardIcon },
  { path: '/pedidos/novo', label: 'Novo pedido', Icon: PlusIcon },
  { path: '/pedidos', label: 'Pedidos confirmados', Icon: ListIcon },
];

export default function Layout() {
  const { error } = useOrders();

  return (
    <div className={styles.layout}>
      <Sidebar items={MENU_ITEMS} />
      <main className={styles.content}>
        {error && <Alert type="error">{error.message}</Alert>}
        <Outlet />
      </main>
    </div>
  );
}
