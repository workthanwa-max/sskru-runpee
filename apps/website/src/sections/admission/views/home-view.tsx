'use client';

import { Card, Grid, Group, Text, Stack, Title, Paper, ThemeIcon, SimpleGrid, Button, Badge, Box, Center, ActionIcon, Transition } from '@mantine/core';
import { IconSchool, IconUserCircle, IconBell, IconChevronRight, IconSparkles, IconUserCheck, IconNotebook, IconNotification } from '@tabler/icons-react';
import ProgramTypeCard from '../program-type-card';
import { useAuthContext } from '@src/auth/hooks';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useEffect, useState } from 'react';

export default function AdmissionHomeView() {
  const { user, authenticated } = useAuthContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <Transition mounted={mounted} transition="slide-up" duration={600} timingFunction="ease">
        {(style) => (
          <Stack spacing="xl" style={style}>
            <Paper 
              p={40} 
              radius="xl" 
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${theme.colors.sskruGold[7]} 0%, ${theme.colors.sskruGold[9]} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(197, 160, 40, 0.25)',
              })}
            >
              <IconSparkles size={240} style={{ position: 'absolute', right: -40, top: -40, opacity: 0.1 }} />
              <Group position="apart" sx={{ position: 'relative', zIndex: 1 }}>
                <Stack spacing={4}>
                  <Group spacing="xs">
                    <ThemeIcon variant="white" color="sskruGold" size="sm" radius="xl">
                      <IconSparkles size={14} />
                    </ThemeIcon>
                    <Text size="xs" fw={800} transform="uppercase" tracking={1.2}>
                      Student Admissions Portal
                    </Text>
                  </Group>
                  <Title order={1} sx={{ fontSize: '2.8rem', letterSpacing: '-0.02em', fontWeight: 900 }}>
                    {authenticated ? `สวัสดีครับ, ${user?.username} 👋` : 'เตรียมพร้อมสู่อนาคตที่ SSKRU 🎓'}
                  </Title>
                  <Text size="lg" sx={{ opacity: 0.8, maxWidth: 500 }}>
                    {authenticated 
                      ? 'ยินดีต้อนรับเข้าพักสู่ระบบรับสมัครนักศึกษา มหาวิทยาลัยราชภัฏศรีสะเกษ ก้าวแรกสู่อนาคตที่สดใสของคุณเริ่มต้นที่นี่'
                      : 'ค้นหาหลักสูตรที่ใช่ และเริ่มต้นการเดินทางทางการศึกษาของคุณไปกับเรา มหาวิทยาลัยราชภัฏศรีสะเกษ'}
                  </Text>
                </Stack>
                <ThemeIcon size={120} radius="xl" color="white" sx={{ boxShadow: '0 10px 25px rgba(197, 160, 40, 0.15)' }}>
                  <IconUserCircle size={80} color="#C5A028" />
                </ThemeIcon>
              </Group>
            </Paper>

            <Grid gutter="xl">
              <Grid.Col md={8}>
                <Stack spacing="xl">
                  <Card p="xl" radius="lg" sx={(theme) => ({ ...glassStyle(theme) })}>
                    <Group position="apart" mb="2rem">
                      <Box>
                        <Title order={3}>ระดับการศึกษาที่เปิดรับสมัคร</Title>
                        <Text size="sm" color="dimmed">เลือกหลักสูตรที่ตรงกับเป้าหมายและความฝันของคุณ</Text>
                      </Box>
                      <ThemeIcon variant="light" color="yellow" size="lg" radius="md">
                        <IconSchool size={24} />
                      </ThemeIcon>
                    </Group>
                    <ProgramTypeCard />
                  </Card>

                  <Card p="xl" radius="lg" sx={(theme) => ({ ...glassStyle(theme) })}>
                    <Group position="apart" mb="2rem">
                      <Box>
                        <Title order={3}>ข่าวประชาสัมพันธ์</Title>
                        <Text size="sm" color="dimmed">ติดตามความเคลื่อนไหวและประกาศสำคัญล่าสุด</Text>
                      </Box>
                      <Button variant="subtle" color="yellow" rightIcon={<IconChevronRight size={18} />}>
                        ดูทั้งหมด
                      </Button>
                    </Group>
                    <Stack spacing="md">
                      {[
                         { title: 'ประกาศการรับสมัครนักศึกษา ภาคปกติ ประเภททั่วไป ประจำปี 2567', date: '14 มีนาคม 2569', color: 'yellow' },
                         { title: 'แนวปฏิบัติการชำระเงินค่าธรรมเนียมการสมัครเรียน', date: '12 มีนาคม 2569', color: 'blue' }
                      ].map((news, i) => (
                        <Paper 
                          key={i} 
                          p="md" 
                          radius="md" 
                          sx={(theme) => ({ 
                            backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.015)',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            '&:hover': { 
                              backgroundColor: theme.colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.025)',
                              transform: 'translateX(4px)'
                            }
                          })}
                        >
                          <Group position="apart">
                            <Group spacing="sm">
                              <ThemeIcon size="sm" variant="light" color={news.color} radius="xl">
                                <IconNotification size={14} />
                              </ThemeIcon>
                              <Box>
                                <Text fw={600} size="sm">{news.title}</Text>
                                <Text size="xs" color="dimmed">{news.date}</Text>
                              </Box>
                            </Group>
                            <IconChevronRight size={16} color="gray" />
                          </Group>
                        </Paper>
                      ))}
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col md={4}>
                <Stack spacing="xl">
                  <Card p="xl" radius="lg" sx={(theme) => ({ ...glassStyle(theme), textAlign: 'center' })}>
                    <Title order={3} mb="2rem">สถานะการสมัคร</Title>
                    <Stack align="center" py="xl" spacing="md">
                      <Center 
                        sx={(theme) => ({ 
                          width: 120, 
                          height: 120, 
                          borderRadius: '50%', 
                          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                          border: '2px dashed' + (theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3])
                        })}
                      >
                        <Stack spacing={4} align="center">
                          <IconNotebook size={40} color="gray" />
                        </Stack>
                      </Center>
                      <Box>
                        <Text fw={700} size="lg">ไม่มีรายการ</Text>
                        <Text color="dimmed" size="sm">คุณยังไม่มีรายการสมัครเรียนในขณะนี้</Text>
                      </Box>
                      <Button 
                        fullWidth 
                        size="lg" 
                        radius="md" 
                        color="sskruGold" 
                        mt="md" 
                        sx={{ boxShadow: '0 8px 15px rgba(197, 160, 40, 0.2)' }}
                        component={RouterLink}
                        href={authenticated ? paths.admission.root : paths.admission.register}
                      >
                        {authenticated ? 'ค้นหาหลักสูตรและสมัคร' : 'ลงทะเบียนเพื่อสมัครเรียน'}
                      </Button>
                    </Stack>
                  </Card>

                  <Card p="xl" radius="lg" sx={(theme) => ({ 
                    background: `linear-gradient(45deg, ${theme.colors.blue[6]} 0%, ${theme.colors.blue[8]} 100%)`, 
                    color: 'white' 
                  })}>
                    <Stack spacing="sm">
                      <ThemeIcon variant="white" color="blue" radius="md" size="lg">
                        <IconUserCheck size={20} />
                      </ThemeIcon>
                      <Title order={4}>ทำไมต้อง SSKRU?</Title>
                      <Text size="sm" sx={{ opacity: 0.9 }}>
                        มหาวิทยาลัยชั้นนำในภูมิภาค พร้อมพาคุณก้าวข้ามขีดจำกัด ค้นหาตัวตนและสร้างความสำเร็จที่แท้จริง
                      </Text>
                      <Button variant="white" color="blue" fullWidth mt="xs">เรียนรู้เพิ่มเติม</Button>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Transition>
    </Box>
  );
}
