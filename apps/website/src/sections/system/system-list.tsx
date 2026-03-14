import { Card, Center, Grid, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { System } from '@src/types/domain';

export default function SystemList({ data }: { data: System[] }) {
  return (
    <Grid>
      {data.map((system) => (
        <Grid.Col key={system.id} span={12} sm={6} md={4} lg={3}>
          <Card h={100} withBorder sx={{ cursor: 'pointer' }} component={RouterLink} href={system.url}>
            <Center h="100%">
              <Text> {system.name} </Text>
            </Center>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
}
