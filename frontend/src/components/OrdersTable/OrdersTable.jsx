import { useState } from 'react';
import { formatDate, formatMeters } from '../../utils/constants';
import ColorTag from '../ColorTag/ColorTag';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';
import Table from '../Table/Table';

const COLUMNS = [
  { title: '#', render: (order) => order.id },
  {
    title: 'Data de confirmação',
    render: (order) => formatDate(order.confirmedAt),
  },
  {
    title: 'Comprimento',
    numeric: true,
    render: (order) => formatMeters(order.length),
  },
  {
    title: 'Altura',
    numeric: true,
    render: (order) => formatMeters(order.height),
  },
  { title: 'Cor', render: (order) => <ColorTag color={order.color} /> },
];

export default function OrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <Table
        columns={COLUMNS}
        rows={orders}
        onRowClick={setSelectedOrder}
        emptyMessage="Nenhum pedido confirmado ainda"
      />
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
