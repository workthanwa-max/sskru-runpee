import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Personnel } from '@src/types/domain';
import { PersonnelFormSchema } from './form-schema';
import { PersonnelForm } from './types';

export function usePersonnel(personnel?: Personnel | null, onCompleted?: VoidFunction) {
  const [createPersonnel, { loading: creating }] = useRestMutation(endpoints.personnel.list, 'POST');
  const [updatePersonnel, { loading: updating }] = useRestMutation(
    personnel?.id ? endpoints.personnel.details(personnel.id) : '',
    'PUT'
  );

  const defaultValues = useMemo(
    (): PersonnelForm => ({
      personnelId: personnel?.personnelId ?? '',
      phone: personnel?.phone ?? '',
      firstname: personnel?.firstname ?? '',
      lastname: personnel?.lastname ?? '',
      academicPosition: personnel?.academicPosition ?? '',
      highestEducation: personnel?.highestEducation ?? '',
      programOrField: personnel?.programOrField ?? '',
      university: personnel?.university ?? '',
      graduationYear: personnel?.graduationYear ?? 1990,
      facultyId: personnel?.facultyIds?.[0] ?? undefined,
    }),
    [
      personnel?.academicPosition,
      personnel?.facultyIds,
      personnel?.firstname,
      personnel?.graduationYear,
      personnel?.highestEducation,
      personnel?.lastname,
      personnel?.personnelId,
      personnel?.phone,
      personnel?.programOrField,
      personnel?.university,
    ]
  );

  const methods = useForm<PersonnelForm>({
    resolver: zodResolver(PersonnelFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const { facultyId, ...payload } = data;
    try {
      const input = { ...payload, ...(facultyId && { facultyIds: [facultyId] }) };
      if (personnel?.id) {
        await updatePersonnel(input);
      } else {
        await createPersonnel(input);
      }
      onCompleted?.();
      reset();
    } catch (error) {
      console.error('Submit error:', error);
    }
  });

  return {
    onSubmit,
    methods,
    submitting: isSubmitting || creating || updating,
    responseError: null,
    reset,
  };
}
