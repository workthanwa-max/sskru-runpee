import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, CheckboxGroupProps, CheckboxProps, Group, Stack } from '@mantine/core';

// ----------------------------------------------------------------------

type Props = CheckboxProps & {
  name: string;
};

export default function RHFCheckbox({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => <Checkbox {...other} {...field} error={error?.message} />}
    />
  );
}

type GroupProps = Omit<CheckboxGroupProps, 'children'> & {
  name: string;
  options: Omit<CheckboxProps, 'children'>[];
  vertical?: boolean;
};

export function RHFCheckboxGroup({ name, vertical, options, ...other }: GroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Checkbox.Group {...other} {...field} error={error?.message}>
          {vertical ? (
            <Stack>
              {options.map((node, i) => (
                <Checkbox key={i} {...node} />
              ))}
            </Stack>
          ) : (
            <Group mt="xs">
              {options.map((node, i) => (
                <Checkbox key={i} {...node} />
              ))}
            </Group>
          )}
        </Checkbox.Group>
      )}
    />
  );
}
