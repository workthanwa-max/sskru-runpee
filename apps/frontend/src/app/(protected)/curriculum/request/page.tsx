'use client';

import CurriculumNavbar from '@src/layout/curriculum/curriculum-nav-bar';
import CurriculumLayout from '@src/layout/curriculum/layout';
import { CurriculumReqDashboardView } from '@src/sections/curriculum';

export default function page() {
  return (
    <CurriculumLayout navbar={<CurriculumNavbar />}>
      <CurriculumReqDashboardView />
    </CurriculumLayout>
  );
}
