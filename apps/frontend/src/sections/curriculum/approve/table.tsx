import { Button, Group, Stack, Text } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { GenericTable } from '@src/components/table/generic-table';
import { RouterLink } from '@src/routes/components';
import { extractFileNameFromGCSUrl } from '@src/utils/file';
import { Activity } from '@src/types/domain';
import { useState } from 'react';
import RequestedStatus from '../request/requested-status';
import RequestedByFacualty from '../requested-by-facualty';
import { CurriculumActivityStatus } from '../const';

interface CurriculumApproveTableProps {
  data: Activity[];
  onProcess: (approve: '0' | '1', node: Activity) => void;
}

export default function CurriculumApproveTable({ data, onProcess }: CurriculumApproveTableProps) {
  const [activePage, setPage] = useState(1);
  const takePage = 10;
  return (
    <GenericTable
      data={data.slice((activePage - 1) * takePage, activePage * takePage)}
      columns={[
        { key: 'general', label: 'รหัสอ้างอิง', render: (value, row) => row.general?.ref },
        {
          key: 'general',
          label: 'คณะ/สาขา',
          render: (value, row) => <RequestedByFacualty requestedBy={row.requestedBy} />,
        },
        {
          key: 'general',
          label: 'ชื่อหลักสูตร',
          render: (value, row) => row.general?.nameTH,
        },
        {
          key: 'general',
          label: 'ข้อมูลเพิ่มเติม',
          render: (value, row) =>
            row.general?.type === 'DEGREE' ? (
              <Stack spacing={'xs'}>
                <TableRowDegreeDocLink item={row} />
              </Stack>
            ) : (
              <TableRowNoneDegreeDocLink item={row} />
            ),
        },
      ]}
      actions={(row) =>
        ![CurriculumActivityStatus.Approved, CurriculumActivityStatus.Rejected].includes(row.status as any) ? (
          <Group spacing={'xs'}>
            <Button
              color="green"
              size="xs"
              w={110}
              leftIcon={<Iconify icon="material-symbols:order-approve" />}
              onClick={() => onProcess('1', row)}
            >
              เห็นชอบ
            </Button>
            <Button
              color="gray"
              variant="outline"
              size="xs"
              w={110}
              leftIcon={<Iconify icon="fluent:text-change-reject-24-regular" />}
              onClick={() => onProcess('0', row)}
            >
              ไม่เห็นชอบ
            </Button>
          </Group>
        ) : (
          <RequestedStatus item={row} />
        )
      }
      pagination={{
        activePage,
        total: Math.ceil(data.length / takePage),
        onPageChange: setPage,
      }}
    />
  );
}

function TableRowNoneDegreeDocLink({ item }: { item: Activity }) {
  return (
    <Text component={RouterLink} href={item.budget?.attachFile as string} target="_blank" color="indigo">
      <Iconify icon={'qlementine-icons:print-preview-16'} />
    </Text>
  );
}

function TableRowDegreeDocLink({ item }: { item: Activity }) {
  return (
    <>
      {item.general?.attributes?.map((link, i) => (
        <Group key={i}>
          <Text>
            {i + 1}. {extractFileNameFromGCSUrl(link)}
          </Text>
          <Text component={RouterLink} href={link} target="_blank" color="indigo">
            <Iconify icon={'qlementine-icons:print-preview-16'} />
          </Text>
        </Group>
      ))}
    </>
  );
}
