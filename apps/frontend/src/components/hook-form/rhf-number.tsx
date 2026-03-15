import { Controller, useFormContext } from 'react-hook-form';

import { NumberInput, NumberInputProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = NumberInputProps & {
  name: string;
};

export default function RHFNumberInput({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <NumberInput {...other} {...field} styles={{ root: { flex: 1 } }} error={error?.message} />
      )}
    />
  );
}
