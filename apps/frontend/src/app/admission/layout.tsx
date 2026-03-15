'use client';

import { ProtectURLGuard } from '@src/auth/guard';
import AdmissionLayout from '@src/layout/admission';
import { paths } from '@src/routes/paths';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AdmissionLayout>{children}</AdmissionLayout>
  );
}
