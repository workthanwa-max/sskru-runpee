import { Controller, useFormContext } from 'react-hook-form';

import { MultiSelect, MultiSelectProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = MultiSelectProps & {
  name: string;
};

export default function RHFMultiSelect({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <MultiSelect {...other} {...field} error={error?.message} />}
    />
  );
}
