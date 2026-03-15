import { Button, Divider, Navbar, Stack, Text } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { CustomNavlink } from '@src/components/nav-link';
import { usePathname, useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import Iconify from '@src/components/iconify';
export default function CurriculumNavbar() {
  const pathname = usePathname();
  const { logout, authenticated, user } = useAuthContext();
  const systemUrls = user?.systemUrls || [];

  const router = useRouter();
  const items = Object.entries(paths.curriculum)
    .filter(([key, value]) => {
        if (key === 'root') return false;
        const href = typeof value === 'string' ? value : value.root;
        // Check if the system's root path is in the user's allowed systemUrls
        // e.g. if key is 'request', href is '/curriculum/request'
        // we check if 'curriculum/request' is in systemUrls (without leading slash usually)
        const systemKey = href.replace(/^\//, ''); 
        return systemUrls.includes(systemKey);
    })
    .map(([key, value]) => {
      const href = typeof value === 'string' ? value : value.root;
      return (
        <CustomNavlink
          key={key}
          active={pathname === href}
          label={
            <Text weight={pathname === href ? 800 : 600} size="sm">
              {key === 'request' ? 'ระบบจัดการหลักสูตร' : key === 'approve' ? 'ระบบอนุมัติหลักสูตร' : key}
            </Text>
          }
          onClick={() => router.push(href)}
        />
      );
    });
  return (
    <Navbar p="md" width={{ base: 260 }} bg={'white'} sx={(theme) => ({
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
  );
}
