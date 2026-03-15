import { Grid, SelectItem, Text } from '@mantine/core';
import RHFSelect from '@src/components/hook-form/rhf-select';
import { fThaiYear } from '@src/utils/format-time';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Faculty } from '@src/types/domain';
import { programTypeInfo } from '../../constant';

export interface SubjectInputProps {
  readOnly?: boolean;
  unstyled?: boolean;
}
export default function SubjectInput({ readOnly, unstyled }: SubjectInputProps) {
  const { data: faculties, loading: facultyLoading } = useRestQuery<Faculty[]>(endpoints.faculty.list);
  const options =
    faculties?.reduce((prev, faculty) => {
      if (faculty.parentId) {
        prev.push({
          value: faculty.id,
          label: faculty.name,
        });
      }
      return prev;
    }, [] as SelectItem[]) ?? [];
  return (
    <Grid>
      <Grid.Col span={12}>
        <Text weight={500} size="lg">
          ข้อมูลการสมัคร
        </Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ประเภทการสมัคร</Text>
        <Text size="sm">ระดับปริญญาตรี ประจำปีการศึกษา {fThaiYear(new Date())}</Text>
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>ประเภทที่สมัคร</Text>
        <RHFSelect
          readOnly
          unstyled
          name="programType"
          data={[...programTypeInfo.values()].map((info) => ({
            label: info.label,
            value: info.program,
          }))}
        />
      </Grid.Col>

      <Grid.Col span={12} md={6}>
        <Text>สาขาวิชาที่สมัคร</Text>
        <RHFSelect
          unstyled={unstyled}
          searchable
          readOnly={readOnly}
          disabled={facultyLoading}
          name="facultyId"
          limit={30}
          label="เลือกสาขา"
          data={options}
        />
      </Grid.Col>
    </Grid>
  );
}
