// ----------------------------------------------------------------------
import { v4 } from 'uuid';

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  HOME: '/home',
  MANAGEMENT: '/management',
  CURRICULUM: '/curriculum',
  ADMISSION: '/admission',
} as const;

export const AUTH = {
  login: `${ROOTS.AUTH}/login`,
};
export const ADMISSION = {
  root: `${ROOTS.ADMISSION}`,
  register: '/registration',
  application: `${ROOTS.ADMISSION}/application`,
  receipt: `${ROOTS.ADMISSION}/receipt`,
  enrollment: {
    courseSelection: `${ROOTS.ADMISSION}/enrollment/course`,
    personalInfo: `${ROOTS.ADMISSION}/enrollment/personal`,
    addressInfo: `${ROOTS.ADMISSION}/enrollment/address`,
    familyInfo: `${ROOTS.ADMISSION}/enrollment/family`,
    educationInfo: `${ROOTS.ADMISSION}/enrollment/education`,
    reviewConfirm: `${ROOTS.ADMISSION}/enrollment/review`,
  },
};
export const MANAGEMENT = {
  root: ROOTS.MANAGEMENT,
  system: {
    root: `${ROOTS.MANAGEMENT}/systems`,
  },
  faculty: {
    root: `${ROOTS.MANAGEMENT}/faculties`,
  },
  permission: {
    root: `${ROOTS.MANAGEMENT}/permissions`,
  },
  student: {
    root: `${ROOTS.MANAGEMENT}/students`,
  },
  personnel: {
    root: `${ROOTS.MANAGEMENT}/personnels`,
  },
} as const;
export const CURRICULUM = {
  root: ROOTS.CURRICULUM,
  request: {
    root: `${ROOTS.CURRICULUM}/request`,
    sections: (id = v4()) => ({
      generalDegree: `${ROOTS.CURRICULUM}/request/${id}/general-degree`,
      general: (hash = '#name') => `${ROOTS.CURRICULUM}/request/${id}/general/${hash}`,
      curriculum: (hash = '#objective') => `${ROOTS.CURRICULUM}/request/${id}/curriculum/${hash}`,
      budget: (hash = '#registrant') => `${ROOTS.CURRICULUM}/request/${id}/budget/${hash}`,
    }),
  },
  approve: {
    root: `${ROOTS.CURRICULUM}/approve`,
    tabs: (queryStrTab: string) => `${ROOTS.CURRICULUM}/approve?${queryStrTab}`,
  },
} as const;

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  root: '/',
  home: '/',
  landing: '/landing',
  auth: AUTH,
  management: MANAGEMENT,
  curriculum: CURRICULUM,
  admission: ADMISSION,
} as const;
