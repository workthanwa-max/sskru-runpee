"use client";

import { Menu, Avatar, Text, Group, Divider } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { useRouter } from '@src/routes/hooks';

export default function ProfileMenu() {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) return null;

  // สมมติ user มี name, email, roles
  const name = user.name || user.username || '-';
  const email = user.email || '-';
  const roles = Array.isArray(user.roles) ? user.roles.join(', ') : '-';

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <Group spacing={8} style={{ cursor: 'pointer' }}>
          <Avatar radius="xl" color="yellow" size={32} />
          <Text size="sm" fw={500}>{name}</Text>
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Group direction="column" spacing={2} p={8}>
          <Text fw={700}>{name}</Text>
          <Text size="xs" color="dimmed">{email}</Text>
          <Text size="xs" color="blue">{roles}</Text>
        </Group>
        <Divider my={4} />
        <Menu.Item onClick={() => router.push('/profile')}>ดูโปรไฟล์</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
