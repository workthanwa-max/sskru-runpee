import { Controller, useFormContext } from 'react-hook-form';

import { Textarea, TextareaProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = TextareaProps & {
  name: string;
};

export default function RHFTextarea({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Textarea {...other} {...field} error={error?.message} styles={{ root: { flex: 1 } }} />
      )}
    />
  );
}
