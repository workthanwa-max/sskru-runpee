import { AppShell, AppShellProps, Container, Flex, Group, Header, Image, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import { PropsWithChildren } from 'react';

type CurriculumLayoutProps = AppShellProps & PropsWithChildren;

export function CurriculumLayout({ children, ...props }: CurriculumLayoutProps) {
  const homeLink = paths.home;

  return (
    <AppShell
      {...props}
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
                    <Text size={'xl'} fw={'bold'} color="yellow">
                      มหาวิทยาลัยราชภัฏศรีสะเกษ
                    </Text>
                    <Text fw={'bold'} size={'sm'} color="grey">
                      SISAKET RATJABHAT UNIVERSITY
                    </Text>
                  </Flex>
                </RouterLink>
              </Group>
            </Flex>
          </Container>
        </Header>
      }
      bg={'#F5D582'}
    >
      <Container fluid size={'xl'}>
        {children}
      </Container>
    </AppShell>
  );
}

export default CurriculumLayout;
