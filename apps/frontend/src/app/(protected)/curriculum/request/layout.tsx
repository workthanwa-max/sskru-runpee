'use client';

import { ProtectURLGuard } from '@src/auth/guard';
import { paths } from '@src/routes/paths';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ProtectURLGuard rootPath={paths.curriculum.request.root} withRedirect>
      {children}
    </ProtectURLGuard>
  );
}
