// DTO types for Curriculum operations

export class LearningHoursInput {
  theory: number;
  practice: number;
}

export class CourseStructureInput {
  title: string;
  competencies: string;
  formats: string[];
  learningHours: LearningHoursInput;
}

export class LearningOutcomeInput {
  learningOutcome: string;
  teachingStrategy: string;
  assessmentStrategy: string;
}

export class CurriculumReqCurriculumSubmitInput {
  content: string;
  objectives: string[];
  courseStructures: CourseStructureInput[];
  learningOutcomes: LearningOutcomeInput[];
}

export class CurriculumReqGeneralInput {
  type: string;
  ref: string;
  nameTH: string;
  nameEN: string;
  attributes: string[];
}

export class CurriculumReqGeneralSubmitInput {
  general: CurriculumReqGeneralInput;
  benefits?: string[];
  model?: string;
  type?: string;
}

export class ExpenseEstimateCategoryInput {
  category: 'COMPENSATION' | 'EXPENSES' | 'MATERIAL';
  cost: number;
  name: string;
}

export class CurriculumReqBudgetSubmitInput {
  fee: number;
  minimumRegister: number;
  applicantQualifications: string[];
  applicantQualificationConditions: string[];
  expenseEstimates: ExpenseEstimateCategoryInput[];
  attachFile?: string;
}

export enum CourseImplementationStep {
  ACADEMIC_COMMITTEE = 'ACADEMIC_COMMITTEE',
  ACADEMIC_COUNCIL = 'ACADEMIC_COUNCIL',
  APPROVED = 'APPROVED',
  UNDER_CONSIDERATION = 'UNDER_CONSIDERATION',
  UNIVERSITY_COUNCIL = 'UNIVERSITY_COUNCIL',
}

export class SubmitCourseImplementationInput {
  step: CourseImplementationStep;
  agenda: number;
  approve: boolean;
  title: string;
  time: string;
  date?: string;
  note?: string;
  attachFiles?: string[];
}
