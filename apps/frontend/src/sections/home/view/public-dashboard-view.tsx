'use client';

import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Stack,
    Text,
    Title,
    useMantineTheme, Paper,
    Loader
} from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Faculty, Curriculum } from '@src/types/domain';
import { useAuthContext } from '@src/auth/hooks';

// ----------------------------------------------------------------------

export default function PublicDashboardView() {
  const theme = useMantineTheme();
  const { authenticated } = useAuthContext();
  
  const { data: faculties, loading: loadingFaculties } = useRestQuery<Faculty[]>(endpoints.faculty.list);
  const { data: curriculums, loading: loadingCurriculums } = useRestQuery<Curriculum[]>(endpoints.curriculum.activities);

  if (loadingFaculties || loadingCurriculums) {
    return (
      <Container size="xl" py={100} sx={{ textAlign: 'center' }}>
        <Loader size="xl" variant="dots" color="yellow" />
      </Container>
    );
  }

  // Filter top-level faculties (mostly academic units)
  const mainFaculties = faculties?.filter((f) => !f.parentId) ?? [];

  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        {/* Header Section */}
        <Paper
          p="xl"
          radius="xl"
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.colors.sskruGold[0]} 0%, ${theme.colors.sskruGold[2]} 100%)`,
            border: `1px solid ${theme.colors.sskruGold[2]}`,
            boxShadow: '0 20px 40px rgba(197, 160, 40, 0.05)',
          })}
        >
          <Group position="apart" align="center">
            <Stack spacing={4}>
              <Title order={1} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 900 })}>
                ระบบจัดการข้อมูลหลักสูตร (SSKRU OASS)
              </Title>
              <Text color="dimmed" fw={600}>
                มหาวิทยาลัยราชภัฏศรีสะเกษ | ค้นหาข้อมูลหลักสูตรและสมัครเรียน
              </Text>
            </Stack>
            <Group>
              {!authenticated ? (
                <>
                  <Button 
                    component={RouterLink} 
                    href={paths.admission.register} 
                    size="lg" 
                    color="sskruGold" 
                    radius="md" 
                    sx={{ boxShadow: '0 8px 16px rgba(197, 160, 40, 0.2)' }}
                  >
                    สมัครเรียน
                  </Button>
                  <Button component={RouterLink} href={paths.auth.login} size="lg" variant="outline" color="sskruGold" radius="md">
                    มีบัญชีแล้ว? เข้าสู่ระบบ
                  </Button>
                </>
              ) : (
                <Button component={RouterLink} href={paths.admission.root} size="lg" color="sskruGold" radius="md">
                  ไปที่หน้าการสมัครเดิม
                </Button>
              )}
            </Group>
          </Group>
        </Paper>

        <Divider label={<Badge color="sskruGold" variant="light" size="lg">ข้อมูลแยกตามคณะ</Badge>} labelPosition="center" size="sm" />

        {/* Faculties & Curriculums Display */}
        <Grid gutter="xl">
          {mainFaculties.map((faculty) => {
            const facultyCurriculums = curriculums?.filter((c) => c.facultyId === faculty.id) ?? [];
            
            return (
              <Grid.Col key={faculty.id} span={12}>
                <Stack spacing="md">
                  <Group spacing="xs">
                    <Box
                      sx={(theme) => ({
                        width: 8,
                        height: 32,
                        backgroundColor: theme.colors.sskruGold[5],
                        borderRadius: 4,
                      })}
                    />
                    <Title order={3} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 800 })}>{faculty.name}</Title>
                    <Text color="dimmed" size="sm" fw={600}>
                      ({facultyCurriculums.length} หลักสูตร)
                    </Text>
                  </Group>

                  {facultyCurriculums.length > 0 ? (
                    <Grid gutter="md">
                      {facultyCurriculums.map((cur) => (
                        <Grid.Col key={cur.id} span={12} sm={6} md={4} lg={3}>
                          <Card
                            shadow="sm"
                            p="lg"
                            radius="xl"
                            withBorder
                            sx={(theme) => ({
                              height: '100%',
                              transition: 'all 0.3s ease',
                              backgroundColor: 'white',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                borderColor: theme.colors.sskruGold[4],
                                boxShadow: '0 12px 24px rgba(197, 160, 40, 0.1)',
                              },
                            })}
                          >
                            <Stack justify="space-between" h="100%">
                              <Box>
                                <Text fw={800} sx={(theme) => ({ textTransform: 'uppercase', color: theme.colors.sskruGold[7] })} size="xs">
                                  {cur.code}
                                </Text>
                                <Title order={4} size="md" lineClamp={2} sx={(theme) => ({ color: theme.colors.sskruGold[9], fontWeight: 750 })}>
                                  {cur.nameTh}
                                </Title>
                                <Text color="dimmed" size="xs" fw={500}>
                                  {cur.nameEn}
                                </Text>
                              </Box>
                              
                              <Button
                                variant="light"
                                color="sskruGold"
                                fullWidth
                                mt="md"
                                size="sm"
                                radius="md"
                                onClick={() => {
                                  // In a real app, this might navigate to details or show a modal
                                  alert(`ข้อมูลหลักสูตร: ${cur.nameTh}`);
                                }}
                                fw={700}
                              >
                                ดูรายละเอียด
                              </Button>
                            </Stack>
                          </Card>
                        </Grid.Col>
                      ))}
                    </Grid>
                  ) : (
                    <Paper p="md" withBorder sx={{ borderStyle: 'dashed' }}>
                      <Text color="dimmed" align="center">
                        ยังไม่มีข้อมูลหลักสูตรในขณะนี้
                      </Text>
                    </Paper>
                  )}
                </Stack>
              </Grid.Col>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  );
}
