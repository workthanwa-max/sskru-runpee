'use client';

import { useCallback, useEffect, useState } from 'react';

import { SplashScreen } from '@src/components/loading-screen';
import { useRouter } from '@src/routes/hooks';
import { paths } from '@src/routes/paths';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<'jwt', string> = {
  jwt: paths.auth.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();
  const { authenticated, method, user } = useAuthContext();
  const [checked, setChecked] = useState(false);

  function getRoleHome(roles: string[], systemUrls: string[]) {
    if (roles.includes('ADMIN')) return '/management';
    // ไปที่ systemUrl แรกที่ user มีสิทธิ์
    if (systemUrls?.length > 0) return '/' + systemUrls[0];
    if (roles.includes('STUDENT')) return '/admission';
    return '/';
  }

  function hasPermission() {
    if (!user) {
      console.warn('No user found');
      return false;
    }
    const roles = Array.isArray(user.roles) ? user.roles : [];
    const systemUrls = Array.isArray(user.systemUrls) ? user.systemUrls : [];
    const currentPath = window.location.pathname;
    console.log('AuthGuard check:', { path: currentPath, roles, systemUrls, user });

    // ADMIN เข้าได้ทุกที่
    if (roles.includes('ADMIN')) return true;

    // ตรวจสอบว่า current path อยู่ใน systemUrls ที่ user มีสิทธิ์
    const hasUrlPermission = systemUrls.some((url: string) => currentPath.startsWith('/' + url));
    if (hasUrlPermission) return true;

    // STUDENT ไป /admission ได้
    if (roles.includes('STUDENT') && currentPath.startsWith('/admission')) return true;

    return false;
  }

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      const loginPath = loginPaths[method];
      const href = `${loginPath}?${searchParams}`;
      router.replace(href);
    } else if (!hasPermission()) {
      const roles = Array.isArray(user?.roles) ? user.roles : [];
      const systemUrls = Array.isArray(user?.systemUrls) ? user.systemUrls : [];
      const home = getRoleHome(roles, systemUrls);
      router.replace(home);
    } else {
      setChecked(true);
    }
  }, [authenticated, method, router, user]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
