'use client';

import {
    Box, Container, Grid, Image,
    Stack,
    Text,
    Title,
    useMantineTheme,
    Paper,
    Center
} from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { paths } from '@src/routes/paths';
import Iconify from '@src/components/iconify';

// ----------------------------------------------------------------------

export default function LandingView() {
  const theme = useMantineTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={(theme) => ({
          background: `radial-gradient(circle at top right, ${theme.colors.sskruGold[0]} 0%, transparent 70%), linear-gradient(135deg, #FFFFFF 0%, ${theme.colors.sskruWhite[1]} 100%)`,
          padding: '120px 0',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 40,
          marginBottom: '60px',
          boxShadow: '0 10px 30px rgba(197, 160, 40, 0.03)',
          '&::before': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 30%, rgba(197, 160, 40, 0.05) 0%, transparent 60%)',
          }
        })}>
        <Container size="xl" sx={{ width: '100%' }}>
          <Grid align="center">
            <Grid.Col span={12} md={7}>
              <Stack spacing="xl">
                <Box>
                  <Text color="sskruGold.7" fw={900} size="xl" sx={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                    ยินดีต้อนรับสู่
                  </Text>
                  <Title
                    order={1}
                    sx={(theme) => ({
                      fontSize: 56,
                      fontWeight: 900,
                      color: theme.colors.sskruGold[9],
                      lineHeight: 1.1,
                      letterSpacing: '-0.03em'
                    })}
                  >
                    ระบบบริหารจัดการข้อมูล <br />
                    <Text component="span" sx={(theme) => ({ color: theme.colors.sskruGold[7] })}>
                      มหาวิทยาลัยราชภัฏศรีสะเกษ
                    </Text>
                  </Title>
                </Box>

                <Text size="lg" color="dimmed" sx={{ maxWidth: 500 }}>
                  ระบบศูนย์กลางสำหรับการจัดการหลักสูตร ข้อมูลบุคลากร และทรัพยากรทางการศึกษา 
                  เพื่อยกระดับการบริหารงานภายในมหาวิทยาลัยให้มีประสิทธิภาพสูงสุด
                </Text>

                
              </Stack>
            </Grid.Col>

            <Grid.Col span={12} md={5}>
              <Center>
                <Image
                  src="/sskru.png"
                  alt="SSKRU Logo"
                  sx={{
                    maxWidth: 350,
                    filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.1))',
                  }}
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container size="xl" py={20}>
        <Title order={2} align="center" sx={(theme) => ({
          fontWeight: 900,
          fontSize: 40,
          color: theme.colors.sskruGold[8]
        })}>
          บริการสำหรับสมาชิก
        </Title>
        <Text align="center" color="dimmed" mb={50}>
          เข้าใช้งานระบบต่างๆ ของมหาวิทยาลัยราชภัฏศรีสะเกษ
        </Text>

        <Grid gutter={30}>
          <Grid.Col span={12} sm={6} md={3}>
            <FeatureCard
              title="ระบบแอดมิน (Command Center)"
              description="ระบบจัดการสิทธิ์ บัญชีผู้ใช้ ช้อมูลหน่วยงาน และภาพรวมของระบบทั้งหมด"
              icon="solar:settings-bold-duotone"
              color="red"
              service="management"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={3}>
            <FeatureCard
              title="ระบบจัดการหลักสูตร (Academic Portal)"
              description="ระบบสำหรับอาจารย์และเจ้าหน้าที่ในการร่าง พัฒนา และยื่นเสนอหลักสูตรใหม่"
              icon="solar:document-add-bold-duotone"
              color="orange"
              service="curriculum/request"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={3}>
            <FeatureCard
              title="ระบบอนุมัติหลักสูตร (Quality Assurance)"
              description="ระบบสำหรับคณะกรรมการและผู้บริหารในการพิจารณา อนุมัติ และประกาศใช้หลักสูตร"
              icon="solar:verified-check-bold-duotone"
              color="teal"
              service="curriculum/approve"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={3}>
            <FeatureCard
              title="ระบบรับสมัครนักศึกษา (Admission Hub)"
              description="ระบบสำหรับผู้สมัครและนักศึกษาในการสมัครเรียน ติดตามสถานะ และเข้าถึงประกาศต่างๆ"
              icon="solar:user-speak-bold-duotone"
              color="blue"
              service="admission"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  color: string;
  service: string;
};

function FeatureCard({ title, description, icon, color, service }: FeatureCardProps) {
  return (
    <Paper
      component={RouterLink}
      href={service === 'admission' ? paths.admission.root : `${paths.auth.login}?service=${service}`}
      p="xl"
      radius="lg"
      withBorder
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        backgroundColor: theme.white,
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: theme.shadows.xl,
          borderColor: theme.colors[color][4],
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: theme.colors[color][0],
          color: theme.colors[color][6],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.xl,
        })}
      >
        <Iconify icon={icon} width={40} />
      </Box>

      <Title order={3} size="lg" mb="sm" sx={{ fontWeight: 800 }}>
        {title}
      </Title>

      <Text size="sm" color="dimmed" sx={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </Paper>
  );
}
