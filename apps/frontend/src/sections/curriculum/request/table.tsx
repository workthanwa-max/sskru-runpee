import { ActionIcon, Badge, Group, rem } from '@mantine/core';
import Iconify from '@src/components/iconify';
import { GenericTable } from '@src/components/table/generic-table';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { extractFileNameFromGCSUrl } from '@src/utils/file';
import { Activity } from '@src/types/domain';
import { useState } from 'react';
import { curriculumSectionMaps, CurriculumActivityStatus } from '../const';
import RequestedByFacualty from '../requested-by-facualty';
import RequestedAction from './requested-action';
import RequestedStatus from './requested-status';

interface CurriculumReqTableProps {
  data: Activity[];
}

export default function CurriculumReqTable({ data }: CurriculumReqTableProps) {
  const router = useRouter();
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
          // render: (value, row) => <RequestedByFacualty requestedBy={row.requestedBy} />,
          render: (value, row) => 'N/A', // Placeholder for now or fix RequestedByFacualty
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
              <Group>
                {row.general.attributes?.map((item) => (
                  <StatusBadge
                    key={item}
                    label={extractFileNameFromGCSUrl(item) ?? undefined}
                    disabled={![CurriculumActivityStatus.Draft, CurriculumActivityStatus.Rejected].includes(row.status)}
                    hasData={!!row.general}
                    onClick={() => router.push(paths.curriculum.request.sections(row.id).generalDegree)}
                  />
                ))}
              </Group>
            ) : (
              <Group>
                {[...curriculumSectionMaps.keys()].map((item) => (
                  <StatusBadge
                    key={item}
                    label={curriculumSectionMaps.get(item)?.label}
                    disabled={![CurriculumActivityStatus.Draft, CurriculumActivityStatus.Rejected].includes(row.status as any)}
                    hasData={!!row.general}
                    onClick={() => router.push(paths.curriculum.request.sections(row.id)[item]())}
                  />
                ))}
              </Group>
            ),
        },
        {
          key: 'status',
          label: 'สถานะ',
          render: (value, row) => <RequestedStatus item={row} />,
        },
        {
          key: 'status',
          label: '',
          render: (value, row) => <RequestedAction item={row} />,
        },
      ]}
      pagination={{
        activePage,
        total: Math.ceil(data.length / takePage),
        onPageChange: setPage,
      }}
    />
  );
}

function StatusBadge({
  hasData,
  onClick,
  disabled,
  label,
}: {
  hasData: boolean;
  onClick: VoidFunction;
  disabled?: boolean;
  label?: string;
}) {
  const editIcon = (
    <ActionIcon size="xs" color="blue" radius="xl" variant="transparent" onClick={onClick}>
      <Iconify width={rem(10)} icon={'tabler:edit'} />
    </ActionIcon>
  );

  return (
    <Badge
      rightSection={disabled ? undefined : editIcon}
      color={hasData ? 'blue' : undefined}
      variant={hasData && !disabled ? 'outline' : undefined}
      radius={'sm'}
    >
      {hasData ? label ?? 'มีข้อมูล' : 'รอดำเนินการ'}
    </Badge>
  );
}
