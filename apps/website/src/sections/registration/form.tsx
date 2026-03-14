import { Button, Grid, SelectItem } from '@mantine/core';
import FormProvider from '@src/components/hook-form';
import RHFSelect from '@src/components/hook-form/rhf-select';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import RHFPasswordInput from '@src/components/hook-form/rhf-text-password';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Faculty } from '@src/types/domain';
import { useState } from 'react';
import { useRegister } from './hook';
import ModalNextLogin from './modal-next-login';
import { RegisterForm as IRegisterForm } from './types';

export default function RegisterForm() {
  const [form, setform] = useState<IRegisterForm | null>(null);
  const { submitting: formLoading, methods, onSubmit } = useRegister(setform);
  const { data: faculties, loading: facultyLoading } = useRestQuery<Faculty[]>(endpoints.faculty.list);
  const options =
    faculties?.reduce((prev, faculty) => {
      if (faculty.parentId) {
        prev.push({
          value: faculty.id,
          label: faculty.name,
        });
      }
      return prev;
    }, [] as SelectItem[]) ?? [];

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
            <RHFTextInput label={'รหัสบัตรประชาชน'} name="personnelId" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFSelect
              searchable
              disabled={facultyLoading}
              name="facultyId"
              limit={30}
              label="เลือกสาขา"
              data={options}
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFPasswordInput name="password" label="รหัสผ่าน" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFTextInput label={'เบอร์โทรศัพท์'} name="phone" />
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <RHFPasswordInput name="confirmPassword" label="ยืนยันรหัสผ่าน" />
          </Grid.Col>
          <Grid.Col>
            <Button type="submit" loading={formLoading}>
              ลงทะเบียนผู้สมัคร
            </Button>
          </Grid.Col>
        </Grid>
      </FormProvider>
    </>
  );
}
