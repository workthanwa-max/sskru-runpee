import { Card } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { Faculty } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { ModalFacultyForm } from '../faculty-form';
import FacultyTable from '../faculty-table';

export default function FacultyListView() {
  const { loading, data } = useRestQuery<Faculty[]>(endpoints.faculty.list);
  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Card>
        <FacultyTable
          data={data ?? []}
          onCreate={open}
          onEdit={(node: Faculty) => {
            // TODO: Implement Edit
          }}
          onAccess={(node: Faculty) => {
            // TODO: Implement Access
          }}
        />
      </Card>
      <ModalFacultyForm opened={opened} onClose={close} />
    </>
  );
}
