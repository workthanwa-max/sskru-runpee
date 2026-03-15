import { Button, Navbar, ScrollArea } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { CustomNavlink } from '@src/components/nav-link';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
type CurriculumReqNavbarProps = {
  activityId: string;
};
export default function CurriculumReqDegreeNavbar({ activityId }: CurriculumReqNavbarProps) {
  const { logout, authenticated } = useAuthContext();
  const router = useRouter();
  return (
    <Navbar height={'100vh'} sx={{ zIndex: 0 }} width={{ base: 240 }} p="xs" bg={'#FBF4E5'}>
      <Navbar.Section grow>
        <ScrollArea
          style={{ height: 800 }}
          styles={{
            scrollbar: {
              '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
                backgroundColor: '#D7A126',
              },
            },
          }}
        >
          <CustomNavlink label={'หน้าหลัก'} onClick={() => router.push(paths.curriculum.request.root)} />
        </ScrollArea>
      </Navbar.Section>
      {authenticated && (
        <Navbar.Section>
          <Button variant="subtle" onClick={() => logout()} color="dark">
            ออกจากระบบ
          </Button>
        </Navbar.Section>
      )}
    </Navbar>
  );
}
