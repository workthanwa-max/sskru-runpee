'use client';
// ----------------------------------------------------------------------

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { componentsOverrides } from './overrides';

type Props = {
  children: React.ReactNode;
};
export default function ThemeProvider({ children }: Props) {
  const components = componentsOverrides();
  const theme: MantineThemeOverride = {
    colorScheme: 'light',
    primaryColor: 'sskruGold',
    primaryShade: 7,
    colors: {
        sskruGold: [
            '#FDF9E7',
            '#F9EFB6',
            '#F5E485',
            '#F0DA54',
            '#ECCF23',
            '#D1B71F',
            '#B59E1B',
            '#9A8617', // Main Gold
            '#807013',
            '#65580F',
        ],
        sskruWhite: [
            '#FFFFFF', // 0
            '#FDFDFD', // 1
            '#FAFAFA', // 2
            '#F7F7F7', // 3
            '#F5F5F5', // 4
            '#F2F2F2', // 5
            '#F0F0F0', // 6
            '#EDEDED', // 7
            '#EBEBEB', // 8
            '#E8E8E8', // 9
        ]
    },
    components,
    globalStyles: (theme) => ({
      'html, body': {
        height: '100%',
        margin: 0,
        padding: 0,
      },
      body: {
        backgroundColor: theme.colors.sskruWhite[1],
        color: theme.black,
        fontFamily: 'Instrument Sans, sans-serif',
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(197, 160, 40, 0.03) 0px, transparent 50%),
          radial-gradient(at 100% 0%, rgba(197, 160, 40, 0.05) 0px, transparent 50%)
        `,
        backgroundAttachment: 'fixed',
      },
      '.premium-glass': {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 10px 30px rgba(197, 160, 40, 0.05)',
      },
      '.gold-gradient-text': {
        background: `linear-gradient(135deg, ${theme.colors.sskruGold[6]} 0%, ${theme.colors.sskruGold[8]} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }
    }),
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
}
