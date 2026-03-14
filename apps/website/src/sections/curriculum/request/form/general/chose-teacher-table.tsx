import { ActionIcon, NumberInput, ScrollArea, Table, TextInput } from '@mantine/core';
import { CHOSE_TEACHER_HEADER } from './constant';

type ChooseTeacherTableProps = {
  committeeGeneralInfomations: unknown[];
};
export default function ChooseTeacherTable({ committeeGeneralInfomations }: ChooseTeacherTableProps) {
  return (
    <ScrollArea style={{ borderRadius: '10px 10px 0 0' }} sx={{ height: 250 }}>
      <Table captionSide="bottom" withBorder withColumnBorders verticalSpacing="sm">
        <thead style={{ backgroundColor: '#ebca7d' }}>
          <tr>
            {CHOSE_TEACHER_HEADER.map(({ name }) => (
              <th key={name}>{name} </th>
            ))}
            <th
              style={{ textAlign: 'center' }}
              onClick={() => {
                //
              }}
            >
              {/* <IconCirclePlus size={25} color="#426F92" cursor="pointer" /> */}
            </th>
          </tr>
        </thead>
        <tbody>
          {[].map((row, i) => (
            <tr key={i}>
              <td>
                <TextInput required />
              </td>
              <td>
                <TextInput required />
              </td>
              <td>
                <TextInput required />
              </td>
              <td>
                <TextInput required />
              </td>
              <td>
                <TextInput required />
              </td>
              <td>
                <TextInput required />
              </td>
              <td>
                <NumberInput required />
              </td>

              <td style={{ textAlign: 'center' }}>
                <ActionIcon>
                  {/* <IconTrash
                    cursor="pointer"
                    stroke={1.2}
                    size={25}
                    color="#EF4444"
                    onClick={() => {
                      //
                    }}
                  /> */}
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
        {![].length && <caption>No data avaliable in table</caption>}
      </Table>
    </ScrollArea>
  );
}
