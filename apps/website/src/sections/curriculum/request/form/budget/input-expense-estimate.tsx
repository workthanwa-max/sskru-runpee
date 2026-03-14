import { ActionIcon, Center, Table, Text } from '@mantine/core';
import RHFNumberInput from '@src/components/hook-form/rhf-number';
import RHFSelect from '@src/components/hook-form/rhf-select';
import RHFTextInput from '@src/components/hook-form/rhf-text-field';
import Iconify from '@src/components/iconify';
import { categoryOptions, initialFormValues } from './constant';
import { useCurriculumReqBudget } from './hook';

export default function InputExpenseEstimate(props: ReturnType<typeof useCurriculumReqBudget>['expenseEstimateInput']) {
  return (
    <Table withColumnBorders withBorder captionSide="bottom">
      <thead style={{ backgroundColor: '#ebca7d' }}>
        <tr>
          {['หมวด', 'รายการ', 'งบประมาณ'].map((name) => (
            <th key={name}>
              <Text color={'#426F92'} fz={16} fw="bold">
                {name}
              </Text>
            </th>
          ))}
          <th style={{ width: 60 }}>
            <Center>
              <ActionIcon onClick={() => props.append(initialFormValues.expenseEstimates[0])}>
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
              <RHFSelect name={`expenseEstimates.${i}.category`} data={categoryOptions} />
            </td>
            <td>
              <RHFTextInput name={`expenseEstimates.${i}.name`} />
            </td>
            <td>
              <RHFNumberInput name={`expenseEstimates.${i}.cost`} />
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
