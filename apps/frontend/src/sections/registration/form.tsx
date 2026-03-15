import { Button, Grid } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import RHFPasswordInput from '@src/components/hook-form/rhf-text-password';
import { useState } from 'react';
import { useRegister } from './hook';
import ModalNextLogin from './modal-next-login';
import { RegisterForm as IRegisterForm } from './types';

export default function RegisterForm() {
  const [form, setform] = useState<IRegisterForm | null>(null);
  const { submitting: formLoading, methods, onSubmit } = useRegister(setform);

  return (
    <>
      <ModalNextLogin
        opened={!!form}
        onClose={function (): void {
          setform(null);
        }}
        personnelId={form?.personnelId ?? ''}
        password={form?.password ?? ''}
      />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid>
          <Grid.Col span={12} sm={6}>
            <RHFTextInput label={'ชื่อ'} name="firstname" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFTextInput label={'นามสกุล'} name="lastname" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFTextInput label={'รหัสบัตรประชาชน (13 หลัก)'} name="personnelId" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFTextInput label={'เบอร์โทรศัพท์'} name="phone" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFPasswordInput name="password" label="รหัสผ่าน" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFPasswordInput name="confirmPassword" label="ยืนยันรหัสผ่าน" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              type="submit"
              loading={formLoading}
              color="sskruGold"
              fullWidth
              size="md"
              radius="md"
              sx={{ boxShadow: '0 8px 20px rgba(197, 160, 40, 0.2)' }}
            >
              สร้างบัญชี
            </Button>
          </Grid.Col>
        </Grid>
      </FormProvider>
    </>
  );
}
