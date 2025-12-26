import Image from 'next/image';
import { Profile } from '@/lib/readProfile';
import SocialLinks from './SocialLinks';
import { SocialLinks as SocialLinksType } from '@/lib/readSocialLinks';

import { Github, Linkedin, Mail } from 'lucide-react';

interface ProfileSectionProps {
  profile: Profile;
  socialLinks: SocialLinksType;
}

export default function MyProfile({ profile, socialLinks }: ProfileSectionProps) {
  const nameParts = profile.name.split(' ');


  // const filteredProjects = [].filter((p) => filter === "ALL" || p.type === filter)


  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left side - Dark content */}
      <div className="relative z-10 w-full md:w-[60%] bg-[#D7D7D7] md:bg-black text-white flex flex-col justify-center px-12 md:px-24 py-32 md:py-0 hero-diagonal h-full min-h-[60vh] md:min-h-screen">
        <div className="max-w-md">
          <div className="mb-12">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center font-bold text-xl">TG</div>
          </div>
          <p className="text-xl mb-2 font-light">Hi, I am</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">{profile.name}</h1>
          <p className="text-zinc-400 text-lg mb-8 uppercase tracking-widest">{profile.title}</p>
          <div className="flex gap-4">
            <a
              href={socialLinks.github}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <Github size={20} />
            </a>
            <a
              href={socialLinks.linkedin}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${socialLinks.email}`}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="absolute top-0 right-0 w-full md:w-[45%] h-full z-0">
        <Image
          src={`https://i.pravatar.cc/800?img=${profile.name.length}`}
          alt={profile.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute bottom-12 right-12 text-black/40 text-[10px] max-w-[120px] leading-tight md:block hidden">
          this is not my photo. but i dearly hope to get one just like this
        </div>
      </div>
    </section>
  );
}

