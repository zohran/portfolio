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
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/3 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Description with border */}
          <div className="relative mb-12 pl-6 border-l-4 border-foreground/30">
            <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {skills.usingNow.map((skill, index) => (
                <button
                  key={skill.name}
                  className="group relative px-5 py-3 bg-muted/60 hover:bg-muted border border-border/50 rounded-xl transition-all cursor-pointer flex items-center gap-3 active:scale-95 overflow-hidden"
                >
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-base font-bold text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all">
                    {skill.icon}
                  </span>
                  <span className="relative text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                    {skill.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          {skills.learning && skills.learning.length > 0 && (
            <div className="mb-12 p-6 bg-muted/30 rounded-2xl border border-foreground/20">
              <p className="text-sm font-semibold text-foreground/80 mb-5 uppercase tracking-wider">
                Currently Learning:
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.learning.map((skill) => (
                  <button
                    key={skill.name}
                    className="group px-5 py-3 bg-background/50 hover:bg-background border-2 border-foreground/30 hover:border-foreground/60 rounded-xl transition-all cursor-pointer flex items-center gap-3 active:scale-95"
                  >
                    <span className="text-lg font-bold text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all">
                      {skill.icon}
                    </span>
                    <span className="text-sm font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Download Resume Button */}
          <div className="mt-12">
            <button 
              onClick={handleDownloadResume}
              className="group flex items-center gap-3 px-8 py-4 bg-foreground hover:bg-foreground/90 text-background rounded-xl transition-all active:scale-95 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
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
              <span className="text-sm font-semibold">
                Download Resume
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



