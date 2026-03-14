'use client';

import { Card, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { System } from '@src/types/domain';
import { ModalSystemForm } from '../system-form';
import SystemTable from '../system-table';

export default function SystemListView() {
  const { loading, data: systems } = useRestQuery<System[]>(endpoints.system.list);
  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Card component={ScrollArea}>
        <SystemTable
          data={systems ?? []}
          onCreate={open}
          onEdit={function (node: System): void {
            throw new Error('Function not implemented.');
          }}
          onAccess={function (node: System): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Card>
      <ModalSystemForm opened={opened} onClose={close} />
    </>
  );
}
