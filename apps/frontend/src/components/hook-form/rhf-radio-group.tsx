import { Controller, useFormContext } from 'react-hook-form';

import { Group, RadioGroupProps, RadioProps, Stack } from '@mantine/core';

import { Radio } from '@mantine/core';
// ----------------------------------------------------------------------

type Props = Omit<RadioGroupProps, 'children'> & {
  name: string;
  options: RadioProps[];
  vertical?: boolean;
};

export default function RHFRedioGroup({ name, options, vertical, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Radio.Group {...field} {...other} styles={{ root: { flex: 1 } }}>
          {vertical ? (
            <Stack>
              {options.map((option, i) => (
                <Radio styles={{ labelWrapper: { width: 'max-content' } }} key={i} {...option} error={error?.message} />
              ))}
            </Stack>
          ) : (
            <Group>
              {options.map((option, i) => (
                <Radio styles={{ labelWrapper: { width: 'max-content' } }} key={i} {...option} error={error?.message} />
              ))}
            </Group>
          )}
        </Radio.Group>
      )}
    />
  );
}
