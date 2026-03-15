'use client';

import { Button, Navbar, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { CustomNavlink } from '@src/components/nav-link';
import { usePathname, useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { useState } from 'react';
import Iconify from '@src/components/iconify';
import { navConfigs } from './configs';
type CurriculumReqNavbarProps = {
  activityId: string;
};
export default function CurriculumReqNavbar({ activityId }: CurriculumReqNavbarProps) {
  const theme = useMantineTheme();
  const { logout, authenticated } = useAuthContext();
  const pathname = usePathname();
  const navItems = navConfigs(activityId);
  const [active, setActive] = useState(`${pathname}/${navItems[0].children[0].hash}`);
  const router = useRouter();
  return (
    <Navbar height={'100vh'} sx={{ zIndex: 0 }} width={{ base: 260 }} p="md" sx={(theme) => ({
      backgroundColor: theme.colors.sskruWhite[0],
      borderRight: `1px solid ${theme.colors.gray[2]}`,
    })}>
      <Navbar.Section grow>
        <ScrollArea
          style={{ height: 800 }}
          styles={{
            scrollbar: {
              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: theme.colors.sskruGold[6],
              },
            },
          }}
        >
          <CustomNavlink label={'หน้าหลัก'} onClick={() => router.push(paths.curriculum.request.root)} />
          {navItems.map((nav) =>
            !nav.children?.length ? (
              <CustomNavlink
                key={nav.path}
                label={nav.name}
                active={active === nav.path}
                onClick={() => {
                  router.push(nav.path);
                }}
              />
            ) : (
              <CustomNavlink key={nav.path} label={nav.name} childrenOffset={0}>
                <Stack spacing={4} sx={(theme) => ({
                  backgroundColor: theme.colors.sskruGold[0],
                  borderRadius: theme.radius.md,
                  padding: theme.spacing.xs,
                  marginTop: 4,
                })}>
                  {nav.children.map((cnav) => (
                    <CustomNavlink
                      isChild
                      key={cnav.key}
                      label={cnav.name}
                      active={active === `${nav.path}${cnav.hash}`}
                      onClick={() => {
                        const path = `${nav.path}${cnav.hash}`;
                        setActive(path);
                        router.push(path);
                      }}
                    />
                  ))}
                </Stack>
              </CustomNavlink>
            ),
          )}
        </ScrollArea>
      </Navbar.Section>
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
