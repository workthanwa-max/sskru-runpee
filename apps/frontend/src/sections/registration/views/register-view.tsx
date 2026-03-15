'use client';

import {
    Box, Container,
    Divider,
    Group,
    Image,
    Paper,
    Stack,
    Text,
    ThemeIcon,
    Title,
    useMantineTheme
} from '@mantine/core';
import Iconify from '@src/components/iconify';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import RegisterForm from '../form';

export default function RegisterView() {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `radial-gradient(circle at top right, ${theme.colors.sskruGold[0]} 0%, transparent 50%), radial-gradient(circle at bottom left, ${theme.colors.sskruWhite[2]} 0%, transparent 40%)`,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing.xl,
      }}
    >
      <Container size="sm" sx={{ width: '100%' }}>
        <Stack spacing="xl" align="center" mb="xl">
          <Group spacing="sm">
            <Image width={48} src="/sskru.png" alt="SSKRU" />
            <Box>
              <Title order={2} sx={{ color: theme.colors.sskruGold[9], fontWeight: 900, lineHeight: 1.1 }}>
                มหาวิทยาลัยราชภัฏศรีสะเกษ
              </Title>
              <Text size="sm" color="dimmed">ระบบรับสมัครนักศึกษา</Text>
            </Box>
          </Group>
        </Stack>

        <Paper
          p="xl"
          radius="xl"
          shadow="md"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.colors.sskruGold[2]}`,
          }}
        >
          {/* Header Banner */}
          <Paper
            p="lg"
            radius="lg"
            mb="xl"
            sx={{
              background: `linear-gradient(135deg, ${theme.colors.sskruGold[0]} 0%, ${theme.colors.sskruGold[2]} 100%)`,
              border: `1px solid ${theme.colors.sskruGold[3]}`,
            }}
          >
            <Group spacing="md">
              <ThemeIcon size={48} radius="xl" color="sskruGold" variant="light">
                <Iconify icon="solar:user-plus-bold-duotone" width={26} />
              </ThemeIcon>
              <Box>
                <Title order={3} sx={{ color: theme.colors.sskruGold[9], fontWeight: 900 }}>
                  ลงทะเบียนเพื่อสมัครเรียน
                </Title>
                <Text size="sm" sx={{ color: theme.colors.sskruGold[8] }}>
                  กรุณาสร้างบัญชีก่อนเริ่มกรอกใบสมัคร
                </Text>
              </Box>
            </Group>
          </Paper>

          <RegisterForm />

          <Divider my="xl" />

          <Text size="sm" color="dimmed" align="center">
            มีบัญชีผู้ใช้งานแล้ว?{' '}
            <Text
              component={RouterLink}
              href={paths.auth.login}
              color="sskruGold"
              fw={700}
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              เข้าสู่ระบบ
            </Text>
          </Text>

          <Text size="xs" color="dimmed" align="center" mt="xs">
            <Text
              component={RouterLink}
              href={paths.admission.root}
              color="dimmed"
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              ← กลับไปดูหลักสูตร
            </Text>
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}
