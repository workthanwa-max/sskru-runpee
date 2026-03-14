import { Button } from '@mantine/core';
import { useMemo } from 'react';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import { CurriculumActivityStatus } from '../const';

type Props = {
  item: Activity;
};

export default function RequestedAction({ item }: Props) {
  const noneDegreeCanSubmit =
    !!item.general && !!item.content && !!item.budget && item.status === CurriculumActivityStatus.Draft;
  const degreeCanSubmit =
    !!item.general?.attributes?.length &&
    item.general?.type === 'DEGREE' &&
    item.status === CurriculumActivityStatus.Draft;

  const canSubmit = useMemo(() => noneDegreeCanSubmit || degreeCanSubmit, [degreeCanSubmit, noneDegreeCanSubmit]);

  const [callSubmit] = useRestMutation(endpoints.curriculum.submit(item.id), 'POST');

  const onBadgeClick = async () => {
    if (canSubmit) {
      if (confirm('คุณต้องการยื่นคำร้องหรือไม่')) {
        await callSubmit();
      }
      return;
    }
  };

  if (item.status === CurriculumActivityStatus.Draft) {
    return (
      <Button size="xs" color="blue" onClick={onBadgeClick} disabled={!canSubmit} variant="outline">
        ส่ง
      </Button>
    );
  }
  return <></>;
}
