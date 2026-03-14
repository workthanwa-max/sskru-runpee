import { CurriculumReqBudgetForm, EnumExpenseEstimateCategory } from './types';

export const initialFormValues: Omit<CurriculumReqBudgetForm, 'activityId'> = {
  minimumRegister: 0,
  hasFee: '1',
  fee: 0,
  expenseEstimates: [
    {
      category: 'COMPENSATION',
      name: '',
      cost: 0,
    },
  ],
  applicantQualifications: [
    {
      condition: '',
    },
  ],
  applicantQualificationConditions: [
    {
      condition: '',
    },
  ],
  attachFile: '',
};

export const INCOMES = [
  {
    name: 'ค่าลงทะเบียน',
    key: 'fee',
    unit: 'บาท / คน',
  },
  {
    name: 'จำนวน',
    key: 'minimumRegister',
    unit: 'คน',
  },
  {
    name: 'รวม',
    key: 'total',
    unit: 'บาท',
  },
] as const;

export const candidateQualifications = [
  {
    label: 'ผู้เรียนที่สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลายหรือเทียบเท่า หรือ ระดับ ปวส.',
    value: 'ผู้เรียนที่สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลายหรือเทียบเท่า หรือ ระดับ ปวส.',
  },
  {
    label: 'นิสิต / นักศึกษา ชั้นปีที่  3 หรือ ผู้ที่สำเร็จการศึกษาระดับ ปวส.',
    value: 'นิสิต / นักศึกษา ชั้นปีที่  3 หรือ ผู้ที่สำเร็จการศึกษาระดับ ปวส.',
  },
  {
    label: 'ผู้ที่ทำงานแล้วและต้องการเพิ่มพูนสมรรถนะ',
    value: 'ผู้ที่ทำงานแล้วและต้องการเพิ่มพูนสมรรถนะ',
  },
  {
    label: 'ผู้ที่ทำงานแล้วและต้องการเพิ่มพูนสมรรถนะที่แตกต่างไปจากเดิม',
    value: 'ผู้ที่ทำงานแล้วและต้องการเพิ่มพูนสมรรถนะที่แตกต่างไปจากเดิม',
  },
  {
    label: 'ผู้สูงอายุหรือผู้ที่เกษียนแล้วต้องการจะประกอบอาชีพอื่นที่แตกต่างกัน',
    value: 'ผู้สูงอายุหรือผู้ที่เกษียนแล้วต้องการจะประกอบอาชีพอื่นที่แตกต่างกัน',
  },
];

export const categoryOptions: { value: EnumExpenseEstimateCategory; label: string }[] = [
  { value: 'COMPENSATION', label: 'ค่าตอบแทน' },
  { value: 'EXPENSES', label: 'ค่าใช้จ่าย' },
  { value: 'MATERIAL', label: 'ค่าวัสดุ' },
];
