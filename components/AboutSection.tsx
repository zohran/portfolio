'use client';

import { Profile } from '@/lib/readProfile';
import { readSkills } from '@/lib/readSkills';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const skills = readSkills();

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/zohran.pdf';
    link.download = 'zohran.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-16 xs:py-20 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 bg-foreground/3 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Description with border */}
          <div className="relative mb-6 xs:mb-8 sm:mb-10 md:mb-12 pl-3 xs:pl-4 sm:pl-5 md:pl-6 border-l-2 xs:border-l-[3px] sm:border-l-4 border-foreground/30">
            <p className="text-foreground/90 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed pr-1">
              {profile.description}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
              {skills.usingNow.map((skill, index) => (
                <button
                  key={skill.name}
                  className="group relative px-2.5 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 bg-muted/60 hover:bg-muted border border-border/50 rounded-md xs:rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 xs:gap-2 sm:gap-3 active:scale-95 overflow-hidden touch-manipulation"
                >
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-xs xs:text-sm sm:text-base font-bold text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all flex-shrink-0">
                    {skill.icon}
                  </span>
                  <span className="relative text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          {skills.learning && skills.learning.length > 0 && (
            <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12 p-3 xs:p-4 sm:p-5 md:p-6 bg-muted/30 rounded-lg xs:rounded-xl sm:rounded-2xl border border-foreground/20">
              <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground/80 mb-3 xs:mb-4 sm:mb-5 uppercase tracking-wider">
                Currently Learning:
              </p>
              <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
                {skills.learning.map((skill) => (
                  <button
                    key={skill.name}
                    className="group px-2.5 xs:px-3 sm:px-4 md:px-5 py-1.5 xs:py-2 sm:py-2.5 md:py-3 bg-background/50 hover:bg-background border-2 border-foreground/30 hover:border-foreground/60 rounded-md xs:rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 xs:gap-2 sm:gap-3 active:scale-95 touch-manipulation"
                  >
                    <span className="text-sm xs:text-base sm:text-lg font-bold text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all flex-shrink-0">
                      {skill.icon}
                    </span>
                    <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors whitespace-nowrap">
                      {skill.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Download Resume Button */}
          <div className="mt-6 xs:mt-8 sm:mt-10 md:mt-12">
            <button 
              onClick={handleDownloadResume}
              className="group flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 px-5 xs:px-6 sm:px-7 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 bg-foreground hover:bg-foreground/90 active:bg-foreground/80 text-background rounded-md xs:rounded-lg sm:rounded-xl transition-all active:scale-95 shadow-lg hover:shadow-xl w-full xs:w-auto touch-manipulation"
            >
              <svg
                className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="text-[10px] xs:text-xs sm:text-sm font-semibold whitespace-nowrap">
                Download Resume
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



