'use client';
import CurriculumReqDegreeNavbar from '@src/layout/curriculum/curriculum-request-degree-nav-bar';
import CurriculumLayout from '@src/layout/curriculum/layout';
import { CurriculumReqGeneralDegreeView } from '@src/sections/curriculum';

export default function page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <CurriculumLayout navbar={<CurriculumReqDegreeNavbar activityId={id} />}>
      <CurriculumReqGeneralDegreeView activityId={id} />
    </CurriculumLayout>
  );
}
