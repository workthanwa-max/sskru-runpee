'use client';

import { ActionIcon, Button, Group } from '@mantine/core';
import { GenericTable } from '@src/components/table/generic-table';
import { Faculty } from '@src/types/domain';
import { useState } from 'react';
interface FacultyTableProps {
  data: Faculty[];
  onCreate: () => void;
  onEdit: (node: Faculty) => void;
  onAccess: (node: Faculty) => void;
}
export default function FacultyTable({ data, onCreate, onEdit, onAccess }: FacultyTableProps) {
  const [activePage, setPage] = useState(1);
  const takePage = 10;
  return (
    <>
      <Group position="right">
        <Button onClick={onCreate}>เพิ่ม</Button>
      </Group>
      <GenericTable
        download
        data={data.slice((activePage - 1) * takePage, activePage * takePage)}
        columns={[
          { key: 'name', label: 'หน่วยงาน' },
          {
            key: 'parent',
            label: 'สังกัด',
            render: (value, row) => row.parent?.name ?? '-',
          },
          {
            key: 'description',
            label: 'หมายเหตุ',
          },
        ]}
        actions={(row) => (
          <Group spacing={0}>
            <ActionIcon color="indigo" size={'xs'} onClick={async () => onAccess(row)}>
              {/* <IconLockAccess /> */}
            </ActionIcon>
            <ActionIcon color="yellow" size={'xs'} onClick={async () => onEdit(row)}>
              {/* <IconEdit /> */}
            </ActionIcon>
            <ActionIcon
              size={'xs'}
              onClick={async () => {
                if (confirm(`คุณต้องการลบข้อมูล ${row.name} หรือไม่?`)) {
                  alert(`ลบข้อมูล ${row.name} สำเร็จ!`);
                }
              }}
            >
              {/* <IconTrash /> */}
            </ActionIcon>
          </Group>
        )}
        pagination={{
          activePage,
          total: Math.ceil(data.length / takePage),
          onPageChange: setPage,
        }}
      />
    </>
  );
}
