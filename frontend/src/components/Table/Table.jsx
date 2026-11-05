import styles from './Table.module.css';

export default function Table({
  columns,
  rows,
  rowKey = 'id',
  onRowClick,
  emptyMessage = 'Nenhum registro',
}) {
  const handleRowKeyDown = (event, row) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onRowClick(row);
    }
  };

  if (rows.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.title}
                className={column.numeric ? styles.numeric : ''}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[rowKey]}
              {...(onRowClick && {
                className: styles.clickable,
                tabIndex: 0,
                onClick: () => onRowClick(row),
                onKeyDown: (event) => handleRowKeyDown(event, row),
              })}
            >
              {columns.map((column) => (
                <td
                  key={column.title}
                  className={column.numeric ? styles.numeric : ''}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
