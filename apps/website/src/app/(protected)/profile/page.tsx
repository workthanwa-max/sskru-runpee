'use client';

import { useAuthContext } from '@src/auth/hooks';
import { Card, Group, Text, Title, Divider, Badge } from '@mantine/core';

export default function ProfilePage() {
  const { user } = useAuthContext();
  if (!user) return null;
  const name = user.name || user.username || '-';
  const email = user.email || '-';
  const roles = Array.isArray(user.roles) ? user.roles : [];

  return (
    <Card shadow="md" p="xl" radius="md" sx={{ maxWidth: 480, margin: '40px auto' }}>
      <Title order={2} mb="md">โปรไฟล์ผู้ใช้</Title>
      <Group direction="column" spacing={8}>
        <Text fw={700}>ชื่อ: {name}</Text>
        <Text>อีเมล: {email}</Text>
        <Divider my={8} />
        <Text>บทบาท:</Text>
        <Group>
          {roles.length > 0 ? roles.map((role: string) => (
            <Badge key={role} color="blue" variant="filled">{role}</Badge>
          )) : <Text color="dimmed">-</Text>}
        </Group>
      </Group>
    </Card>
  );
}
