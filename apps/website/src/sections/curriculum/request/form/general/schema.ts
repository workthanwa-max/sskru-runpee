import { z } from 'zod';

export const CurriculumReqGeneralFormSchema = z.object({
  activityId: z.string().uuid().min(1),
  general: z.object({
    type: z.string().min(1), //รหัสและชื่อหลักสูตร  eg. หลักสูตรระยะสั้น, หลักสูตรฝึกอบรม, degree
    ref: z.string().min(1),
    nameTH: z.string().min(1),
    nameEN: z.string().min(1),
    attributes: z.array(z.any()).nullish(),
  }),
  model: z.string().min(1), //รูปแบบ eg. เข้าระบบคลังหน่วยกิต (สะสมหน่วยกิต), ม่เข้าระบบคลังหน่วยกิต
  type: z.string().min(1), //ประเภทของหลักสูตร eg. Upskill, Reskill, Newskill
  benefits: z.array(z.string()).min(1), //ประโยชน์ที่ได้รับเมื่อจบหลักสูตร
});
