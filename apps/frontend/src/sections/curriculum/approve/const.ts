import { CurriculumApproveForm } from './types';

export const initialFormValues: CurriculumApproveForm = {
  activityId: '',
  agenda: 0,
  approve: '1',
  title: '',
  step: 'UNDER_CONSIDERATION',
  time: '',
  date: new Date(),
};
