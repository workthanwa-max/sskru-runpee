import { ActionIcon, Button, Group } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { GenericTable } from '@src/components/table/generic-table';
import { Personnel } from '@src/types/domain';
import { useState } from 'react';
import PersonnelFaculties from './personnel-faculties-chip';
import { ModalPersonnelFacultyForm } from './personnel-faculty-form';
import PersonnelRoles from './personnel-roles-chip';

interface PersonnelTableProps {
  data: Personnel[];
  onCreate: () => void;
  onEdit: (node: Personnel) => void;
  onAccess: (node: Personnel) => void;
}

export default function PersonnelTable({ data, onCreate, onEdit, onAccess }: PersonnelTableProps) {
  const [editFaculty, setEditFaculty] = useState<Personnel | null>(null);
  const [activePage, setPage] = useState(1);
  const takePage = 10;

  return (
    <>
      <ModalPersonnelFacultyForm item={editFaculty} opened={!!editFaculty} onClose={() => setEditFaculty(null)} />

      <Group position="right">
        <Button onClick={onCreate}>เพิ่ม</Button>
      </Group>
      <GenericTable
        download
        data={data.slice((activePage - 1) * takePage, activePage * takePage)}
        columns={[
          { key: 'personnelId', label: 'รหัสบุคลากร' },
          {
            key: 'firstname',
            label: 'ชื่อ - สกุล',
            render: (value, row) => `${row.firstname} ${row.lastname}`,
          },
          { key: 'academicPosition', label: 'ตำแหน่งทางวิชาการ' },
          { key: 'phone', label: 'เบอร์โทรศัพท์' },
          {
            key: 'facultyIds',
            label: 'หน่วยงาน',
            render: (value, row) => (
              <Group spacing={5}>
                <PersonnelFaculties facultyIds={row.facultyIds ?? []} />
                <ActionIcon radius="xl" color="gray" size="sm" variant="subtle" onClick={() => setEditFaculty(row)}>
                  <Iconify icon="tabler:edit" width={16} />
                </ActionIcon>
              </Group>
            ),
          },
          {
            key: 'id',
            label: 'ตำแหน่ง',
            render: (value, row) => (
              <Group spacing={5}>
                <PersonnelRoles personnelId={row.id} />
              </Group>
            ),
          },
        ]}
        actions={(row) => (
          <Group spacing={0}>
            <ActionIcon color="indigo" size="xs" onClick={() => onAccess(row)}>
              {/* <IconLockAccess /> */}
            </ActionIcon>
            <ActionIcon color="yellow" size="xs" onClick={() => onEdit(row)}>
              {/* <IconEdit /> */}
            </ActionIcon>
            <ActionIcon
              size="xs"
              onClick={() => {
                if (confirm(`คุณต้องการลบข้อมูล ${row.firstname} หรือไม่?`)) {
                  alert(`ลบข้อมูล ${row.firstname} สำเร็จ!`);
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
