'use client';

import { AuthGuard } from '@src/auth/guard';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
