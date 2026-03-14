'use client';

import { ActionIcon, Button, Group } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { GenericTable } from '@src/components/table/generic-table';
import { Permission, Role, RoleType } from '@src/types/domain';
import { useState } from 'react';
import PermissionChipList from '../permission/permission-chip-list';
import { ModalPermissionForm } from '../permission/permission-form';
import { RoleTypeLabel } from './const';
import { ModalRolePermissionForm } from './role-permission-form';
interface RoleTableProps {
  data: Role[];
  onCreate: () => void;
  onEdit: (node: Role) => void;
  onAccess: (node: Role) => void;
}
export default function RoleTable({ data, onCreate, onEdit, onAccess }: RoleTableProps) {
  const [roleInfo, setRoleInfo] = useState<Role | null>(null);
  const [permissionInfo, setPermissionInfo] = useState<{ role: Role; permission: Permission } | null>(null);
  const [activePage, setPage] = useState(1);
  const takePage = 10;

  return (
    <>
      <ModalPermissionForm
        permission={permissionInfo?.permission}
        opened={!!permissionInfo}
        onClose={() => setPermissionInfo(null)}
        onCompleted={() => setPermissionInfo(null)}
      />
      <ModalRolePermissionForm role={roleInfo} onClose={() => setRoleInfo(null)} opened={!!roleInfo?.id} />
      <Group position="right">
        <Button onClick={onCreate}>เพิ่ม</Button>
      </Group>
      <GenericTable
        download
        data={data.slice((activePage - 1) * takePage, activePage * takePage)}
        columns={[
          { key: 'name', label: 'ตำแหน่ง' },
          {
            key: 'type',
            label: 'ประเภทผู้ใช้',
            render: (value, row) => RoleTypeLabel[row.type],
          },
          {
            key: 'permissions',
            label: 'สิทธิในการเข้าใช้งาน',
            render: (value, row) => (
              <Group spacing={5}>
                <PermissionChipList
                  onClick={(permission) => setPermissionInfo({ permission, role: row })}
                  permissions={row.permissions ?? []}
                />
                {row.type === RoleType.Personnel && (
                  <ActionIcon radius={'xl'} color="gray" size={'sm'} variant="subtle" onClick={() => setRoleInfo(row)}>
                    <Iconify width={16} icon="tabler:edit" />
                  </ActionIcon>
                )}
              </Group>
            ),
          },
        ]}
        // actions={(row) => (
        //   <Group spacing={0}>
        //     <ActionIcon color="indigo" size={'xs'} onClick={async () => onAccess(row)}>
        //       {/* <IconLockAccess /> */}
        //     </ActionIcon>
        //     <ActionIcon color="yellow" size={'xs'} onClick={async () => onEdit(row)}>
        //       {/* <IconEdit /> */}
        //     </ActionIcon>
        //     <ActionIcon
        //       size={'xs'}
        //       onClick={async () => {
        //         if (confirm(`คุณต้องการลบข้อมูล ${row.name} หรือไม่?`)) {
        //           alert(`ลบข้อมูล ${row.name} สำเร็จ!`);
        //         }
        //       }}
        //     >
        //       {/* <IconTrash /> */}
        //     </ActionIcon>
        //   </Group>
        // )}
        pagination={{
          activePage,
          total: Math.ceil(data.length / takePage),
          onPageChange: setPage,
        }}
      />
    </>
  );
}
