import { paths } from '@src/routes/paths';

export const navConfigs = (activityId: string) => [
  {
    name: 'ส่วนที่ 1 ข้อมูลทั่วไป',
    path: paths.curriculum.request.sections(activityId).general(),
    children: [
      { key: 'name', name: 'รหัสและชื่อหลักสูตร', hash: '#name' },
      { key: 'model', name: 'รูปแบบของหลักสูตร', hash: '#model' },
      {
        key: 'benefits',
        name: 'ประโยชน์ที่ได้รับ',
        hash: '#benefits',
      },
      // {
      //   key: 'administrative',
      //   name: 'คณะกรรมการบริหารหลักสูตร',
      //   hash: '#administrative',
      // },
    ],
  },
  {
    name: 'ส่วนที่ 2 หลักสูตร',
    path: paths.curriculum.request.sections(activityId).curriculum(),
    children: [
      { key: 'objective', name: 'วัตถุประสงค์ของหลักสูตร', hash: '#objective' },
      { key: 'content', name: 'เนื้อหาหลักสูตร', hash: '#content' },
      {
        key: 'result',
        name: 'ผลลัพธ์การเรียนรู้',
        hash: '#result',
      },
      { key: 'structure', name: 'โครงสร้างหลักสูตร', hash: '#structure' },
    ],
  },
  {
    //NOTE: เปลี่ยนจากแผนงบประมาณ
    name: 'ส่วนที่ 3 การรับสมัคร',
    path: paths.curriculum.request.sections(activityId).budget(),
    children: [
      {
        key: 'registrant',
        name: 'จำนวนผู้ลงทะเบียนขั้นต่ำ',
        hash: '#registrant',
      },
      { key: 'training', name: 'ค่าธรรมเนียมในการอบรม', hash: '#training' },
      { key: 'revenue', name: 'ประมาณการรายรับ', hash: '#revenue' },
      // { key: 'expenses', name: 'ประมาณการรายจ่าย', hash: '#expenses' },

      { key: 'feature', name: 'คุณสมบัติผู้สมัคร', hash: '#feature' },
      { key: 'upload', name: 'อัพโหลดเอกสารหลักสูตร', hash: '#upload' },
    ],
  },
];
