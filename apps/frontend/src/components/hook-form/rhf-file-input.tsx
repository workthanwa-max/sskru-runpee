import { Controller, useFormContext } from 'react-hook-form';

import { FileInput, FileInputProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = FileInputProps & {
  name: string;
};

export default function RHFFileInput({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FileInput {...other} {...field} error={error?.message} styles={{ root: { flex: 1 } }} />
      )}
    />
  );
}
