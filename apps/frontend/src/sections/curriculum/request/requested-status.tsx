import { Badge, Group, Modal, Timeline } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Activity } from '@src/types/domain';
import { activityStatusMaps, courseImplementationSteps } from '../const';
import RequestedTimelineItem from './requested-timeline-item';

type Props = {
  item: Activity;
};
export default function RequestedStatus({ item }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const courseImplementations = item.implementations;
  const onBadgeClick = async () => {
    open();
  };

  return (
    <>
      <Group>
        <Badge
          sx={{ cursor: 'pointer' }}
          onClick={onBadgeClick}
          variant="filled"
          color={activityStatusMaps.get(item.status)?.color}
        >
          {activityStatusMaps.get(item.status)?.label}
        </Badge>
      </Group>
      {item.step && !!courseImplementations?.length && (
        <Modal opened={opened} onClose={close} title={'การดำเนินการหลักสูตร'}>
          <Timeline
            active={courseImplementationSteps.get(item.step as 'ACADEMIC_COMMITTEE')?.order}
            bulletSize={24}
            lineWidth={2}
          >
            {courseImplementations?.map((item) => (
              <Timeline.Item
                lineVariant="dashed"
                title={courseImplementationSteps.get(item.step as 'ACADEMIC_COMMITTEE')?.label}
                key={item.id}
              >
                <RequestedTimelineItem item={item} />
              </Timeline.Item>
            ))}
          </Timeline>
        </Modal>
      )}
    </>
  );
}
