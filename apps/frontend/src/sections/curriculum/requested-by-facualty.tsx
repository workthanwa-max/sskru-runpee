import { Loader, Text } from '@mantine/core';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Personnel } from '@src/types/domain';

type Props = {
  requestedBy: string;
};

export default function RequestedByFacualty({ requestedBy }: Props) {
  const { data: personnel, loading } = useRestQuery<Personnel>(endpoints.personnel.details(requestedBy));

  if (loading) {
    return <Loader />;
  }

  return <Text>{personnel?.faculties?.[0]?.name ?? '-'}</Text>;
}
