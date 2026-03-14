import { Controller, useFormContext } from 'react-hook-form';

import { RadioProps } from '@mantine/core';

import { Radio } from '@mantine/core';
// ----------------------------------------------------------------------

type Props = Omit<RadioProps, 'children'> & {
  name: string;
};

export default function RHFRedio({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Radio {...field} {...other} styles={{ root: { flex: 1 } }} error={error?.message} />
      )}
    />
  );
}
