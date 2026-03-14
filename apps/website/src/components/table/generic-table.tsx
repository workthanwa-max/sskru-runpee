import { Group, Pagination, ScrollArea, Table } from '@mantine/core';
import ExportButton from '../button/export-button';
import { GenericTableProps } from './types';

export function GenericTable<T>({ data, columns, actions, pagination, download }: GenericTableProps<T>) {
  return (
    <>
      <ScrollArea>
        <Table captionSide="bottom">
          <thead>
            <tr>
              {columns.map((column, i) => (
                <th key={i} style={{ textWrap: 'nowrap' }}>
                  {column.label}
                </th>
              ))}
              {actions && (
                <th style={{ width: 120 }}>
                  {download && (
                    <Group position="right">
                      <ExportButton data={data} fileName={`${Date.now()}.xlsx`} />
                    </Group>
                  )}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column, i) => (
                  <td key={`${column.key.toString()}-${i}`}>
                    {column.render ? column.render(row[column.key], row) : (row[column.key] as React.ReactNode)}
                  </td>
                ))}
                {actions && (
                  <td style={{ width: 120 }} align="right">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {data.length === 0 && <caption>No data available in table</caption>}
        </Table>
      </ScrollArea>
      {pagination && (
        <Pagination value={pagination.activePage} onChange={pagination.onPageChange} total={pagination.total} />
      )}
    </>
  );
}
