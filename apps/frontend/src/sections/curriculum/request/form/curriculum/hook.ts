import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRestMutation } from '@src/hooks/use-rest';
import { endpoints } from '@src/utils/axios';
import { Activity } from '@src/types/domain';
import { initialFormValues } from './constant';
import { CurriculumReqCurriculumFormSchema } from './schema';
import { CurriculumReqCurriculumForm } from './types';

export type CurriculumReqCurriculum = Partial<Activity> & { id: string };

export function useCurriculumReqCurriculum(raw: CurriculumReqCurriculum, onCompleted?: VoidFunction) {
  const [callSubmitCurriculum, { loading }] = useRestMutation(endpoints.curriculum.curriculum(raw.id), 'POST');

  const defaultValues = useMemo(
    (): CurriculumReqCurriculumForm => ({
      activityId: raw.id,
      objectives: raw.objectives?.map((value) => ({ value })) ?? initialFormValues.objectives,
      content: raw.content ?? initialFormValues.content,
      learningOutcomes:
        raw.learningOutcomes?.map((l) => ({
          learningOutcome: l.learningOutcome,
          teachingStrategy: l.teachingStrategy,
          assessmentStrategy: l.assessmentStrategy,
        })) ?? initialFormValues.learningOutcomes,
      courseStructures:
        raw.courseStructures?.map((c) => ({
          topicOrContent: c.title,
          competenciesOrLearningOutcomes: c.competencies,
          learningHours: c.learningHours,
          formats: c.formats,
        })) ?? initialFormValues.courseStructures,
    }),
    [raw.content, raw.courseStructures, raw.id, raw.learningOutcomes, raw.objectives],
  );

  const methods = useForm<CurriculumReqCurriculumForm>({
    resolver: zodResolver(CurriculumReqCurriculumFormSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await callSubmitCurriculum({
      content: data.content,
      courseStructures:
        data.courseStructures.map((item) => ({
          competencies: item.competenciesOrLearningOutcomes,
          formats: item.formats,
          learningHours: item.learningHours,
          title: item.topicOrContent,
        })) ?? [],
      learningOutcomes:
        data.learningOutcomes.map((item) => ({
          assessmentStrategy: item.assessmentStrategy,
          learningOutcome: item.learningOutcome,
          teachingStrategy: item.teachingStrategy,
        })) ?? [],
      objectives: data.objectives.map((item) => item.value) ?? [],
    });
    onCompleted?.();
    reset();
  });

  const objectiveInput = useFieldArray({
    name: 'objectives',
    control,
  });
  const learningOutcomeInput = useFieldArray({
    name: 'learningOutcomes',
    control,
  });
  const couseStructureInput = useFieldArray({
    name: 'courseStructures',
    control,
  });

  return {
    objectiveInput,
    learningOutcomeInput,
    couseStructureInput,
    onSubmit,
    methods,
    submitting: isSubmitting || loading,
    formErrors: errors,
    errors: null,
    reset,
  };
}
