'use client';

import { ProtectURLGuard } from '@src/auth/guard';
import ManagementLayout from '@src/layout/management';
import { paths } from '@src/routes/paths';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ProtectURLGuard rootPath={paths.management.root} withRedirect>
      <ManagementLayout>{children}</ManagementLayout>
    </ProtectURLGuard>
  );
}
