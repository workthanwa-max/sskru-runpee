import { Grid, Text } from '@mantine/core';
import RHFFileInput from '@src/components/hook-form/rhf-file-input';
import RHFFileUploaded from '@src/components/hook-form/rhf-file-uploaded';
import RHFSelect from '@src/components/hook-form/rhf-select';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';

type DocumentationInputProps = {
  prefixInputObjectName?: string;
  readOnly?: boolean;
};
export default function DocumentationInput({ prefixInputObjectName, readOnly }: DocumentationInputProps) {
  const getName = (field: string) => `${prefixInputObjectName ? `${prefixInputObjectName}.` : ''}${field}`;

  return (
    <Grid>
      <Grid.Col span={12} mt="lg">
        <Text weight={500} size="lg">
          ข้อมูลวุฒิการศึกษา
        </Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>วุฒิที่ใช้สมัคร</Text>
        <RHFSelect
          name={getName('qualification')}
          data={[
            { label: 'มัธยมศึกษาตอนปลาย (ม.6)', value: 'highschool' },
            { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', value: 'vocational' },
            { label: 'ประกาศนียบัตรวิชาชีพชั้นสูง (ปวส.)', value: 'high_vocational' },
            { label: 'อื่นๆ', value: 'other' },
          ]}
        />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>จังหวัด</Text>
        <RHFTextInput name={getName('province')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>จากสถานศึกษา</Text>
        <RHFTextInput name={getName('schoolName')} />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>เกรดเฉลี่ยสะสม (GPAX)</Text>
        <RHFTextInput name={getName('gpax')} type="number" step="0.01" />
      </Grid.Col>
      <Grid.Col span={12} mt="lg">
        <Text weight={500} size="lg">
          เอกสารรายงานผลการศึกษา
        </Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ใบรายงานผลการศึกษา (ปพ.1) ด้านหน้า</Text>
        <RHFFileUploaded
          name={getName('academicTranscriptFront')}
          label="อัปโหลดไฟล์"
          accept="image/*,application/pdf"
        />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ใบรายงานผลการศึกษา (ปพ.1) ด้านหลัง</Text>
        <RHFFileInput name={getName('academicTranscriptBack')} label="อัปโหลดไฟล์" accept="image/*,application/pdf" />
      </Grid.Col>
    </Grid>
  );
}
