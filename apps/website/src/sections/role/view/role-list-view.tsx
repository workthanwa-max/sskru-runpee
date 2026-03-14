'use client';

import { Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Role } from '@src/types/domain';
import { ModalRoleForm } from '../role-form';
import RoleTable from '../role-table';

export default function RoleListView() {
  const { loading, data: roles } = useRestQuery<Role[]>(endpoints.role.list);
  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ModalRoleForm opened={opened} onClose={close} />
      <Card>
        <RoleTable
          data={roles ?? []}
          onCreate={open}
          onEdit={function (node: Role): void {
            throw new Error('Function not implemented.');
          }}
          onAccess={function (node: Role): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Card>
    </>
  );
}
