'use client';

import { Box, Card, Center, Divider, Grid, Group, Loader, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { System } from '@src/types/domain';

export default function HomeSystemListView() {
  const { data: systems, loading } = useRestQuery<System[]>(endpoints.system.list);

  if (loading) {
    return <Loader />;
  }
  return (
    <Card>
      <Group position="apart" sx={{ cursor: 'pointer' }}>
        <Text fw={'bold'} color="yellow" size={'lg'}>
          หน้าหลัก
        </Text>
      </Group>
      <Box py={'md'}>
        <Divider />
      </Box>
      <Grid>
        {systems?.map((system) => (
          <Grid.Col key={system.id} span={12} sm={6} md={4} lg={3}>
            <Card
              shadow="md"
              h={100}
              withBorder
              sx={{ cursor: 'pointer' }}
              component={RouterLink}
              href={`/${system.url}`}
            >
              <Center>
                <Text> {system.name} </Text>
              </Center>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
}
