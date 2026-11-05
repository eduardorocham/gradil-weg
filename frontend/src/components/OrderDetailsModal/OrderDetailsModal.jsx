import { formatDate, formatMeters } from '../../utils/constants';
import ComponentsTable from '../ComponentsTable/ComponentsTable';
import Fence from '../Fence/Fence';
import Modal from '../Modal/Modal';
import OrderSummary from '../OrderSummary/OrderSummary';
import styles from './OrderDetailsModal.module.css';

export default function OrderDetailsModal({ order, onClose }) {
  return (
    <Modal
      open={Boolean(order)}
      onOpenChange={(open) => !open && onClose()}
      title={order && `Pedido #${order.id}`}
      description={
        order &&
        `${formatDate(order.confirmedAt)} · altura ${formatMeters(order.height)} · ${order.color}`
      }
    >
      {order && (
        <>
          <OrderSummary order={order} />
          <ComponentsTable components={order.components} />
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Esboço da cerca</h3>
            <Fence
              panels={order.components.panels}
              height={order.height}
              color={order.color}
            />
          </div>
        </>
      )}
    </Modal>
  );
}
