'use client';

import { Box, Card, Divider, Group, Text } from '@mantine/core';
import { LoadingScreen } from '@src/components/loading-screen';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { System } from '@src/types/domain';
import SystemList from '../system-list';

export default function SystemHomeView() {
  const { loading, data: systems } = useRestQuery<System[]>(endpoints.system.list);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Card>
      <Group position="apart" sx={{ cursor: 'pointer' }}>
        <Text fw={'bold'} color="yellow" size={'lg'}>
          หน้าหลัก
        </Text>
        <Text fw={'bold'} color="blue" component={RouterLink} href={paths.management.root}>
          จัดการการใช้งานระบบ
        </Text>
      </Group>
      <Box py={'md'}>
        <Divider />
      </Box>
      <SystemList data={systems ?? []} />
    </Card>
  );
}
