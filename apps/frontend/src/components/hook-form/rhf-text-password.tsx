import { Controller, useFormContext } from 'react-hook-form';

import { PasswordInput, PasswordInputProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = PasswordInputProps & {
  name: string;
};

export default function RHFPasswordInput({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <PasswordInput {...other} {...field} error={error?.message} />}
    />
  );
}
