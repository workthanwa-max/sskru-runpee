import { Chip, Loader } from '@mantine/core';
import { useRestQuery } from '@src/hooks/use-rest';
import { Faculty } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';

type Props = {
  facultyIds: string[];
};

export default function PersonnelFaculties({ facultyIds }: Props) {
  return (
    <>
      {facultyIds.map((id) => (
        <PersonnelFaculty
          key={id}
          facultyId={id}
          onClick={() => {
            //
          }}
        />
      ))}
    </>
  );
}

function PersonnelFaculty({ facultyId, onClick }: { facultyId: string; onClick: VoidFunction }) {
  const { data: faculty, loading } = useRestQuery<Faculty>(endpoints.faculty.details(facultyId));

  if (loading) {
    return <Loader size="xs" />;
  }

  if (!faculty) {
    return <></>;
  }

  return (
    <Chip size={'xs'} checked={false} key={faculty.id} onClick={onClick}>
      {faculty.name}
    </Chip>
  );
}
