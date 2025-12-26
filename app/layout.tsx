import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { readProfile } from '@/lib/readProfile';
import { readSocialLinks } from '@/lib/readSocialLinks';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const profile = readProfile();

  return {
    title: `${profile.name} - ${profile.title}`,
    description: profile.description,
    authors: [{ name: profile.name }],
    openGraph: {
      title: `${profile.name} - ${profile.title}`,
      description: profile.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} - ${profile.title}`,
      description: profile.description,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = readProfile();
  const socialLinks = readSocialLinks();

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer socialLinks={socialLinks} profileName={profile.name} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

