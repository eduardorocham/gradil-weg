import { useNavigate } from 'react-router-dom';
import BarChart from '../components/BarChart/BarChart';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Grid from '../components/Grid/Grid';
import { PlusIcon } from '../components/Icons/Icons';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PageHeader from '../components/PageHeader/PageHeader';
import StatCard from '../components/StatCard/StatCard';
import { COLORS, HEIGHTS, formatDate, formatMeters } from '../utils/constants';
import { useOrders } from '../hooks/useOrders';

const countBy = (orders, field, values, formatLabel) =>
  values.map((value) => ({
    label: formatLabel(value),
    total: orders.filter((order) => order[field] === value).length,
  }));

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: orders = [] } = useOrders();
  const totalLength = orders.reduce((sum, order) => sum + order.length, 0);
  const averageLength = orders.length ? totalLength / orders.length : 0;
  const latestOrder = orders[0];

  return (
    <>
      <PageHeader
        title="Painel"
        description="Visão geral dos pedidos confirmados"
        action={
          <Button onClick={() => navigate('/pedidos/novo')}>
            <PlusIcon />
            Novo pedido
          </Button>
        }
      />

      <Grid minColumnWidth={200} gap={16}>
        <StatCard label="Pedidos confirmados" value={orders.length} />
        <StatCard
          label="Metros solicitados"
          value={formatMeters(totalLength)}
        />
        <StatCard
          label="Média por pedido"
          value={formatMeters(averageLength)}
        />
        <StatCard
          label="Último pedido"
          compact
          value={latestOrder ? formatDate(latestOrder.confirmedAt) : '—'}
          detail={
            latestOrder &&
            `${formatMeters(latestOrder.length)} · ${latestOrder.color}`
          }
        />
      </Grid>

      <Grid minColumnWidth={320}>
        <Card title="Pedidos por cor">
          <BarChart
            items={countBy(
              orders,
              'color',
              Object.keys(COLORS),
              (color) => color,
            )}
          />
        </Card>
        <Card title="Pedidos por altura">
          <BarChart items={countBy(orders, 'height', HEIGHTS, formatMeters)} />
        </Card>
      </Grid>

      <Card title="Pedidos recentes">
        <OrdersTable orders={orders.slice(0, 5)} />
      </Card>
    </>
  );
}
