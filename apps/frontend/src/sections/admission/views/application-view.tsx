'use client';

import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    Group,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
    useMantineTheme,
} from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import Iconify from '@src/components/iconify';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { FORM_PERSIST_KEY } from '../enrollment/constant';
import { ENROLLMENT_SECTIONS } from '@src/layout/enrollment-layout';

type InfoRowProps = { label: string; value?: string | null };
function InfoRow({ label, value }: InfoRowProps) {
  return (
    <Grid.Col span={12} sm={6}>
      <Box>
        <Text size="xs" color="dimmed" fw={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {label}
        </Text>
        <Text fw={600} size="sm">
          {value || '—'}
        </Text>
      </Box>
    </Grid.Col>
  );
}

export default function ApplicationView() {
  const theme = useMantineTheme();
  const { user } = useAuthContext();

  // Load persisted form data
  let formData: Record<string, any> = {};
  try {
    const stored = sessionStorage.getItem(FORM_PERSIST_KEY);
    if (stored) formData = JSON.parse(stored);
  } catch {
    formData = {};
  }

  const personalInfo = formData?.personalInfo ?? {};
  const addressInfo = formData?.addressInfo ?? {};
  const parentInfo = formData?.parentInfo ?? {};
  const qualification = formData?.qualification ?? {};

  const handlePrint = () => window.print();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `radial-gradient(circle at top right, ${theme.colors.sskruGold[0]} 0%, transparent 50%), radial-gradient(circle at bottom left, ${theme.colors.sskruWhite[2]} 0%, transparent 50%)`,
        padding: theme.spacing.xl,
      }}
    >
      <Container size="lg">
        <Stack spacing="xl">
          {/* Header Banner */}
          <Paper
            p="xl"
            radius="xl"
            sx={{
              background: `linear-gradient(135deg, ${theme.colors.sskruGold[7]} 0%, ${theme.colors.sskruGold[9]} 100%)`,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Iconify icon="solar:document-text-bold-duotone" width={200} style={{ position: 'absolute', right: -30, top: -30, opacity: 0.1 }} />
            <Group position="apart" sx={{ position: 'relative', zIndex: 1 }}>
              <Group spacing="md">
                <ThemeIcon size={64} radius="xl" color="white" variant="light">
                  <Iconify icon="solar:diploma-bold-duotone" width={36} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" fw={700} sx={{ opacity: 0.8, textTransform: 'uppercase' }}>มหาวิทยาลัยราชภัฏศรีสะเกษ</Text>
                  <Title order={1} sx={{ fontWeight: 900, fontSize: '1.8rem' }}>ใบสมัครเข้าศึกษา</Title>
                  <Group spacing="xs" mt={4}>
                    <Badge color="white" variant="outline" size="sm">สำเร็จ</Badge>
                    <Text size="xs" sx={{ opacity: 0.8 }}>ข้อมูลถูกบันทึกเรียบร้อยแล้ว</Text>
                  </Group>
                </Box>
              </Group>

              <Group>
                <Button
                  variant="white"
                  color="sskruGold"
                  radius="md"
                  leftIcon={<Iconify icon="solar:printer-bold-duotone" width={18} />}
                  onClick={handlePrint}
                >
                  พิมพ์ใบสมัคร
                </Button>
                <Button
                  variant="outline"
                  color="white"
                  radius="md"
                  component={RouterLink}
                  href={paths.admission.root}
                  leftIcon={<Iconify icon="solar:home-smile-bold-duotone" width={18} />}
                >
                  กลับหน้าหลัก
                </Button>
              </Group>
            </Group>
          </Paper>

          {/* Status Summary Strip */}
          <Paper p="md" radius="xl" withBorder>
            <Group>
              {ENROLLMENT_SECTIONS.map((section) => (
                <Group key={section.key} spacing="xs">
                  <ThemeIcon size={24} radius="xl" color="green" variant="light">
                    <Iconify icon="solar:check-circle-bold-duotone" width={14} />
                  </ThemeIcon>
                  <Text size="xs" fw={600} color="green.7">{section.label}</Text>
                </Group>
              ))}
            </Group>
          </Paper>

          {/* Application Details */}
          <Card p="xl" radius="xl" withBorder sx={{ backgroundColor: 'white' }}>
            <Title order={3} mb="lg" sx={{ color: theme.colors.sskruGold[9], fontWeight: 800 }}>
              ข้อมูลการสมัคร
            </Title>
            <Grid gutter="md">
              <InfoRow label="ปีการศึกษา" value={`${new Date().getFullYear() + 543}`} />
              <InfoRow label="สาขาวิชาที่สมัคร" value={formData?.facultyId} />
              <InfoRow label="ประเภทการสมัคร" value={formData?.programType} />
            </Grid>
          </Card>

          <Card p="xl" radius="xl" withBorder sx={{ backgroundColor: 'white' }}>
            <Title order={3} mb="lg" sx={{ color: theme.colors.sskruGold[9], fontWeight: 800 }}>
              ข้อมูลส่วนตัว
            </Title>
            <Grid gutter="md">
              <InfoRow label="คำนำหน้า" value={personalInfo.prefix} />
              <InfoRow label="เพศ" value={personalInfo.gender === 'male' ? 'ชาย' : personalInfo.gender === 'female' ? 'หญิง' : personalInfo.gender} />
              <InfoRow label="ชื่อ - นามสกุล" value={`${personalInfo.firstname ?? ''} ${personalInfo.lastname ?? ''}`} />
              <InfoRow label="ชื่อ - นามสกุล (ภาษาอังกฤษ)" value={`${personalInfo.firstnameEN ?? ''} ${personalInfo.lastnameEN ?? ''}`} />
              <InfoRow label="วันเกิด" value={personalInfo.birth ? new Date(personalInfo.birth).toLocaleDateString('th-TH') : undefined} />
              <InfoRow label="สัญชาติ" value={personalInfo.nationality} />
              <InfoRow label="รหัสบัตรประชาชน" value={personalInfo.personnelId} />
              <InfoRow label="เบอร์โทรศัพท์" value={personalInfo.phone} />
              <InfoRow label="อีเมล" value={personalInfo.email} />
            </Grid>

            <Divider my="xl" label="ที่อยู่ตามทะเบียนบ้าน" labelPosition="center" />

            <Grid gutter="md">
              <InfoRow label="บ้านเลขที่" value={addressInfo.houseNumber} />
              <InfoRow label="หมู่ที่" value={addressInfo.moo} />
              <InfoRow label="ถนน" value={addressInfo.street} />
              <InfoRow label="ตำบล/แขวง" value={addressInfo.subDistrict} />
              <InfoRow label="อำเภอ/เขต" value={addressInfo.district} />
              <InfoRow label="จังหวัด" value={addressInfo.province} />
              <InfoRow label="รหัสไปรษณีย์" value={addressInfo.postalCode} />
            </Grid>
          </Card>

          <Card p="xl" radius="xl" withBorder sx={{ backgroundColor: 'white' }}>
            <Title order={3} mb="lg" sx={{ color: theme.colors.sskruGold[9], fontWeight: 800 }}>
              วุฒิการศึกษา
            </Title>
            <Grid gutter="md">
              <InfoRow label="วุฒิที่ใช้สมัคร" value={qualification.qualification} />
              <InfoRow label="จากสถานศึกษา" value={qualification.schoolName} />
              <InfoRow label="จังหวัด" value={qualification.province} />
              <InfoRow label="เกรดเฉลี่ย (GPAX)" value={qualification.gpax} />
            </Grid>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
