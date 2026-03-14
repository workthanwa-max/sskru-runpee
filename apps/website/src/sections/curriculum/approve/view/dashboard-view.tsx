'use client';

import { Card, Grid, Group, Stack, Text, Title, Paper, ThemeIcon, Badge, ActionIcon, Box, SimpleGrid, RingProgress, Center, Transition, Button, useMantineTheme } from '@mantine/core';
import { IconChecklist, IconClock, IconFileCheck, IconEye, IconShieldCheck, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useEffect, useState } from 'react';

export default function ApproverDashboardView() {
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { title: 'รอตรวจสอบ', value: '5', icon: IconClock, color: 'pink', percent: 15 },
    { title: 'ตรวจสอบแล้ว', value: '42', icon: IconFileCheck, color: 'teal', percent: 85 },
    { title: 'ทั้งหมด', value: '47', icon: IconChecklist, color: 'indigo', percent: 100 },
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
        background: `radial-gradient(circle at top left, ${theme.colors.sskruWhite[0]} 0%, transparent 40%), radial-gradient(circle at bottom right, ${theme.colors.sskruGold[0]} 0%, transparent 40%)`,
      })}
    >
      <Transition mounted={mounted} transition="slide-up" duration={800} timingFunction="ease">
        {(style) => (
          <Stack spacing="xl" style={style}>
            <Group position="apart">
              <Stack spacing={4}>
                <Group spacing="xs">
                  <ThemeIcon variant="light" color="sskruGold" size="sm" radius="xl">
                    <IconShieldCheck size={14} />
                  </ThemeIcon>
                  <Text size="xs" fw={800} color="sskruGold.7" transform="uppercase" tracking={1.2}>
                    Quality Assurance
                  </Text>
                </Group>
                <Title order={1} sx={(theme) => ({ 
                  fontSize: '2.6rem', 
                  letterSpacing: '-0.02em', 
                  fontWeight: 900,
                  color: theme.colors.sskruGold[9]
                })}>
                  ระบบควบคุมคุณภาพและอนุมัติ
                </Title>
                <Text color="dimmed" size="lg" sx={{ maxWidth: 600, fontWeight: 500 }}>
                  ตรวจสอบความถูกต้องและอนุมัติหลักสูตรเพื่อให้เป็นไปตามมาตรฐานวิชาการและวิสัยทัศน์ของมหาวิทยาลัย
                </Text>
              </Stack>
            </Group>

            <SimpleGrid cols={3} spacing="xl" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
              {stats.map((stat) => (
                <Paper key={stat.title} p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
                  <Group noWrap>
                    <RingProgress
                      size={100}
                      roundCaps
                      thickness={10}
                      sections={[{ value: stat.percent, color: theme.colors.sskruGold[6] }]}
                      label={
                        <Center>
                          <stat.icon size={28} stroke={1.5} color={theme.colors.sskruGold[7]} />
                        </Center>
                      }
                    />
                    <div>
                      <Text color="dimmed" size="xs" weight={900} transform="uppercase" tracking={1.5}>
                        {stat.title}
                      </Text>
                      <Text weight={900} size="2.6rem" sx={(theme) => ({ lineHeight: 1, color: theme.colors.sskruGold[9] })}>
                        {stat.value}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </SimpleGrid>

            {/* Application List */}
            <Card p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
              <Group position="apart" mb="2.5rem">
                <Box>
                  <Title order={3} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>รายการคำร้องที่รอการพิจารณา</Title>
                  <Text size="sm" color="dimmed" fw={500}>กรุณาตรวจสอบรายละเอียดและความถูกต้องของข้อมูลก่อนดำเนินการ</Text>
                </Box>
                <Button 
                  variant="subtle" 
                  size="md"
                  color="sskruGold"
                  rightIcon={<IconArrowRight size={18} />} 
                  component={RouterLink} 
                  href={paths.curriculum.approve.root}
                  fw={700}
                >
                  ทั้งหมด
                </Button>
              </Group>

              <Stack spacing="md">
                {[
                  { id: 1, name: 'หลักสูตรศิลปศาสตรบัณฑิตฯ (ภาษาไทย)', faculty: 'คณะมนุษยศาสตร์', time: '2 ชม. ที่แล้ว', type: 'Final Review', priority: 'High' },
                  { id: 2, name: 'หลักสูตรบริหารธุรกิจบัณฑิตฯ (การตลาด)', faculty: 'คณะวิทยาการจัดการ', time: '5 ชม. ที่แล้ว', type: 'Initial Review', priority: 'Normal' },
                  { id: 3, name: 'หลักสูตรพยาบาลศาสตรบัณฑิตฯ (ฉบับปรับปรุง)', faculty: 'คณะพยาบาลศาสตร์', time: '1 วัน ที่แล้ว', type: 'Final Review', priority: 'Medium' },
                ].map((item) => (
                   <Paper 
                    key={item.id} 
                    p="xl" 
                    radius="lg" 
                    sx={(theme) => ({ 
                      backgroundColor: 'rgba(0,0,0,0.015)',
                      borderRight: `6px solid ${item.priority === 'High' ? theme.colors.sskruGold[7] : item.priority === 'Medium' ? theme.colors.sskruGold[4] : theme.colors.gray[3]}`,
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.025)',
                        transform: 'translateX(-8px)'
                      }
                    })}
                  >
                    <Grid align="center">
                      <Grid.Col span={6}>
                        <Group spacing="md">
                          <ThemeIcon size={48} radius="lg" color="sskruGold" variant="light">
                            <IconSearch size={24} />
                          </ThemeIcon>
                          <Box>
                            <Text fw={700} size="md" sx={(theme) => ({ color: theme.colors.sskruGold[9] })}>{item.name}</Text>
                            <Text size="xs" color="dimmed" fw={500}>{item.faculty} • {item.time}</Text>
                          </Box>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Stack spacing={4}>
                          <Text size="xs" color="dimmed" fw={800} transform="uppercase" tracking={0.8}>การตรวจสอบ</Text>
                          <Badge size="md" variant="dot" color="sskruGold" sx={{ fontWeight: 700 }}>{item.type}</Badge>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Group position="right">
                          <Badge color="sskruGold" variant="light" size="lg" radius="md" sx={{ fontWeight: 700 }}>Pending</Badge>
                          <ActionIcon 
                            variant="filled" 
                            color="sskruGold" 
                            size="lg"
                            radius="md"
                            component={RouterLink} 
                            href={`${paths.curriculum.approve.root}/${item.id}`}
                            sx={{ boxShadow: '0 4px 12px rgba(197, 160, 40, 0.2)' }}
                          >
                            <IconEye size={20} />
                          </ActionIcon>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Stack>
        )}
      </Transition>
    </Box>
  );
}
