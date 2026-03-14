import { Grid, Text } from '@mantine/core';
import RHFDateInput from '@src/components/hook-form/rhf-date';
import RHFRedioGroup from '@src/components/hook-form/rhf-radio-group';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';

export interface PersonnelInputProps {
  readOnly?: boolean;
  unstyled?: boolean;
  prefixInputObjectName?: string;
}
export default function PersonnelInput({ readOnly, prefixInputObjectName, unstyled }: PersonnelInputProps) {
  const getName = (field: string) => `${prefixInputObjectName ? `${prefixInputObjectName}.` : ''}${field}`;
  return (
    <Grid>
      <Grid.Col span={12}>
        <Text weight={500} size="lg">
          ข้อมูลส่วนบุคคล
        </Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>รหัสบัตรประชาชน/รหัสหนังสือเดินทาง</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('personnelId')} />
      </Grid.Col>

      <Grid.Col span={6} md={3}>
        <Text>คำนำหน้า</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('prefix')} />
      </Grid.Col>

      <Grid.Col span={6} md={3}>
        <Text>เพศ</Text>
        <RHFRedioGroup
          name={getName('gender')}
          options={[
            { label: 'ชาย', value: 'male' },
            { label: 'หญิง', value: 'female' },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ชื่อ</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('firstname')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>นามสกุล</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('lastname')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ชื่อ (ภาษาอังกฤษ)</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('firstnameEN')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>นามสกุล (ภาษาอังกฤษ)</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('lastnameEN')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>วันเดือนปีเกิด</Text>
        <RHFDateInput readOnly={readOnly} unstyled={unstyled} name={getName('birth')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>สัญชาติ</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('nationality')} />
      </Grid.Col>
      <Grid.Col span={12} mt="lg">
        <Text weight={500} size="lg">
          ข้อมูลการติดต่อ
        </Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>เบอร์โทรศัพท์</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('phone')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>อีเมลที่สามารถติดต่อได้</Text>
        <RHFTextInput readOnly={readOnly} unstyled={unstyled} name={getName('email')} />
      </Grid.Col>
    </Grid>
  );
}
