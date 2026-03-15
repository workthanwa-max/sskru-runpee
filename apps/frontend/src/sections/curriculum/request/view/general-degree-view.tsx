'use client';

import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import CurriculumReqGeneralDegreeForm from '../form/general-degree/form';

export default function CurriculumReqGeneralDegreeView({ activityId }: { activityId: string }) {
  const { loading, data: activity } = useRestQuery<Activity>(endpoints.curriculum.details(activityId));

  if (loading) {
    return <LoadingScreen />;
  }

  return <CurriculumReqGeneralDegreeForm raw={{ ...activity?.general, id: activityId }} />;
}
