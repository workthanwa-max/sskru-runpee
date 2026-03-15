import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Faculty } from '@src/types/domain';
import { FacultyFormSchema } from './form-schema';
import { FacultyForm } from './types';

export function useFaculty(faculty?: Faculty | null, onCompleted?: VoidFunction) {
  const [createFaculty, { loading: creating }] = useRestMutation(endpoints.faculty.list, 'POST');
  const [updateFaculty, { loading: updating }] = useRestMutation(
    faculty?.id ? endpoints.faculty.details(faculty.id) : '',
    'PUT'
  );

  const defaultValues = useMemo(
    (): FacultyForm => ({
      name: faculty?.name ?? '',
      description: faculty?.description ?? '',
      parentId: faculty?.parentId ?? undefined,
      shortName: faculty?.shortName ?? '',
    }),
    [faculty?.description, faculty?.name, faculty?.parentId, faculty?.shortName]
  );

  const methods = useForm<FacultyForm>({
    resolver: zodResolver(FacultyFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (faculty?.id) {
        await updateFaculty(data);
      } else {
        await createFaculty(data);
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
    responseError: null, // Basic error handling for now
    reset,
  };
}
