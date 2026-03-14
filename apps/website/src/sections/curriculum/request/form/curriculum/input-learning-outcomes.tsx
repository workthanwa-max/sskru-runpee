import { ActionIcon, Center, Table, Text } from '@mantine/core';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import Iconify from '@src/components/iconify';
import { initialFormValues } from './constant';
import { useCurriculumReqCurriculum } from './hook';

export default function InputLearningOutcomes(
  props: ReturnType<typeof useCurriculumReqCurriculum>['learningOutcomeInput'],
) {
  return (
    <Table withColumnBorders withBorder captionSide="bottom">
      <thead style={{ backgroundColor: '#ebca7d' }}>
        <tr>
          {['ผลลัพธ์การเรียนรู้', 'กลยุทธ์การสอน', 'กลยุทธ์การประเมินผล'].map((name) => (
            <th key={name}>
              <Text color={'#426F92'} fz={16} fw="bold">
                {name}
              </Text>
            </th>
          ))}
          <th style={{ width: 60 }}>
            <Center>
              <ActionIcon onClick={() => props.append(initialFormValues.learningOutcomes[0])}>
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
              <RHFTextInput name={`learningOutcomes.${i}.learningOutcome`} />
            </td>
            <td>
              <RHFTextInput name={`learningOutcomes.${i}.teachingStrategy`} />
            </td>
            <td>
              <RHFTextInput name={`learningOutcomes.${i}.assessmentStrategy`} />
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
