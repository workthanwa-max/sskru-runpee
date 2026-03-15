'use client';

import { Card, Grid, Group, Stack, Text, Title, Paper, ThemeIcon, Box, SimpleGrid, RingProgress, Center, Transition, Badge, useMantineTheme } from '@mantine/core';
import { IconUsers, IconSettings, IconShieldLock, IconDatabase, IconActivity, IconCloudCheck, IconDeviceDesktop } from '@tabler/icons-react';
import { useAuthContext } from '@src/auth/hooks';
import { useEffect, useState } from 'react';

export default function AdminDashboardView() {
  const theme = useMantineTheme();
  const { user } = useAuthContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { title: 'ผู้ใช้งานทั้งหมด', value: '1,204', icon: IconUsers, color: 'indigo', percent: 75 },
    { title: 'รายการหลักสูตร', value: '86', icon: IconDatabase, color: 'cyan', percent: 40 },
    { title: 'บทบาทในระบบ', value: '5', icon: IconShieldLock, color: 'violet', percent: 100 },
    { title: 'Health Score', value: '98%', icon: IconActivity, color: 'teal', percent: 98 },
  ];

  const glassStyle = (theme: any) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px) saturate(160%)',
    border: `1px solid rgba(255, 255, 255, 0.4)`,
    boxShadow: '0 8px 32px 0 rgba(197, 160, 40, 0.05)',
  });

  return (
    <Box 
      sx={(theme) => ({
        minHeight: '100%',
        padding: theme.spacing.xl,
        background: `radial-gradient(circle at top right, ${theme.colors.sskruGold[0]} 0%, transparent 40%), radial-gradient(circle at bottom left, ${theme.colors.sskruWhite[2]} 0%, transparent 40%)`,
      })}
    >
      <Transition mounted={mounted} transition="fade" duration={800} timingFunction="ease">
        {(style) => (
          <Stack spacing="xl" style={style}>
            <Paper 
              p={60} 
              radius="xl" 
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${theme.colors.sskruGold[7]} 0%, ${theme.colors.sskruGold[9]} 100%)`,
                color: theme.white,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(197, 160, 40, 0.2)',
              })}
            >
              <IconShieldLock size={300} style={{ position: 'absolute', right: -50, top: -50, opacity: 0.1, color: '#FFFFFF' }} />
              <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
                <Group spacing="xs">
                  <ThemeIcon variant="white" color="sskruGold" size="sm" radius="xl">
                    <IconShieldLock size={14} />
                  </ThemeIcon>
                  <Text size="xs" fw={800} transform="uppercase" tracking={2} style={{ opacity: 0.9 }}>
                    System Administration
                  </Text>
                </Group>
                <Title order={1} sx={{ fontSize: '3.2rem', letterSpacing: '-0.04em', fontWeight: 900 }}>
                  Command Center
                </Title>
                <Text size="lg" sx={{ opacity: 0.85, maxWidth: 500, fontWeight: 500 }}>
                  ยินดีต้อนรับกลับ, {user?.username}. ควบคุมและดูแลความเรียบร้อยของระบบ SSKRU ผ่านศูนย์บัญชาการหลัก
                </Text>
              </Stack>
            </Paper>

            <SimpleGrid cols={4} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'xs', cols: 1 }]}>
              {stats.map((stat) => (
                <Paper key={stat.title} p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
                  <Stack spacing="md">
                    <Group position="apart">
                      <ThemeIcon color="sskruGold" variant="light" size={56} radius="lg">
                        <stat.icon size={28} />
                      </ThemeIcon>
                      <RingProgress
                        size={48}
                        thickness={5}
                        sections={[{ value: stat.percent, color: theme.colors.sskruGold[6] }]}
                      />
                    </Group>
                    <div>
                      <Text size="xs" color="dimmed" fw={900} transform="uppercase" tracking={1.5}>
                        {stat.title}
                      </Text>
                      <Text fw={900} size="2.4rem" sx={(theme) => ({ lineHeight: 1, color: theme.colors.sskruGold[9] })}>
                        {stat.value}
                      </Text>
                    </div>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>

            <Grid gutter="xl">
              <Grid.Col md={8}>
                <Card p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
                  <Group position="apart" mb="2.5rem">
                    <Box>
                      <Title order={3} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>System Logs & Activity</Title>
                      <Text size="sm" color="dimmed" fw={500}>ความเคลื่อนไหวย้อนหลังของระบบเรียลไทม์</Text>
                    </Box>
                    <ThemeIcon variant="light" color="sskruGold" size="lg" radius="md">
                      <IconActivity size={22} />
                    </ThemeIcon>
                  </Group>
                  <Stack spacing="md">
                    {[1, 2, 3, 4].map((i) => (
                      <Paper 
                        key={i} 
                        p="xl" 
                        radius="lg" 
                        sx={(theme) => ({ 
                          backgroundColor: 'rgba(0,0,0,0.015)',
                          borderLeft: `5px solid ${i === 1 ? theme.colors.teal[6] : theme.colors.sskruGold[4]}`,
                          transition: 'all 0.2s ease',
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.025)' }
                        })}
                      >
                        <Group position="apart">
                          <Group spacing="md">
                            <Box sx={(theme) => ({ width: 10, height: 10, borderRadius: '50%', backgroundColor: i === 1 ? theme.colors.teal[6] : theme.colors.sskruGold[5] })} />
                            <Box>
                              <Text size="sm" fw={700} sx={(theme) => ({ color: theme.colors.sskruGold[9] })}>
                                {i === 1 ? 'ระบบทำการ Backup ข้อมูลหลักสูตรสำเร็จ' : 'ผู้ใช้งาน admin แก้ไขสิทธิ์การเข้าถึงบุคคลากร'}
                              </Text>
                              <Text size="xs" color="dimmed" fw={500}>Admin ID: 001 • System Trigger</Text>
                            </Box>
                          </Group>
                          <Text size="xs" color="dimmed" fw={600}>{i * 5} นาทีที่แล้ว</Text>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col md={4}>
                <Card p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
                  <Title order={3} mb="2.5rem" sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>Server Health</Title>
                  <Stack spacing="xl">
                    {[
                      { label: 'API Gateway', icon: IconCloudCheck, val: 99, color: 'teal' },
                      { label: 'PostgreSQL DB', icon: IconDatabase, val: 95, color: 'teal' },
                      { label: 'Frontend SSR', icon: IconDeviceDesktop, val: 82, color: 'orange' },
                    ].map((srv) => (
                      <Box key={srv.label}>
                        <Group position="apart" mb={10}>
                          <Group spacing="xs">
                            <srv.icon size={20} color={srv.color === 'teal' ? '#10b981' : '#f59e0b'} />
                            <Text size="sm" fw={700}>{srv.label}</Text>
                          </Group>
                          <Badge color={srv.color} variant="dot" size="md" sx={{ fontWeight: 800 }}>{srv.val === 99 ? 'Operational' : srv.val > 90 ? 'Healthy' : 'Heavy Load'}</Badge>
                        </Group>
                        <Box sx={(theme) => ({ height: 8, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' })}>
                          <Box sx={(theme) => ({ height: '100%', width: `${srv.val}%`, backgroundColor: srv.color === 'teal' ? '#10b981' : '#f59e0b', borderRadius: 4 })} />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Transition>
    </Box>
  );
}
