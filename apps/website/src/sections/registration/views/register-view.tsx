import { Card, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import RegisterForm from '../form';

export default function RegisterView() {
  return (
    <Card shadow="lg">
      <Card.Section p={'md'} pb={0}>
        <Text color="#D19509" size={'lg'} fw={'bold'}>
          ลงทะเบียนผู้สมัคร
        </Text>
      </Card.Section>
      <Card.Section p={'md'}>
        <RegisterForm />
      </Card.Section>
      <Card.Section p={'md'} pt={0}>
        <Text size="sm" color="dimmed" align="center">
          มีบัญชีผู้ใช้งานแล้ว?{' '}
          <Text component={RouterLink} href={paths.auth.login} color="yellow" fw={600}>
            เข้าสู่ระบบ
          </Text>
        </Text>
      </Card.Section>
    </Card>
  );
}
