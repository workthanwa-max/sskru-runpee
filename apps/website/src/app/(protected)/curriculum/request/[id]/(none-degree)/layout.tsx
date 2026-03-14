'use client';

import CurriculumReqNavbar from '@src/layout/curriculum/curriculum-request-nav-bar';
import CurriculumLayout from '@src/layout/curriculum/layout';

import { PropsWithChildren } from 'react';

export default function Layout({ children, params }: PropsWithChildren & { params: { id: string } }) {
  return <CurriculumLayout navbar={<CurriculumReqNavbar activityId={params.id} />}>{children}</CurriculumLayout>;
}
