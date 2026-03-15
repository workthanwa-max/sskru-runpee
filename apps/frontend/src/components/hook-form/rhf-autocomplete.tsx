import { Controller, useFormContext } from 'react-hook-form';

import { Autocomplete, AutocompleteProps } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = AutocompleteProps & {
  name: string;
};

export default function RHFAutocomplete({ name, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <Autocomplete {...other} {...field} error={error?.message} />}
    />
  );
}
