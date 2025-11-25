import SessionWrapper from '@/components/sessionwrapper';
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header >
          <nav>
            <Link href="/about">Over ons</Link>
          </nav>
        </header>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
