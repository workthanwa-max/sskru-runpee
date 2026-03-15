'use client';

import React, { useState } from 'react';
import { Box, Button, Card, Center, Divider, Group, Paper, PasswordInput, Stack, Text, TextInput, ThemeIcon, Title } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter, useSearchParams } from 'next/navigation';
import { paths } from '@src/routes/paths';
import { RouterLink } from '@src/routes/components';
import Iconify from '@src/components/iconify';

const SERVICE_MAP: Record<string, { label: string; icon: string; color: string; path: string }> = {
  management: {
    label: 'ระบบแอดมิน (Command Center)',
    icon: 'solar:settings-bold-duotone',
    color: 'red',
    path: paths.management.root,
  },
  'curriculum/request': {
    label: 'ระบบจัดการหลักสูตร (Academic Portal)',
    icon: 'solar:document-add-bold-duotone',
    color: 'orange',
    path: '/curriculum/request',
  },
  'curriculum/approve': {
    label: 'ระบบอนุมัติหลักสูตร (Quality Assurance)',
    icon: 'solar:verified-check-bold-duotone',
    color: 'teal',
    path: '/curriculum/approve',
  },
  admission: {
    label: 'ระบบรับสมัครนักศึกษา (Admission Hub)',
    icon: 'solar:user-speak-bold-duotone',
    color: 'blue',
    path: '/admission',
  },
};

export default function JwtLoginView() {
  const { login, logout, user } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || '';
  const serviceConfig = SERVICE_MAP[service];

  // Redirect by systemUrls/role after login
  React.useEffect(() => {
    if (user) {
      const systemUrls = Array.isArray(user.systemUrls) ? user.systemUrls : [];
      const roles = Array.isArray(user.roles) ? user.roles : [];

      // ถ้าเข้าผ่าน returnTo (จาก AuthGuard)
      const returnTo = searchParams.get('returnTo');

      if (serviceConfig) {
        const hasAccess = systemUrls.includes(service) || roles.includes('ADMIN');
        
        if (hasAccess) {
          router.push(serviceConfig.path);
        } else {
          // แจ้งเตือนว่าเข้าผิดระบบ
          const userSystem = systemUrls[0];
          const userSystemConfig = Object.values(SERVICE_MAP).find(s => s.path.includes(userSystem) || userSystem === 'management');
          
          notifications.show({
            title: 'เข้าใช้งานผิดระบบ',
            message: `บัญชีนี้มีสิทธิ์เข้าใช้งานใน "${userSystemConfig?.label || userSystem}" เท่านั้น`,
            color: 'orange',
            autoClose: 5000,
          });
          
          // ล็อกเอาท์ออกเพื่อให้ล็อกอินใหม่ได้
          logout();
        }
      } else if (returnTo) {
        router.push(returnTo);
      } else {
        // Fallback เดิม
        if (roles.includes('ADMIN')) {
          router.push(paths.management.root);
        } else if (systemUrls.length >= 1) {
          router.push('/' + systemUrls[0]);
        } else if (roles.includes('STUDENT')) {
          router.push(paths.admission.root);
        } else {
          router.push('/');
        }
      }
    }
  }, [user, router, service, serviceConfig, logout]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      // redirect จะเกิดใน useEffect ด้านบน
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Login Failed',
        message: 'Invalid username or password',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing="xl" sx={{ width: 500 }}>
       {serviceConfig && (
        <Paper p="md" radius="md" withBorder sx={(theme) => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          borderLeft: `4px solid ${theme.colors[serviceConfig.color][6]}`
        })}>
          <Group noWrap>
            <ThemeIcon size="xl" radius="md" color={serviceConfig.color} variant="light">
              <Iconify icon={serviceConfig.icon} width={24} />
            </ThemeIcon>
            <Box>
              <Text size="xs" color="dimmed" transform="uppercase" weight={700} lts="0.05em">กำลังเข้าสู่บริการ</Text>
              <Text size="sm" weight={600}>{serviceConfig.label}</Text>
            </Box>
          </Group>
        </Paper>
      )}

      <Card shadow="xl" p={40} radius="lg" withBorder sx={(theme) => ({
        backdropFilter: 'blur(10px)',
        backgroundColor: theme.colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)',
      })}>
        <Stack spacing="lg">
          <Center mb="sm">
            <Stack align="center" spacing={4}>
              <Title order={2} sx={(theme) => ({ fontWeight: 900, color: theme.colors.sskruGold[9] })}>เข้าสู่ระบบ</Title>
              <Text size="sm" color="dimmed">กรุณากรอกข้อมูลเพื่อเข้าใช้งาน</Text>
            </Stack>
          </Center>

          <form onSubmit={handleLogin}>
            <Stack spacing="md">
              <TextInput
                label="เลขบัตรประชาชน"
                placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                size="md"
                radius="md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                maxLength={13}
                icon={<Iconify icon="solar:card-bold-duotone" width={20} />}
              />
              <PasswordInput
                label="รหัสผ่าน (Password)"
                placeholder="กรอกรหัสผ่านของคุณ"
                size="md"
                radius="md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                icon={<Iconify icon="solar:lock-password-bold-duotone" width={20} />}
              />
              
              <Button 
                type="submit" 
                fullWidth 
                size="md"
                radius="md" 
                loading={loading} 
                mt="xl"
                color={serviceConfig?.color || 'sskruGold'}
                sx={{
                  boxShadow: '0 8px 20px -5px rgba(0,0,0,0.2)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                เข้าสู่ระบบ
              </Button>

              <Divider label="หรือ" labelPosition="center" my="sm" />

              <Button 
                component={RouterLink} 
                href="/" 
                variant="subtle" 
                color="gray" 
                fullWidth
                leftIcon={<Iconify icon="solar:arrow-left-linear" width={18} />}
              >
                เลือกบริการใหม่
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Stack>
  );
}
