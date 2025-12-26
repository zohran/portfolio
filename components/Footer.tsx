'use client';

import SocialLinks from './SocialLinks';
import { SocialLinks as SocialLinksType } from '@/lib/readSocialLinks';
import { Profile } from '@/lib/readProfile';

interface FooterProps {
  socialLinks: SocialLinksType;
  profileName: string;
}

export default function Footer({ socialLinks, profileName }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/30 bg-background mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <button
            onClick={scrollToTop}
            className="text-sm font-medium text-foreground/60 hover:text-foreground uppercase tracking-wider transition-colors"
          >
            Back to Top
          </button>
          <SocialLinks socialLinks={socialLinks} />
          <p className="text-sm text-foreground/40 uppercase tracking-wider">
            © {new Date().getFullYear()} {profileName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

