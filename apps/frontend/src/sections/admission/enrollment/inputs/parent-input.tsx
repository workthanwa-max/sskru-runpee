'use client';

import { Grid, Group, Text } from '@mantine/core';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { initialFormValues } from '../constant';

type ParentInputProps = {
  prefixInputObjectName?: string;
  readOnly?: boolean;
  guardianType: 'father' | 'mother' | 'guardian';
};
export default function ParentInput({ prefixInputObjectName, readOnly, guardianType }: ParentInputProps) {
  const { setValue, getValues, watch } = useFormContext();
  const getName = useCallback(
    (field: string) => `${prefixInputObjectName ? `${prefixInputObjectName}.` : ''}${guardianType}.${field}`,
    [guardianType, prefixInputObjectName],
  );

  const guardians = {
    father: 'บิดา',
    mother: 'มารดา',
    guardian: 'ผู้ปกครอง',
  };

  const guardian = watch('parentInfo.guardian.guardian');

  useEffect(() => {
    if (guardianType === 'guardian') {
      const values = getValues();
      const selectedGuardianInfo =
        guardian === 'guardian'
          ? initialFormValues.parentInfo.guardian
          : values.parentInfo[guardian] ?? initialFormValues.parentInfo.guardian;

      Object.keys(selectedGuardianInfo).forEach((key) => setValue(getName(key), selectedGuardianInfo[key]));
    }
  }, [guardian, guardianType, getValues, setValue, getName]);

  return (
    <Grid>
      <Grid.Col span={12} mt="lg">
        <Group>
          <Text weight={500} size="lg">
            ข้อมูล{guardians[guardianType]}
          </Text>
          {guardianType === 'guardian' && (
            <RHFRedioGroup
              name={getName('guardian')}
              options={[
                {
                  label: 'บิดา',
                  value: 'father',
                },
                {
                  label: 'มารดา',
                  value: 'mother',
                },
                {
                  label: 'อื่น ๆ',
                  value: 'guardian',
                },
              ]}
            />
          )}
        </Group>
      </Grid.Col>

      {[
        { field: 'firstname', label: 'ชื่อ' },
        { field: 'lastname', label: 'นามสกุล' },
        { field: 'personnelId', label: 'รหัสบัตรประชาชน' },
        { field: 'occupation', label: 'อาชีพ' },
        { field: 'phone', label: 'เบอร์โทรศัพท์' },
      ].map(({ field, label }) => (
        <Grid.Col span={12} md={6} key={field}>
          <Text>{label}</Text>
          <RHFTextInput readOnly={readOnly} name={getName(field)} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
