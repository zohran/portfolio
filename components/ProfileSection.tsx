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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-12 xs:pt-14 sm:pt-16 px-2.5 xs:px-3 sm:px-4">
      {/* Subtle background logo */}
      <div className="absolute bottom-0 right-0 z-40 text-foreground/5 text-[6rem] xs:text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black select-none pointer-events-none leading-none">
        ZR
      </div>
      

     <div className="flex flex-col justify-center items-center h-full w-full gap-2.5 xs:gap-3 sm:gap-4 max-w-full">
       <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 flex-shrink-0">
         <div className="absolute inset-[-6px] xs:inset-[-8px] sm:inset-[-10px] rounded-full border-[3px] xs:border-[4px] sm:border-[5px] border-foreground/10"></div>
         <div className="relative w-full h-full rounded-full bg-foreground/10 border-2 border-foreground/20 flex items-center justify-center">
           <span className="text-xl xs:text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">ZR</span>
         </div>
       </div>
       <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-wider font-black bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent font-ougther text-center px-2 xs:px-3 sm:px-4 leading-tight">
         {profile.name}
       </div>
       <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 tracking-wide -mt-0.5 xs:-mt-1 sm:-mt-2 text-center px-2 xs:px-3 sm:px-4">
         {profile.title}
       </div>
       <div className="mt-1 xs:mt-1.5 sm:mt-2">
         <SocialLinks socialLinks={socialLinks} />
       </div>
     </div>
    </section>
  );
}

