'use client';

import { Card, Center, Grid, Group, Loader, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import CurriculumReqTable from '../table';

function CurriculumReqTableView() {
  const { data: activities, loading } = useRestQuery<Activity[]>(endpoints.curriculum.activities);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card>
      <Group>
        <Text size="lg" weight="bold" color="#3f3f46">
          รายชื่อหลักสูตร
        </Text>
      </Group>
      <Grid my={'md'}>
        <Grid.Col span={12} sm={6} md={4} lg={3}>
          <Card
            bg="#fbf4e5"
            sx={{ border: '1px solid #D19509' }}
            component={RouterLink}
            href={paths.curriculum.request.sections().general(`#name`)}
          >
            <Center h="100%" sx={{ cursor: 'pointer' }}>
              <Text style={{ fontSize: '1rem', textAlign: 'center' }} weight={'bold'} color="#D19509">
                หลักสูตร non-degree
              </Text>
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col span={12} sm={6} md={4} lg={3}>
          <Card
            bg="#fbf4e5"
            sx={{ border: '1px solid #D19509' }}
            component={RouterLink}
            href={paths.curriculum.request.sections().generalDegree}
          >
            <Center h="100%" sx={{ cursor: 'pointer' }}>
              <Text style={{ fontSize: '1rem', textAlign: 'center' }} weight={'bold'} color="#D19509">
                หลักสูตร degree
              </Text>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>

      <CurriculumReqTable data={activities ?? []} />
    </Card>
  );
}

export default CurriculumReqTableView;
