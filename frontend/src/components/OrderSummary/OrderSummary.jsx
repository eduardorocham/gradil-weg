import { formatMeters } from '../../utils/constants';
import Summary from '../Summary/Summary';

const toItems = ({ length, soldLength, difference }) => [
  { label: 'Solicitado', value: formatMeters(length) },
  { label: 'Vendido', value: formatMeters(soldLength) },
  ...(difference > 0
    ? [
        {
          label: 'Diferença',
          value: `+${formatMeters(difference)}`,
          highlight: true,
        },
      ]
    : []),
];

export default function OrderSummary({ order }) {
  return <Summary items={toItems(order)} />;
}
