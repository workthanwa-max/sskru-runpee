import { Controller, useFormContext } from 'react-hook-form';

import { TextInput, TextInputProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
};

export default function RHFTextInput({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextInput {...other} {...field} error={error?.message} styles={{ root: { flex: 1 } }} />
      )}
    />
  );
}
