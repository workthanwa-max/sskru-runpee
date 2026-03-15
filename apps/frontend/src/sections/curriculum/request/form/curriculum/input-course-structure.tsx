import { ActionIcon, Center, Table, Text } from '@mantine/core';
import { RHFCheckboxGroup } from '@src/components/hook-form/rhf-checkbox';
import RHFNumberInput from '@src/components/hook-form/rhf-number';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import Iconify from '@src/components/iconify';
import React from 'react';
import { initialFormValues } from './constant';
import { useCurriculumReqCurriculum } from './hook';

export default function InputCourseStructures(
  props: ReturnType<typeof useCurriculumReqCurriculum>['couseStructureInput'],
) {
  return (
    <Table withColumnBorders withBorder captionSide="bottom">
      <thead style={{ backgroundColor: '#ebca7d' }}>
        <tr>
          {['หัวข้อหรือเนื้อหา', 'สมรรถนะ/ผลการเรียนรู้', 'จำนวนชั่วโมงการเรียนรู้', 'รูปแบบ'].map((name, index) => (
            <React.Fragment key={index}>
              {index === 2 ? (
                <th colSpan={2} style={{ textAlign: 'center' }}>
                  <Text color={'#426F92'} fz={16} fw="bold">
                    {name}
                  </Text>
                </th>
              ) : (
                <th rowSpan={2} style={{ textAlign: 'center', width: '20%' }}>
                  <Text color={'#426F92'} fz={16} fw="bold">
                    {name}
                  </Text>
                </th>
              )}
            </React.Fragment>
          ))}
          <td style={{ textAlign: 'center' }} rowSpan={2}>
            <Center>
              <ActionIcon onClick={() => props.append(initialFormValues.courseStructures[0])}>
                <Iconify icon={'basil:add-outline'} />
              </ActionIcon>
            </Center>
          </td>
        </tr>

        <tr>
          <th scope="col" style={{ textAlign: 'center' }}>
            <Text color={'#426F92'} fz={16} fw="bold">
              ทฤษฎี
            </Text>
          </th>
          <th scope="col" style={{ textAlign: 'center' }}>
            <Text color={'#426F92'} fz={16} fw="bold">
              ปฏิบัติ
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.fields?.map((row, i) => (
          <tr key={row.id}>
            <td>
              <RHFTextInput name={`courseStructures.${i}.topicOrContent`} />
            </td>
            <td>
              <RHFTextInput name={`courseStructures.${i}.competenciesOrLearningOutcomes`} />
            </td>
            <td>
              <RHFNumberInput name={`courseStructures.${i}.learningHours.practice`} />
            </td>
            <td>
              <RHFNumberInput name={`courseStructures.${i}.learningHours.theory`} />
            </td>
            <td>
              <RHFCheckboxGroup
                name={`courseStructures.${i}.formats`}
                options={[
                  { value: 'Online Course', label: 'Online Course' },
                  { value: 'Online WorkShop', label: 'Online WorkShop' },
                  { value: 'Onsite Workshop', label: 'Onsite Workshop' },
                ]}
              />
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
