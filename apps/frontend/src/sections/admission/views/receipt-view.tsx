'use client';

import { Box, Button, Container, Divider, Grid, Group, Image, Stack, Text, Title, Paper, Badge } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import { useAuthContext } from '@src/auth/hooks';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { LoadingScreen } from '@src/components/loading-screen';

export default function AdmissionReceiptView() {
  const { user } = useAuthContext();
  const { data: student, loading } = useRestQuery(user?.id ? endpoints.student.details(user.id) : null);

  if (loading) return <LoadingScreen />;
  if (!student) return <Text align="center" py="xl">ไม่พบข้อมูลใบสมัคร</Text>;

  const print = () => window.print();

  return (
    <Container size="md" py="xl">
        {/* Printable Area */}
        <Box id="printable-receipt" sx={{ '@media print': { margin: 0, padding: 0 } }}>
            <Paper p={40} withBorder shadow="sm" radius="md">
                <Stack spacing="xl">
                    {/* Header */}
                    <Group position="apart">
                         <Group>
                            <Image width={60} src={'/sskru.png'} alt="sskru" />
                            <Stack spacing={0}>
                                <Text size="xl" fw="bold" color="sskruGold.7">มหาวิทยาลัยราชภัฏศรีสะเกษ</Text>
                                <Text size="sm" color="dimmed" fw="bold">SISAKET RATJABHAT UNIVERSITY</Text>
                            </Stack>
                         </Group>
                         <Stack spacing={0} align="flex-end">
                            <Title order={3}>ใบยืนยันการสมัครเรียน</Title>
                            <Text size="xs" color="dimmed">วันที่พิมพ์: {new Date().toLocaleDateString('th-TH')}</Text>
                         </Stack>
                    </Group>

                    <Divider variant="dashed" />

                    {/* Student Info */}
                    <Stack spacing="md">
                        <Title order={4}>ข้อมูลส่วนตัว (Applicant Information)</Title>
                        <Grid>
                            <Grid.Col span={4}><Text color="dimmed">ชื่อ-นามสกุล:</Text></Grid.Col>
                            <Grid.Col span={8}><Text fw={600}>{student.firstname} {student.lastname}</Text></Grid.Col>
                            
                            <Grid.Col span={4}><Text color="dimmed">รหัสบัตรประชาชน/ID:</Text></Grid.Col>
                            <Grid.Col span={8}><Text fw={600}>{student.studentId}</Text></Grid.Col>

                            <Grid.Col span={4}><Text color="dimmed">เบอร์โทรศัพท์:</Text></Grid.Col>
                            <Grid.Col span={8}><Text fw={600}>{student.phone || '-'}</Text></Grid.Col>

                            <Grid.Col span={4}><Text color="dimmed">อีเมล:</Text></Grid.Col>
                            <Grid.Col span={8}><Text fw={600}>{student.email || '-'}</Text></Grid.Col>
                        </Grid>
                    </Stack>

                    {/* Enrollment Info */}
                    <Stack spacing="md">
                        <Title order={4}>รายการที่สมัคร (Application Details)</Title>
                        <Paper p="md" radius="md" withBorder sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] })}>
                            <Grid>
                                <Grid.Col span={4}><Text color="dimmed">แผนการเรียน:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={700} color="sskruGold.8">{student.program}</Text></Grid.Col>
                                
                                <Grid.Col span={4}><Text color="dimmed">ปีการศึกษา:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.year}</Text></Grid.Col>

                                <Grid.Col span={4}><Text color="dimmed">สถานะปัจจุบัน:</Text></Grid.Col>
                                <Grid.Col span={8}><Badge color="sskruGold" variant="filled">สมัครเรียนเรียบร้อยแล้ว</Badge></Grid.Col>
                            </Grid>
                        </Paper>
                    </Stack>

                    {/* Address Info */}
                    <Stack spacing="md">
                        <Title order={4}>ข้อมูลที่อยู่ (Contact Address)</Title>
                        <Text fw={600}>{student.address || '-'}</Text>
                    </Stack>

                    {/* Parent Info */}
                    {student.parentInfo && (
                        <Stack spacing="md">
                            <Title order={4}>ข้อมูลครอบครัว (Family Information)</Title>
                            <Grid>
                                <Grid.Col span={4}><Text color="dimmed">บิดา:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.parentInfo.father?.firstname} {student.parentInfo.father?.lastname} ({student.parentInfo.father?.phone || '-'})</Text></Grid.Col>
                                
                                <Grid.Col span={4}><Text color="dimmed">มารดา:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.parentInfo.mother?.firstname} {student.parentInfo.mother?.lastname} ({student.parentInfo.mother?.phone || '-'})</Text></Grid.Col>

                                <Grid.Col span={4}><Text color="dimmed">ผู้ปกครอง:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.parentInfo.guardian?.firstname} {student.parentInfo.guardian?.lastname} ({student.parentInfo.guardian?.phone || '-'})</Text></Grid.Col>
                            </Grid>
                        </Stack>
                    )}

                    {/* Education Info */}
                    {student.educationInfo && (
                        <Stack spacing="md">
                            <Title order={4}>วุฒิการศึกษา (Educational Background)</Title>
                            <Grid>
                                <Grid.Col span={4}><Text color="dimmed">วุฒิที่ใช้สมัคร:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.educationInfo.qualification}</Text></Grid.Col>
                                
                                <Grid.Col span={4}><Text color="dimmed">โรงเรียนเดิม:</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600}>{student.educationInfo.schoolName}</Text></Grid.Col>

                                <Grid.Col span={4}><Text color="dimmed">เกรดเฉลี่ย (GPAX):</Text></Grid.Col>
                                <Grid.Col span={8}><Text fw={600} color="sskruGold.8">{student.educationInfo.gpax}</Text></Grid.Col>
                            </Grid>
                        </Stack>
                    )}

                    <Divider />

                    <Box py="xl" sx={{ textAlign: 'center' }}>
                         <Text size="sm" color="dimmed" mb="xs">กรุณาพิมพ์เอกสารนี้เพื่อนำมาแสดงในวันรายงานตัวหรือวันสอบสัมภาษณ์</Text>
                         <Text size="xs" italic color="dimmed">* เอกสารฉบับนี้พิมพ์โดยระบบรับสมัครนักศึกษาอัตโนมัติ *</Text>
                    </Box>

                </Stack>
            </Paper>
        </Box>

        {/* Action Buttons */}
        <Group position="center" mt="xl" sx={{ '@media print': { display: 'none' } }}>
            <Button size="lg" color="sskruGold" leftIcon={<IconPrinter size={20} />} onClick={print} sx={{ boxShadow: '0 8px 15px rgba(197, 160, 40, 0.2)' }}>
                พิมพ์ใบสมัคร (Print Now)
            </Button>
            <Button variant="outline" color="gray" onClick={() => window.history.back()}>
                กลับสู่หน้าหลัก
            </Button>
        </Group>

        {/* CSS for printing */}
        <style jsx global>{`
          @media print {
            body { 
              background: white !important;
              padding: 0 !important;
            }
            .mantine-AppShell-root {
              padding: 0 !important;
            }
            .mantine-Header-root, .mantine-Footer-root {
              display: none !important;
            }
            #printable-receipt {
              width: 100% !important;
              border: none !important;
            }
            .mantine-Paper-root {
              border: none !important;
              box-shadow: none !important;
              padding: 0 !important;
            }
          }
        `}</style>
    </Container>
  );
}
