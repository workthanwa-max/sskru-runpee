'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../auth/hooks';
import { paths } from '../routes/paths';
import MainLayout from '../layout/main';
import LandingView from '../sections/home/view/landing-view';

export default function Index() {
  const { user, authenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authenticated && user) {
      const roles = Array.isArray(user.roles) ? user.roles : [];
      const systemUrls = Array.isArray(user.systemUrls) ? user.systemUrls : [];

      if (roles.includes('ADMIN')) {
        router.push(paths.management.root);
      } else if (systemUrls.length >= 1) {
        // ไปที่ระบบแรกที่มีสิทธิ์
        router.push('/' + systemUrls[0]);
      } else if (roles.includes('STUDENT')) {
        // ถ้าเป็นนักศึกษา ให้ไปที่หน้า Admission
        router.push(paths.admission.root);
      } else {
        // ถ้าไม่มีระบบเลย (ซึ่งไม่ควรมี) ให้ไปหน้า 403 หรือหน้าว่าง
        router.push(paths.page403);
      }
    }
  }, [authenticated, user, router]);

  if (authenticated) {
    return null; // ป้องกันการกระพริบของหน้า Landing ก่อน Redirect
  }

  return (
    <MainLayout>
      <LandingView />
    </MainLayout>
  );
}
