import { Grid, Text } from '@mantine/core';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';

type AddressInputProps = {
  prefixInputObjectName?: string;
  readOnly?: boolean;
};
export default function AddressInput({ prefixInputObjectName, readOnly }: AddressInputProps) {
  const getName = (field: string) => `${prefixInputObjectName ? `${prefixInputObjectName}.` : ''}${field}`;

  return (
    <Grid>
      <Grid.Col span={12} mt="lg">
        <Text weight={500} size="lg">
          ข้อมูลที่อยู่ตามทะเบียนบ้าน
        </Text>
      </Grid.Col>

      {[
        { field: 'houseNumber', label: 'บ้านเลขที่' },
        { field: 'moo', label: 'หมู่ที่' },
        { field: 'street', label: 'ถนน' },
        { field: 'subDistrict', label: 'ตำบล/แขวง' },
        { field: 'district', label: 'อำเภอ/เขต' },
        { field: 'province', label: 'จังหวัด' },
        { field: 'postalCode', label: 'รหัสไปรษณีย์' },
      ].map(({ field, label }) => (
        <Grid.Col span={12} md={6} key={field}>
          <Text>{label}</Text>
          <RHFTextInput readOnly={readOnly} name={getName(field)} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
