import { AppShell, Button, Container, Divider, Flex, Group, Header, Image, Navbar, NavLink, Stack, Text } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useAuthContext } from '../auth/hooks';
import { LoadingScreen } from '../components/loading-screen';
import { RouterLink } from '../routes/components';
import { usePathname } from '../routes/hooks';
import { paths } from '../routes/paths';

type ManagementLayoutProps = PropsWithChildren;

import Iconify from '../components/iconify';

const navConfigs: Record<string, { label: string; icon: string }> = {
  root: { label: 'ภาพรวมระบบ', icon: 'solar:widget-bold-duotone' },
  system: { label: 'ระบบ', icon: 'solar:settings-bold-duotone' },
  faculty: { label: 'หน่วยงาน', icon: 'solar:square-academic-cap-bold-duotone' },
  permission: { label: 'สิทธิ์การใช้งาน', icon: 'solar:shield-keyhole-bold-duotone' },
  student: { label: 'นักศึกษา', icon: 'solar:user-speak-bold-duotone' },
  personnel: { label: 'บุคลากร', icon: 'solar:users-group-rounded-bold-duotone' },
  role: { label: 'ตำแหน่ง', icon: 'solar:user-id-bold-duotone' },
};

export function ManagementLayout({ children, ...props }: ManagementLayoutProps) {
  const pathname = usePathname();
  const { logout, loading, authenticated } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  const items = Object.entries(paths.management)
    .map(([key, value]) => {
      const href = typeof value === 'string' ? value : value.root;
      const config = navConfigs[key];
      
      return (
        <NavLink
          key={key}
          active={pathname === href}
          label={
            <Text weight={pathname === href ? 700 : 500} size="sm">
              {config?.label ?? key}
            </Text>
          }
          icon={config && <Iconify icon={config.icon} width={20} />}
          component={RouterLink}
          href={href}
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            marginBottom: 4,
            transition: 'all 0.3s ease',
            color: pathname === href ? theme.colors.sskruGold[9] : theme.colors.gray[8],
            backgroundColor: pathname === href ? theme.colors.sskruGold[1] : 'transparent',
            borderLeft: pathname === href ? `4px solid ${theme.colors.sskruGold[7]}` : '4px solid transparent',
            fontWeight: pathname === href ? 800 : 600,
            '&:hover': {
              backgroundColor: theme.colors.sskruGold[0],
              color: theme.colors.sskruGold[9],
            },
          })}
        />
      );
    });

  const homeLink = paths.management.root;

  return (
    <AppShell
      navbar={
        <Navbar p="md" width={{ base: 260 }} sx={(theme) => ({
            backgroundColor: theme.colors.sskruWhite[0],
            borderRight: `1px solid ${theme.colors.gray[2]}`,
        })}>
          <Navbar.Section grow>
            <Stack spacing={4}>
                {items}
            </Stack>
          </Navbar.Section>
          
          <Divider my="md" />
          
          {authenticated && (
            <Navbar.Section>
              <Button 
                variant="light" 
                onClick={() => logout()} 
                color="red" 
                fullWidth
                radius="md"
                leftIcon={<Iconify icon="solar:logout-3-bold-duotone" width={20} />}
              >
                ออกจากระบบ
              </Button>
            </Navbar.Section>
          )}
        </Navbar>
      }
      header={
        <Header height={96}>
          <Container fluid size={'xl'}>
            <Flex justify={'space-between'} h={96} align={'center'} id="logo">
              <Group>
                <RouterLink href={'/'}>
                  <Image width={40} src={'/sskru.png'} alt="sskru" />
                </RouterLink>
                <RouterLink href={homeLink}>
                  <Flex direction={'column'}>
                    <Text size={'xl'} fw={'bold'} color="sskruGold.7">
                      มหาวิทยาลัยราชภัฏศรีสะเกษ
                    </Text>
                    <Text fw={'bold'} size={'sm'} color="dimmed">
                      มหาวิทยาลัยราชภัฏศรีสะเกษ (SSKRU)
                    </Text>
                  </Flex>
                </RouterLink>
              </Group>
            </Flex>
          </Container>
        </Header>
      }
      bg={'sskruWhite.0'}
    >
      <Container fluid size={'xl'}>
        {children}
      </Container>
    </AppShell>
  );
}

export default ManagementLayout;
