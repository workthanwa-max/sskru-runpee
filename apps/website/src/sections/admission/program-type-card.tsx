import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';
import { useAuthContext } from '@src/auth/hooks';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { programTypeInfo } from './constant';

export default function ProgramTypeCard() {
  const { authenticated } = useAuthContext();
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <Group spacing="md">
      {[...programTypeInfo.values()].map((item) => (
        <Card
          key={item.program}
          p="lg"
          w={220}
          radius="xl"
          sx={{ 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            background: `linear-gradient(135deg, ${theme.colors.sskruGold[6]} 0%, ${theme.colors.sskruGold[8]} 100%)`,
            '&:hover': { 
              transform: 'translateY(-5px)',
              boxShadow: '0 12px 24px rgba(197, 160, 40, 0.25)',
              filter: 'brightness(1.1)'
            } 
          }}
          onClick={() => {
            if (authenticated) {
              router.push(item.href);
            } else {
              // Redirect to registration first as requested
              router.push(paths.admission.register);
            }
          }}
        >
          <Center h="100%">
            <Text color="white" fw={800} size="md"> {item.label} </Text>
          </Center>
        </Card>
      ))}
    </Group>
  );
}
