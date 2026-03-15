import { AppShell, Button, Container, Flex, Group, Header, Image, Text } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useAuthContext } from '../auth/hooks';
import { LoadingScreen } from '../components/loading-screen';
import { RouterLink } from '../routes/components';
import { useRouter } from '../routes/hooks';
import { paths } from '../routes/paths';

type AdmissionLayoutProps = PropsWithChildren;

export function AdmissionLayout({ children }: AdmissionLayoutProps) {
  const { logout, loading, authenticated } = useAuthContext();
  const router = useRouter();

  const homeLink = paths.admission.root;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AppShell
      header={
        <Header height={96}>
          <Container size={'xl'}>
            <Flex justify={'space-between'} h={96} align={'center'} id="logo">
              <RouterLink href={homeLink}>
                <Group>
                  <Image width={40} src={'/sskru.png'} alt="sskru" />
                  <Flex direction={'column'}>
                    <Text size={'xl'} fw={'bold'} color="sskruGold.7">
                      มหาวิทยาลัยราชภัฏศรีสะเกษ
                    </Text>
                    <Text fw={'bold'} size={'sm'} color="dimmed">
                      SISAKET RATJABHAT UNIVERSITY
                    </Text>
                  </Flex>
                </Group>
              </RouterLink>
              {authenticated && (
                <Button variant="subtle" onClick={() => logout()} color="sskruGold">
                  ออกจากระบบ
                </Button>
              )}
            </Flex>
          </Container>
        </Header>
      }
      bg={'sskruWhite.0'}
    >
      <Container size={'xl'}>{children}</Container>
    </AppShell>
  );
}

export default AdmissionLayout;
