import { AuthProvider } from '../auth/context/jwt';
import ThemeProvider from '../theme';
import './global.css';

export const metadata = {
  title: 'SSKRU',
  openGraph: {
    title: 'System Management',
    images: [
      {
        url: '/sskru.png',
        width: 1200,
        height: 630,
        alt: 'Default Image',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
