import { Flex, Group, Text } from '@mantine/core';
import { RouterLink } from '@src/routes/components';
import { extractFileNameFromGCSUrl } from '@src/utils/file';
import { fToNow } from '@src/utils/format-time';
import { ActivityImplementation } from '@src/types/domain';

export default function RequestedTimelineItem({ item }: { item: ActivityImplementation }) {
  return (
    <>
      <Flex align={'center'} justify={'space-between'} gap={'xs'}>
        <Text size="sm" fw={'bold'}>
          {item.approve ? 'อนุมัติ' : 'ไม่อนุมัติ'}
        </Text>
        <Text size="xs">{fToNow(item.createdAt)}</Text>
      </Flex>
      {!!item.note && <Text size="sm">หมายเหตุ: {item.note}</Text>}
      {!!item.attachFiles?.length && (
        <Group spacing={'xs'}>
          <Text size="sm">เอกสารเพิ่มเติม: </Text>
          {item.attachFiles.map((af) => (
            <Text size="xs" key={af} component={RouterLink} href={af} target="_blank" underline color="blue">
              {extractFileNameFromGCSUrl(af)?.slice(-15)}
            </Text>
          ))}
        </Group>
      )}
    </>
  );
}
