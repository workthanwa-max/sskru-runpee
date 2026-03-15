export interface Faculty {
  id: string;
  name: string;
  description?: string;
  shortName?: string;
  parentId?: string;
  parent?: Faculty;
  children?: Faculty[];
}

export interface Education {
  degree: string;
  field: string;
  university: string;
  year: number;
}

export interface Personnel {
  id: string;
  personnelId: string;
  firstname: string;
  lastname: string;
  phone: string;
  highestEducation: string;
  university: string;
  graduationYear: number;
  programOrField: string;
  academicPosition?: string;
  facultyIds: string[];
  faculties: Faculty[];
  educations: Education[];
}

export interface Student {
  id: string;
  studentId: string;
  firstname: string;
  lastname: string;
  phone?: string;
  email?: string;
  facultyId?: string;
  faculty?: Faculty;
  program?: string;
  year?: number;
}

export interface System {
  id: string;
  name: string;
  url: string;
  note?: string;
  active: boolean;
  loginRequired: boolean;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  systems?: System[];
}

export enum RoleType {
  ADMIN = 'ADMIN',
  PERSONNEL = 'PERSONNEL',
  STUDENT = 'STUDENT',
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  type: RoleType;
  permissions?: Permission[];
}

export enum CourseImplementationStep {
  ACADEMIC_COMMITTEE = 'ACADEMIC_COMMITTEE',
  ACADEMIC_COUNCIL = 'ACADEMIC_COUNCIL',
  APPROVED = 'APPROVED',
  UNDER_CONSIDERATION = 'UNDER_CONSIDERATION',
  UNIVERSITY_COUNCIL = 'UNIVERSITY_COUNCIL',
}

export interface Activity {
  id: string;
  creatorId: string;
  currId?: string;
  currShortId?: string;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  step: CourseImplementationStep;
  progress: number;
  general?: ActivityGeneral;
  budget?: ActivityBudget;
  content?: string;
  objectives?: string[];
  courseStructures?: CourseStructure[];
  learningOutcomes?: LearningOutcome[];
  implementations?: ActivityImplementation[];
  createdAt: string;
  updatedAt: string;
}

export interface ActivityGeneral {
  id: string;
  activityId: string;
  nameTH: string;
  nameEN: string;
  type: string;
  ref: string;
  attributes: string[];
  benefits?: string[];
  model?: string;
}

export interface ActivityBudget {
  id: string;
  activityId: string;
  fee: number;
  minimumRegister: number;
  applicantQualifications: string[];
  applicantQualificationConditions: string[];
  attachFile?: string;
}

export interface ActivityImplementation {
  id: string;
  activityId: string;
  step: CourseImplementationStep;
  agenda: number;
  approve: boolean;
  title: string;
  time: string;
  date?: string;
  note?: string;
  attachFiles?: string[];
  actorId: string;
}

export interface CourseStructure {
  id: string;
  title: string;
  competencies: string;
  learningHours: {
    theory: number;
    practice: number;
  };
  formats: string[];
  curriculumId: string;
}

export interface LearningOutcome {
  id: string;
  learningOutcome: string;
  teachingStrategy: string;
  assessmentStrategy: string;
  curriculumId: string;
}
export interface Curriculum {
  id: string;
  nameTh: string;
  nameEn: string;
  code: string;
  facultyId?: string;
}
