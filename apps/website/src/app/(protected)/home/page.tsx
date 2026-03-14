'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@src/auth/hooks';
import { paths } from '@src/routes/paths';

export default function Page() {
  const { user, authenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authenticated && user) {
      const roles = Array.isArray(user.roles) ? user.roles : [];
      const systemUrls = Array.isArray(user.systemUrls) ? user.systemUrls : [];

      if (roles.includes('ADMIN')) {
        router.push(paths.management.root);
      } else if (systemUrls.length >= 1) {
        router.push('/' + systemUrls[0]);
      } else {
        router.push(paths.page403);
      }
    } else if (!authenticated) {
        router.push(paths.auth.login);
    }
  }, [authenticated, user, router]);

  return null;
}
