import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { GenericTable } from '@src/components/table/generic-table';
import { Student } from '@src/types/domain';
import { useState } from 'react';

interface StudentTableProps {
  data: Student[];
  onCreate: () => void;
  onEdit: (node: Student) => void;
}

export default function StudentTable({ data, onCreate, onEdit }: StudentTableProps) {
  const [activePage, setPage] = useState(1);
  const takePage = 10;

  return (
    <>
      <Group position="right" mb="xl">
        <Button 
          onClick={onCreate} 
          color="sskruGold" 
          size="md" 
          radius="md"
          sx={{ boxShadow: '0 8px 20px rgba(197, 160, 40, 0.2)' }}
        >
          เพิ่มนักศึกษา
        </Button>
      </Group>
      <GenericTable
        download
        data={data.slice((activePage - 1) * takePage, activePage * takePage)}
        columns={[
          { key: 'studentId', label: 'รหัสนักศึกษา' },
          {
            key: 'firstname',
            label: 'ชื่อ - สกุล',
            render: (value, row) => <Text fw={700}>{row.firstname} {row.lastname}</Text>,
          },
          { key: 'program', label: 'สาขาวิชา' },
          { key: 'year', label: 'ชั้นปี' },
          { key: 'phone', label: 'เบอร์โทรศัพท์' },
          { key: 'email', label: 'อีเมล' },
        ]}
        actions={(row) => (
          <Group spacing={8}>
            <ActionIcon color="sskruGold" variant="light" onClick={() => onEdit(row)} radius="md" size="lg">
              <Text size="xs" fw={700}>แก้ไข</Text>
            </ActionIcon>
          </Group>
        )}
        pagination={{
          activePage,
          total: Math.ceil(data.length / takePage),
          onPageChange: setPage,
        }}
        sx={(theme: any) => ({
          '& border': 'none',
          '& thead th': {
            backgroundColor: 'rgba(197, 160, 40, 0.05)',
            color: theme.colors.sskruGold[9],
            fontWeight: 800,
            fontSize: 'small',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: `2px solid ${theme.colors.sskruGold[2]}`,
          },
          '& tbody tr': {
             transition: 'background-color 0.2s ease',
             '&:hover': {
               backgroundColor: 'rgba(197, 160, 40, 0.02) !important',
             }
          }
        })}
      />
    </>
  );
}
