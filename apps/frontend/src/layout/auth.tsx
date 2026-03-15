import { useMantineTheme } from '@mantine/core';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  const theme = useMantineTheme();
  return <div style={{ background: theme.colors.gray[0], height: '100vh' }}>{children}</div>;
}
