import { useState } from 'react';
import Alert from '../components/Alert/Alert';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import ComponentsTable from '../components/ComponentsTable/ComponentsTable';
import Fence from '../components/Fence/Fence';
import Field, { Input } from '../components/Field/Field';
import Grid from '../components/Grid/Grid';
import OptionGroup from '../components/OptionGroup/OptionGroup';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import PageHeader from '../components/PageHeader/PageHeader';
import {
  COLORS,
  DEFAULT_COLOR,
  HEIGHTS,
  formatMeters,
} from '../utils/constants';
import { useCalculateOrder, useConfirmOrder } from '../hooks/useOrders';
import styles from './NewOrder.module.css';

const HEIGHT_OPTIONS = HEIGHTS.map((height) => ({
  value: String(height),
  label: formatMeters(height),
}));
const COLOR_OPTIONS = Object.keys(COLORS).map((color) => ({
  value: color,
  label: color,
  color,
}));

const parseLength = (value) => Number(value.replace(',', '.'));

export default function NewOrder() {
  const [length, setLength] = useState('');
  const [height, setHeight] = useState(HEIGHTS[0]);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [alert, setAlert] = useState(null);
  const calculation = useCalculateOrder();
  const confirmation = useConfirmOrder();
  const result = calculation.data;

  const handleCalculate = async (event) => {
    event.preventDefault();
    setAlert(null);
    try {
      await calculation.mutateAsync({
        length: parseLength(length),
        height,
        color,
      });
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmation.mutateAsync({
        length: result.length,
        height: result.height,
        color: result.color,
      });
      calculation.reset();
      setLength('');
      setAlert({ type: 'success', message: 'Pedido confirmado com sucesso' });
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    }
  };

  const handleCancel = () => {
    calculation.reset();
    setAlert({ type: 'warning', message: 'Pedido não confirmado' });
  };

  return (
    <>
      <PageHeader
        title="Novo pedido"
        description="Informe as medidas da cerca para calcular os componentes"
      />

      {alert && <Alert type={alert.type}>{alert.message}</Alert>}

      <Card title="Dados da cerca">
        <form onSubmit={handleCalculate}>
          <div className={styles.form}>
            <Field label="Comprimento (m)" htmlFor="length">
              <Input
                id="length"
                inputMode="decimal"
                placeholder="Ex.: 11,5"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                required
              />
            </Field>
            <Field label="Altura" htmlFor="height">
              <OptionGroup
                id="height"
                value={String(height)}
                onChange={(value) => setHeight(Number(value))}
                options={HEIGHT_OPTIONS}
              />
            </Field>
          </div>

          <Field label="Cor" htmlFor="color">
            <OptionGroup
              id="color"
              value={color}
              onChange={setColor}
              options={COLOR_OPTIONS}
            />
          </Field>

          <div className={styles.actions}>
            <Button type="submit" disabled={calculation.isPending}>
              {calculation.isPending ? 'Calculando...' : 'Calcular'}
            </Button>
          </div>
        </form>
      </Card>

      {result && (
        <>
          <Grid minColumnWidth={320}>
            <Card title="Resumo">
              <OrderSummary order={result} />
              <ComponentsTable components={result.components} />
            </Card>

            <Card title="Esboço da cerca">
              <Fence
                panels={result.components.panels}
                height={result.height}
                color={result.color}
              />
            </Card>
          </Grid>

          <Card className={styles.confirmation}>
            <span>
              Altura {formatMeters(result.height)} · cor{' '}
              <strong>{result.color}</strong>
            </span>
            <div className={styles.actions}>
              <Button variant="secondary" onClick={handleCancel}>
                Não confirmar
              </Button>
              <Button
                variant="success"
                onClick={handleConfirm}
                disabled={confirmation.isPending}
              >
                {confirmation.isPending ? 'Confirmando...' : 'Confirmar pedido'}
              </Button>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
