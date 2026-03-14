import { Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { Personnel } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { ModalPersonnelForm } from '../personnel-form';
import PersonnelTable from '../personnel-table';

export default function PersonnelListView() {
  const { loading, data } = useRestQuery<Personnel[]>(endpoints.personnel.list);
  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Card>
        <PersonnelTable
          data={data ?? []}
          onCreate={open}
          onEdit={(node: Personnel) => {
            // TODO: Implement Edit
          }}
          onAccess={(node: Personnel) => {
            // TODO: Implement Access
          }}
        />
      </Card>
      <ModalPersonnelForm opened={opened} onClose={close} />
    </>
  );
}
