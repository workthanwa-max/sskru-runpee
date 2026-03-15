'use client';

import { Card, Grid, Group, Stack, Text, Title, Paper, ThemeIcon, Button, Badge, SimpleGrid, RingProgress, Center, Box, Transition, useMantineTheme } from '@mantine/core';
import { IconFilePlus, IconFiles, IconFileCheck, IconFileAlert, IconSchool, IconCertificate, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useEffect, useState } from 'react';

export default function SubmitterDashboardView() {
  const theme = useMantineTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { title: 'หลักสูตรทั้งหมด', value: '12', icon: IconFiles, color: 'indigo', percent: 100 },
    { title: 'รอพิจารณา', value: '3', icon: IconFileAlert, color: 'orange', percent: 25 },
    { title: 'สำเร็จแล้ว', value: '9', icon: IconFileCheck, color: 'teal', percent: 75 },
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
        background: `radial-gradient(circle at top right, ${theme.colors.sskruGold[0]} 0%, transparent 40%), radial-gradient(circle at bottom left, ${theme.colors.sskruGold[1]} 0%, transparent 40%)`,
      })}
    >
      <Transition mounted={mounted} transition="slide-up" duration={800} timingFunction="ease">
        {(style) => (
          <Stack spacing="xl" style={style}>
            <Group position="apart">
              <Stack spacing={4}>
                <Group spacing="xs">
                  <ThemeIcon variant="light" color="sskruGold" size="sm" radius="xl">
                    <IconSparkles size={14} />
                  </ThemeIcon>
                  <Text size="xs" fw={800} color="sskruGold.8" transform="uppercase" tracking={1.5}>
                    Academic Portal
                  </Text>
                </Group>
                <Title order={1} sx={(theme) => ({ 
                  fontSize: '2.8rem', 
                  letterSpacing: '-0.03em', 
                  fontWeight: 900,
                  color: theme.colors.sskruGold[9] 
                })}>
                  การจัดการหลักสูตร
                </Title>
                <Text color="dimmed" size="lg" sx={{ maxWidth: 600, fontWeight: 500 }}>
                  ยกระดับมาตรฐานการศึกษาด้วยระบบบริหารจัดการหลักสูตรสมัยใหม่ ติดตามและพัฒนาแผนการเรียนรู้อย่างมีประสิทธิภาพ
                </Text>
              </Stack>
            </Group>

            {/* Quick Launch Sections */}
            <SimpleGrid cols={2} spacing="xl" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <Paper 
                p={40} 
                radius="xl" 
                sx={(theme) => ({
                  ...glassStyle(theme),
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-12px)', 
                    boxShadow: '0 30px 60px -12px rgba(197, 160, 40, 0.15)',
                    borderColor: theme.colors.sskruGold[4],
                    '& .bg-icon': { transform: 'scale(1.15) rotate(-8deg)', opacity: 0.08 }
                  }
                })}
              >
                <IconSchool className="bg-icon" size={220} style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.04, transition: 'all 0.5s ease', color: '#C5A028' }} />
                <Stack spacing="xl">
                  <ThemeIcon size={72} radius="xl" color="sskruGold" variant="gradient" gradient={{ from: 'sskruGold.4', to: 'sskruGold.7' }}>
                    <IconSchool size={36} />
                  </ThemeIcon>
                  <Box>
                    <Title order={2} mb="xs" sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>Degree Curriculum</Title>
                    <Text size="md" color="dimmed" mb="xl" lh={1.7} fw={500}>
                      ยื่นคำร้องสำหรับหลักสูตรระดับปริญญา (ตรี-โท-เอก) ที่เน้นความเข้มข้นทางวิชาการและมาตรฐานคุณวุฒิระดับชาติ
                    </Text>
                  </Box>
                  <Group position="apart">
                    <Group spacing="xs">
                      <Badge variant="dot" size="lg" color="sskruGold">4 Modules</Badge>
                      <Badge variant="dot" color="orange" size="lg">Council Review</Badge>
                    </Group>
                    <Button 
                      size="lg" 
                      radius="md"
                      color="sskruGold"
                      variant="filled" 
                      component={RouterLink} 
                      href={paths.curriculum.request.sections().generalDegree}
                      rightIcon={<IconArrowRight size={20} />}
                      sx={{ boxShadow: '0 8px 20px rgba(197, 160, 40, 0.3)' }}
                    >
                      เริ่มดำเนินการ
                    </Button>
                  </Group>
                </Stack>
              </Paper>

              <Paper 
                p={40} 
                radius="xl" 
                sx={(theme) => ({
                  ...glassStyle(theme),
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-12px)', 
                    boxShadow: '0 30px 60px -12px rgba(197, 160, 40, 0.15)',
                    borderColor: theme.colors.sskruGold[4],
                    '& .bg-icon': { transform: 'scale(1.15) rotate(8deg)', opacity: 0.08 }
                  }
                })}
              >
                <IconCertificate className="bg-icon" size={220} style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.04, transition: 'all 0.5s ease', color: '#C5A028' }} />
                <Stack spacing="xl">
                  <ThemeIcon size={72} radius="xl" color="sskruGold" variant="light">
                    <IconCertificate size={36} />
                  </ThemeIcon>
                  <Box>
                    <Title order={2} mb="xs" sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>Non-Degree & Short Course</Title>
                    <Text size="md" color="dimmed" mb="xl" lh={1.7} fw={500}>
                      หลักสูตรระยะสั้นเพื่อการเพิ่มทักษะ (Upskill/Reskill) เน้นการเรียนรู้ที่ว่องไวและตอบโจทย์อุตสาหกรรมสมัยใหม่
                    </Text>
                  </Box>
                  <Group position="apart">
                    <Group spacing="xs">
                      <Badge variant="dot" color="teal" size="lg">Fast Track</Badge>
                      <Badge variant="dot" color="sskruGold" size="lg">Skill-Based</Badge>
                    </Group>
                    <Button 
                      size="lg" 
                      radius="md"
                      variant="light" 
                      color="sskruGold" 
                      component={RouterLink} 
                      href={paths.curriculum.request.sections().general('#name')}
                      rightIcon={<IconArrowRight size={20} />}
                    >
                      เริ่มดำเนินการ
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </SimpleGrid>

            {/* Status Grid */}
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
                      <Text color="dimmed" size="xs" weight={900} transform="uppercase" tracking={1.8}>
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

            {/* List Activity */}
            <Card p="xl" radius="xl" sx={(theme) => ({ ...glassStyle(theme) })}>
              <Group position="apart" mb="2.5rem">
                <Box>
                  <Title order={3} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>รายการดำเนินการล่าสุด</Title>
                  <Text size="sm" color="dimmed" fw={500}>ประวัติการยื่นคำร้องและการอัปเดตสถานะหลักสูตร</Text>
                </Box>
                <Button 
                  variant="subtle" 
                  size="md"
                  color="sskruGold"
                  rightIcon={<IconArrowRight size={18} />} 
                  component={RouterLink} 
                  href={paths.curriculum.request.root}
                  fw={700}
                >
                  ดูทั้งหมดแบบละเอียด
                </Button>
              </Group>

              <Stack spacing="md">
                {[
                  { id: 'c001', name: 'หลักสูตรวิศวกรรมศาสตรบัณฑิต (วิศวกรรมซอฟต์แวร์)', type: 'Degree', status: 'In Progress', step: 'สภาวิชาการ', color: 'sskruGold', timestamp: '2 ชม. ที่แล้ว' },
                  { id: 'c002', name: 'การจัดการข้อมูลขนาดใหญ่เบื้องต้น (Big Data Fundamentals)', type: 'Non-Degree', status: 'Approved', step: 'สำเร็จ', color: 'teal', timestamp: '5 ชม. ที่แล้ว' },
                  { id: 'c003', name: 'เทคนิคการสอนสำหรับศตวรรษที่ 21', type: 'Degree', status: 'Draft', step: 'รอยื่นเอกสาร', color: 'gray', timestamp: '1 วัน ที่แล้ว' },
                ].map((item) => (
                  <Paper 
                    key={item.id} 
                    p="xl" 
                    radius="lg" 
                    sx={(theme) => ({ 
                      backgroundColor: 'rgba(0,0,0,0.015)',
                      borderLeft: `5px solid ${item.color === 'sskruGold' ? theme.colors.sskruGold[6] : item.color === 'teal' ? theme.colors.teal[6] : theme.colors.gray[4]}`,
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        backgroundColor: 'rgba(0,0,0,0.025)',
                        transform: 'translateX(8px)'
                      }
                    })}
                  >
                    <Grid align="center">
                      <Grid.Col span={6}>
                        <Group spacing="md">
                          <Badge 
                            size="lg" 
                            variant="light" 
                            color={item.type === 'Degree' ? 'sskruGold' : 'teal'}
                            sx={{ borderRadius: '8px', padding: '0 12px' }}
                          >
                            {item.type}
                          </Badge>
                          <Box>
                            <Text fw={700} size="md" sx={(theme) => ({ color: theme.colors.sskruGold[9] })}>{item.name}</Text>
                            <Text size="xs" color="dimmed" fw={500}>อัปเดตเมื่อ {item.timestamp}</Text>
                          </Box>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Stack spacing={4}>
                          <Text size="xs" color="dimmed" fw={800} transform="uppercase" tracking={0.8}>สถานะขั้นตอน</Text>
                          <Group spacing={8}>
                            <Box sx={(theme) => ({ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.colors.sskruGold[6] })} />
                            <Text size="sm" fw={700}>{item.step}</Text>
                          </Group>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Group position="right">
                          <Badge 
                            color={item.color === 'teal' ? 'teal' : item.color === 'sskruGold' ? 'sskruGold' : 'gray'} 
                            variant="filled" 
                            size="lg"
                            radius="md"
                          >
                            {item.status}
                          </Badge>
                          <Button 
                            variant="light" 
                            color="sskruGold"
                            radius="md"
                            component={RouterLink} 
                            href={`${paths.curriculum.request.root}/${item.id}/general`}
                            fw={700}
                          >
                            จัดการข้อมูล
                          </Button>
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
