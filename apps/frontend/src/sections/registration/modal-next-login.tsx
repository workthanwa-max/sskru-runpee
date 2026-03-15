import { Box, Button, Card, Center, Group, Modal, ModalProps, Text } from '@mantine/core';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';

export default function ModalNextLogin({
  personnelId,
  password,
  ...props
}: ModalProps & { personnelId: string; password: string }) {
  const router = useRouter();
  const onClose = () => {
    props.onClose();
    router.push(paths.admission.enrollment.courseSelection);
  };
  return (
    <Modal {...props} centered title="เข้าสู่ระบบครั้งถัดไปด้วย">
      <Card p={0}>
        <Box sx={{ border: '2px solid #D19509' }} p={'sm'}>
          <Group>
            <Text>รหัสบัตรประชาชน: </Text>
            <Text>{personnelId}</Text>
          </Group>
          <Group>
            <Text>รหัสผ่าน: </Text>
            <Text>{password}</Text>
          </Group>
        </Box>
        <Center mt={'md'}>
          <Button onClick={onClose}>ปิด</Button>
        </Center>
      </Card>
    </Modal>
  );
}
