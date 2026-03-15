'use client';

import {
    AppShell,
    Box,
    Button,
    Container,
    Flex,
    Group,
    Header,
    Image,
    MediaQuery,
    Navbar,
    NavLink,
    Progress,
    ScrollArea,
    Stack,
    Stepper,
    Text,
    ThemeIcon,
    useMantineTheme,
} from '@mantine/core';
import { useAuthContext } from '../auth/hooks';
import { RouterLink } from '../routes/components';
import { paths } from '../routes/paths';
import Iconify from '../components/iconify';

export type EnrollmentSection = {
  key: string;
  label: string;
  icon: string;
  description: string;
};

export const ENROLLMENT_SECTIONS: EnrollmentSection[] = [
  { key: 'course-selection', label: 'เลือกหลักสูตร', icon: 'solar:square-academic-cap-bold-duotone', description: 'เลือกประเภทและสาขาวิชา' },
  { key: 'personal-info', label: 'ข้อมูลส่วนตัว', icon: 'solar:user-id-bold-duotone', description: 'ชื่อ-นามสกุล และข้อมูลพื้นฐาน' },
  { key: 'address-info', label: 'สถานที่ติดต่อ', icon: 'solar:home-2-bold-duotone', description: 'ที่อยู่ปัจจุบันสำหรับการติดต่อ' },
  { key: 'family-info', label: 'ข้อมูลครอบครัว', icon: 'solar:users-group-rounded-bold-duotone', description: 'บิดา มารดา และผู้ปกครอง' },
  { key: 'education-info', label: 'วุฒิการศึกษา', icon: 'solar:diploma-bold-duotone', description: 'ประวัติการศึกษาและเอกสาร' },
  { key: 'review-confirm', label: 'ตรวจสอบข้อมูล', icon: 'solar:clipboard-check-bold-duotone', description: 'ตรวจสอบและยืนยันการสมัคร' },
];

type EnrollmentLayoutProps = {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (key: string) => void;
  completedSections: string[];
};

export default function EnrollmentLayout({
  children,
  activeSection,
  onSectionChange,
  completedSections,
}: EnrollmentLayoutProps) {
  const theme = useMantineTheme();
  const { logout, authenticated } = useAuthContext();

  const activeIndex = ENROLLMENT_SECTIONS.findIndex((s) => s.key === activeSection);
  const progressPercent = Math.round((completedSections.length / ENROLLMENT_SECTIONS.length) * 100);

  return (
    <AppShell
      header={
        <Header height={72} sx={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}>
          <Container size="xl" h="100%">
            <Flex justify="space-between" align="center" h="100%">
              <RouterLink href={paths.admission.root}>
                <Group spacing="sm">
                  <Image width={36} src="/sskru.png" alt="sskru" />
                  <Box sx={{ display: 'none', [theme.fn.largerThan('sm')]: { display: 'block' } }}>
                    <Text size="md" fw={800} color="sskruGold.7">มหาวิทยาลัยราชภัฏศรีสะเกษ</Text>
                    <Text size="xs" color="dimmed">ระบบสมัครเรียน</Text>
                  </Box>
                </Group>
              </RouterLink>
              
              {/* Mobile Progress */}
              <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                <Box sx={{ flex: 1, mx: 'md' }}>
                  <Text size="xs" color="dimmed" align="center">
                    {activeIndex + 1}/{ENROLLMENT_SECTIONS.length} — {ENROLLMENT_SECTIONS[activeIndex]?.label}
                  </Text>
                  <Progress value={progressPercent} color="sskruGold" size="xs" radius="xl" mt={4} />
                </Box>
              </MediaQuery>

              {authenticated && (
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  leftIcon={<Iconify icon="solar:logout-3-bold-duotone" width={16} />}
                  onClick={() => logout()}
                >
                  ออกจากระบบ
                </Button>
              )}
            </Flex>
          </Container>
        </Header>
      }
      navbar={
        /* Desktop Sidebar - hidden on mobile */
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Navbar
            width={{ base: 260 }}
            p="md"
            sx={{
              backgroundColor: theme.colors.sskruWhite[0],
              borderRight: `1px solid ${theme.colors.gray[2]}`,
              zIndex: 10,
            }}
          >
            <Navbar.Section>
              <Text size="xs" fw={700} color="dimmed" sx={{ textTransform: 'uppercase', letterSpacing: 1 }} mb="sm">
                ขั้นตอนการสมัคร
              </Text>
            </Navbar.Section>

            <Navbar.Section grow component={ScrollArea}>
              <Stack spacing={4}>
                {ENROLLMENT_SECTIONS.map((section, index) => {
                  const isActive = section.key === activeSection;
                  const isCompleted = completedSections.includes(section.key);

                  return (
                    <NavLink
                      key={section.key}
                      label={
                        <Box>
                          <Text fw={isActive ? 800 : 600} size="sm" color={isActive ? theme.colors.sskruGold[9] : theme.colors.gray[7]}>
                            {section.label}
                          </Text>
                          <Text size="xs" color="dimmed">{section.description}</Text>
                        </Box>
                      }
                      icon={
                        <ThemeIcon
                          size={32}
                          radius="md"
                          color={isCompleted ? 'green' : isActive ? 'sskruGold' : 'gray'}
                          variant={isActive ? 'filled' : 'light'}
                        >
                          <Iconify icon={isCompleted ? 'solar:check-circle-bold-duotone' : section.icon} width={18} />
                        </ThemeIcon>
                      }
                      description={`ขั้นตอนที่ ${index + 1}`}
                      active={isActive}
                      onClick={() => onSectionChange(section.key)}
                      sx={{
                        borderRadius: theme.radius.md,
                        borderLeft: isActive ? `4px solid ${theme.colors.sskruGold[6]}` : '4px solid transparent',
                        backgroundColor: isActive ? theme.colors.sskruGold[0] : 'transparent',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: theme.colors.sskruGold[0],
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            </Navbar.Section>

            <Navbar.Section pt="md" sx={{ borderTop: `1px solid ${theme.colors.gray[2]}` }}>
              <Box>
                <Text size="xs" color="dimmed" mb={4}>ความคืบหน้า</Text>
                <Progress value={progressPercent} color="sskruGold" radius="xl" size="sm" />
                <Text size="xs" color="dimmed" mt={4}>{progressPercent}% สมบูรณ์</Text>
              </Box>
            </Navbar.Section>
          </Navbar>
        </MediaQuery>
      }
      bg="sskruWhite.0"
    >
      {/* Mobile Stepper - shown only on mobile */}
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Box px="md" py="sm" sx={{ backgroundColor: 'white', borderBottom: `1px solid ${theme.colors.gray[2]}` }}>
          <Stepper active={activeIndex} size="xs" color="sskruGold" breakpoint="sm">
            {ENROLLMENT_SECTIONS.map((section) => (
              <Stepper.Step key={section.key} label={section.label} />
            ))}
          </Stepper>
        </Box>
      </MediaQuery>

      <Container size="xl" py="xl">
        {children}
      </Container>
    </AppShell>
  );
}
