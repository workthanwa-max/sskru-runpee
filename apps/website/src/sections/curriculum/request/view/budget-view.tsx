'use client';

import { LoadingScreen } from '@src/components/loading-screen';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import CurriculumReqBudgetForm from '../form/budget/form';

export default function CurriculumReqBudgetView({ activityId }: { activityId: string }) {
  const { loading, data: activity } = useRestQuery<Activity>(endpoints.curriculum.details(activityId));

  if (loading) {
    return <LoadingScreen />;
  }

  return <CurriculumReqBudgetForm raw={{ ...activity?.budget, id: activityId }} />;
}
