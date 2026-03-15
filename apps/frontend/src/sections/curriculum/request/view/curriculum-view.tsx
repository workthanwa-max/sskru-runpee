'use client';

import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import CurriculumReqCurriculumForm from '../form/curriculum/form';

export default function CurriculumReqCurriculumView({ activityId }: { activityId: string }) {
  const { loading, data: activity } = useRestQuery<Activity>(endpoints.curriculum.details(activityId));

  if (loading) {
    return <LoadingScreen />;
  }

  return <CurriculumReqCurriculumForm raw={{ ...activity, id: activityId }} />;
}
