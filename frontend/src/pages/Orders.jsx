import Card from '../components/Card/Card';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PageHeader from '../components/PageHeader/PageHeader';
import { useOrders } from '../hooks/useOrders';

export default function Orders() {
  const { data: orders = [] } = useOrders();

  return (
    <>
      <PageHeader
        title="Pedidos confirmados"
        description="Todos os pedidos, do mais recente para o mais antigo"
      />
      <Card>
        <OrdersTable orders={orders} />
      </Card>
    </>
  );
}
