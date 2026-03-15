import { Controller, useFormContext } from 'react-hook-form';

import { DateInput, DateInputProps } from '@mantine/dates';

// ----------------------------------------------------------------------

type Props = DateInputProps & {
  name: string;
};

export default function RHFDateInput({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateInput
          {...other}
          {...field}
          value={typeof field.value === 'string' ? new Date(field.value) : field.value}
          error={error?.message}
          styles={{ root: { flex: 1 } }}
        />
      )}
    />
  );
}
