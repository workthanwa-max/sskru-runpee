import { ActionIcon, Button, Group } from '@mantine/core';
import { GenericTable } from '@src/components/table/generic-table';
import { System } from '@src/types/domain';
import { useState } from 'react';
interface SystemTableProps {
  data: System[];
  onCreate: () => void;
  onEdit: (node: System) => void;
  onAccess: (node: System) => void;
}
export default function SystemTable({ data, onCreate, onEdit, onAccess }: SystemTableProps) {
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
          { key: 'name', label: 'ชื่อระบบ' },
          { key: 'url', label: 'URL' },
          { key: 'note', label: 'หมายเหตุ' },
          {
            key: 'loginRequired',
            label: 'ประเภท',
            render: (value, row) => (!row.loginRequired ? 'สาธารณะ' : 'ต้องเข้าสู่ระบบ'),
          },
          {
            key: 'active',
            label: 'สถานะ',
            render: (value, row) => (row.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'),
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
