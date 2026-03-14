'use client';

import { GuestGuard } from '@src/auth/guard';
import MainLayout from '@src/layout/main';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <GuestGuard>
      <MainLayout>{children}</MainLayout>
    </GuestGuard>
  );
}
