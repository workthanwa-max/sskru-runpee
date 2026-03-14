'use client';

import { Card, Group, Loader, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter, useSearchParams } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { useState } from 'react';
import { useRestQuery } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import { ModalCurriculumApproveForm } from '../form';
import { EnumCourseImplementationStep } from '../schema';
import CurriculumApproveStep from '../step';
import CurriculumApproveTable from '../table';
import { CourseImplementationStep, CurriculumApproveForm } from '../types';

export default function CurriculumApproveTableView() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') ||
    EnumCourseImplementationStep.Values.UNDER_CONSIDERATION) as CourseImplementationStep;
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [formInput, setFormInput] = useState<
    (Partial<CurriculumApproveForm> & { activityId: string; step: CurriculumApproveForm['step'] }) | null
  >(null);

  const { data: activities, refetch, loading } = useRestQuery<Activity[]>(endpoints.curriculum.reviewing);

  if (loading) {
    return <Loader />;
  }

  return (
    <Card>
      <Group>
        <Text size="lg" weight="bold" color="#3f3f46">
          การดำเนินการหลักสูตร
        </Text>
      </Group>
      <CurriculumApproveStep
        tab={tab}
        onTab={function (tab: CourseImplementationStep): void {
          const searchTabParams = new URLSearchParams({
            tab: tab,
          }).toString();
          router.push(paths.curriculum.approve.tabs(searchTabParams));
        }}
      />

      <ModalCurriculumApproveForm
        raw={formInput}
        opened={opened}
        onClose={() => {
          setFormInput(null);
          close();
        }}
        onCompleted={() => {
          refetch();
          close();
        }}
      />

      <CurriculumApproveTable
        data={activities?.filter((item) => item.step === tab) ?? []}
        onProcess={function (approve: '0' | '1', node): void {
          setFormInput({
            approve,
            activityId: node.id,
            step: tab,
          });
          open();
        }}
      />
    </Card>
  );
}
