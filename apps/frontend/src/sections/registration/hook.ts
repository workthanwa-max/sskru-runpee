import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@src/utils/axios';
import { RegisterFormSchema } from './form-schema';
import { RegisterForm } from './types';

export function useRegister(onCompleted?: (form: RegisterForm) => void) {
  const defaultValues = useMemo(
    (): RegisterForm => ({
      firstname: '',
      lastname: '',
      personnelId: '',
      password: '',
      phone: '',
      confirmPassword: '',
    }),
    [],
  );

  const methods = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axiosInstance.post('/auth/register', {
        personnelId: data.personnelId,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        password: data.password,
      });
      notifications.show({
        title: 'สร้างบัญชีสำเร็จ',
        message: 'เข้าสู่ระบบด้วยเลขบัตรประชาชนและรหัสผ่านได้เลย',
        color: 'green',
        autoClose: 4000,
      });
      onCompleted?.(data);
      reset();
    } catch (err: any) {
      const message = err?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
      notifications.show({
        title: 'ลงทะเบียนไม่สำเร็จ',
        message,
        color: 'red',
        autoClose: 5000,
      });
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting,
    responseError: undefined,
    reset,
  };
}
