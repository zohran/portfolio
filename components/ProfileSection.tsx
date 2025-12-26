import { Profile } from '@/lib/readProfile';
import SocialLinks from './SocialLinks';
import { readSocialLinks } from '@/lib/readSocialLinks';

interface ProfileSectionProps {
  profile: Profile;
}

export default function ProfileSection({ profile }: ProfileSectionProps) {
  const socialLinks = readSocialLinks();
  const nameParts = profile.name.split(' ');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">
      {/* Subtle background logo */}
      <div className="absolute bottom-0 right-0 z-40 text-foreground/5 text-[20rem] font-black select-none pointer-events-none">
        ZR
      </div>
      

     <div className="flex flex-col justify-center items-center h-full w-full gap-4">
       <div className="relative w-24 h-24">
         <div className="absolute inset-[-10px] rounded-full border-[5px] border-foreground/10"></div>
         <div className="relative w-24 h-24 rounded-full bg-foreground/10 border-2 border-foreground/20 flex items-center justify-center">
           <span className="text-3xl font-black text-foreground tracking-tight">ZR</span>
         </div>
       </div>
       <div className="text-4xl md:text-4xl lg:text-6xl uppercase tracking-wider font-black bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent font-ougther">
         {profile.name}
       </div>
       <div className="text-lg md:text-xl lg:text-2xl text-foreground/70 tracking-wide -mt-2">
         {profile.title}
       </div>
       <SocialLinks socialLinks={socialLinks} />
     </div>
    </section>
  );
}

