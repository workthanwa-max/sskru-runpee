'use client';

import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <div>SplashScreen</div>;
}
