import Table from '../Table/Table';

const COLUMNS = [
  { title: 'Componente', render: (component) => component.name },
  {
    title: 'Quantidade',
    numeric: true,
    render: (component) => component.quantity,
  },
];

const toRows = ({ panels, posts, clamps, screws }) => [
  { id: 'panel', name: 'Tela', quantity: panels },
  { id: 'post', name: 'Poste', quantity: posts },
  { id: 'clamp', name: 'Fixador', quantity: clamps },
  { id: 'screw', name: 'Parafuso', quantity: screws },
];

export default function ComponentsTable({ components }) {
  return <Table columns={COLUMNS} rows={toRows(components)} />;
}
