'use client';

import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import CurriculumReqGeneralForm from '../form/general/form';

export default function CurriculumReqGeneralView({ activityId }: { activityId: string }) {
  const { loading, data: activity } = useRestQuery<Activity>(endpoints.curriculum.details(activityId));

  if (loading) {
    return <LoadingScreen />;
  }

  return <CurriculumReqGeneralForm raw={{ ...activity?.general, id: activityId }} />;
}
