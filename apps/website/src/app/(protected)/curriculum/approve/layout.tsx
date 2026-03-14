'use client';

import { ProtectURLGuard } from '@src/auth/guard';
import CurriculumNavbar from '@src/layout/curriculum/curriculum-nav-bar';
import CurriculumLayout from '@src/layout/curriculum/layout';
import { paths } from '@src/routes/paths';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ProtectURLGuard rootPath={paths.curriculum.approve.root} withRedirect>
      <CurriculumLayout navbar={<CurriculumNavbar />}>{children}</CurriculumLayout>
    </ProtectURLGuard>
  );
}
