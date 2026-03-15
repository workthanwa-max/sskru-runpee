import { ActionIcon, Center, Table, Text } from '@mantine/core';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import Iconify from '@src/components/iconify';
import { useCurriculumReqBudget } from './hook';

export default function InputApplicantQualificationConditions(
  props: ReturnType<typeof useCurriculumReqBudget>['applicantQualificationInput'],
) {
  return (
    <Table withColumnBorders withBorder captionSide="bottom">
      <thead style={{ backgroundColor: '#ebca7d' }}>
        <tr>
          {['คุณสมบัติ'].map((name) => (
            <th key={name}>
              <Text color={'#426F92'} fz={16} fw="bold">
                {name}
              </Text>
            </th>
          ))}
          <th style={{ width: 60 }}>
            <Center>
              <ActionIcon
                onClick={() =>
                  props.append({
                    condition: '',
                  })
                }
              >
                <Iconify icon={'basil:add-outline'} />
              </ActionIcon>
            </Center>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.fields?.map((row, i) => (
          <tr key={row.id}>
            <td>
              <RHFTextInput name={`applicantQualifications.${i}.condition`} />
            </td>

            <td style={{ textAlign: 'center' }}>
              <Center>
                <ActionIcon onClick={() => props.remove(i)} disabled={props.fields.length < 2}>
                  <Iconify icon={'mynaui:trash-solid'} />
                </ActionIcon>
              </Center>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
