import { CurriculumReqCurriculumForm } from './types';

export const initialFormValues: Omit<CurriculumReqCurriculumForm, 'activityId'> = {
  objectives: [
    {
      value: '',
    },
  ],
  content: '',
  learningOutcomes: [
    {
      learningOutcome: '',
      teachingStrategy: '',
      assessmentStrategy: '',
    },
  ],
  courseStructures: [
    {
      topicOrContent: '',
      competenciesOrLearningOutcomes: '',
      learningHours: {
        theory: 0,
        practice: 0,
      },
      formats: [''],
    },
  ],
};
