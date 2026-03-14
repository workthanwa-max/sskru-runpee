export const CHOSE_TEACHER_HEADER = [
  { name: 'ชื่อ' },
  { name: 'สกุล' },
  { name: 'ตำแหน่ง ทางวิชาการ' },
  { name: 'วุฒิการศึกษาสูงสุด' },
  { name: 'หลักสูตร / สาขา' },
  { name: 'มหาวิทยาลัย' },
  { name: 'ปีที่สำเร็จ การศึกษา' },
];

export const OBJECTIVE_RADIOS = [
  {
    label: 'ประกอบอาชีพ/สร้างรายได้',
    value: 'ประกอบอาชีพ/สร้างรายได้',
  },
  {
    label: 'เพิ่มพูนความรู้/สมรรถนะ/หลักฐานประกอบการสมัครงาน',
    value: 'เพิ่มพูนความรู้/สมรรถนะ/หลักฐานประกอบการสมัครงาน',
  },
  {
    label: 'สะสมหน่วยกิตเพื่อเทียบโอนผลการเรียนรายวิชาในหลักสูตร',
    value: 'สะสมหน่วยกิตเพื่อเทียบโอนผลการเรียนรายวิชาในหลักสูตร',
  },
];

export const CODE_NAME_RADIOS: {
  label: string;
  value: string;
}[] = [
  {
    label: 'หลักสูตรระยะสั้น',
    value: 'Short',
  },
  {
    label: 'หลักสูตรฝึกอบรม',
    value: 'Training',
  },
];
export const CODE_NAME_INPUT: {
  label: string;
  name: 'general.ref' | 'general.nameEN' | 'general.nameTH';
}[] = [
  {
    label: 'รหัสอ้างอิงเพื่อการติดตามหลักสูตร',
    name: 'general.ref',
  },
  {
    label: 'ชื่อหลักสูตร (ภาษาไทย)',
    name: 'general.nameTH',
  },
  {
    label: 'ชื่อหลักสูตร (ภาษาอังกฤษ)',
    name: 'general.nameEN',
  },
];

export const MODEL_RADIOS: { label: string; value: string }[] = [
  {
    label: 'เข้าระบบคลังหน่วยกิต (สะสมหน่วยกิต)',
    value: 'CreditSystem',
  },
  {
    label: 'ไม่เข้าระบบคลังหน่วยกิต',
    value: 'NonCreditSystem',
  },
];

export const TYPE_RADIOS: { label: string; value: string }[] = [
  {
    label: 'Upskill',
    value: 'Upskill',
  },
  {
    label: 'Reskill',
    value: 'Reskill',
  },
  {
    label: 'Newskill',
    value: 'Newskill',
  },
];
