'use client';

import { Card, Title, Text, Box, Paper, Group, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { Student } from '@src/types/domain';
import { endpoints } from '@src/utils/axios';
import { IconUsers } from '@tabler/icons-react';
import StudentTable from '../student-table';

export default function StudentListView() {
  const { loading, data } = useRestQuery<Student[]>(endpoints.student.list);
  const [opened, { open, close }] = useDisclosure(false);

  if (loading) {
    return <LoadingScreen />;
  }

  const glassStyle = (theme: any) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px) saturate(160%)',
    border: `1px solid rgba(255, 255, 255, 0.4)`,
    boxShadow: '0 8px 32px 0 rgba(197, 160, 40, 0.05)',
  });

  return (
    <Box p="xl" sx={(theme) => ({
      minHeight: '100%',
      background: `radial-gradient(circle at top left, ${theme.colors.sskruWhite[0]} 0%, transparent 40%), radial-gradient(circle at bottom right, ${theme.colors.sskruGold[0]} 0%, transparent 40%)`,
    })}>
      <Paper 
        p={40} 
        radius="xl" 
        mb="xl" 
        sx={(theme) => ({
          background: `linear-gradient(135deg, ${theme.colors.sskruGold[7]} 0%, ${theme.colors.sskruGold[9]} 100%)`,
          color: 'white',
          boxShadow: '0 20px 40px rgba(197, 160, 40, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        })}
      >
        <IconUsers size={200} style={{ position: 'absolute', right: -40, top: -40, opacity: 0.1, color: '#FFFFFF' }} />
        <Group spacing="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <ThemeIcon size={80} radius="xl" color="white" variant="light">
            <IconUsers size={40} color="white" />
          </ThemeIcon>
          <Box>
            <Title order={1} sx={{ fontSize: '2.4rem', fontWeight: 900 }}>จัดการข้อมูลนักศึกษา</Title>
            <Text sx={{ opacity: 0.9, fontSize: '1.1rem', fontWeight: 500 }}>ตรวจสอบและบริหารจัดการข้อมูลนักศึกษาทั้งหมดในระบบฐานข้อมูลส่วนกลาง</Text>
          </Box>
        </Group>
      </Paper>

      <Card p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
        <StudentTable
          data={data ?? []}
          onCreate={open}
          onEdit={(node: Student) => {
            // TODO: Implement Edit
          }}
        />
      </Card>
    </Box>
  );
}
