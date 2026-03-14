import { Controller, useFormContext } from 'react-hook-form';

import { Select, SelectProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = SelectProps & {
  name: string;
};

export default function RHFSelect({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <Select {...other} {...field} error={error?.message} />}
    />
  );
}
