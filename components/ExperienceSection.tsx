import { Experience } from '@/lib/readExperience';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 xs:py-20 sm:py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-20 right-0 w-48 h-48 xs:w-64 xs:h-64 sm:w-72 sm:h-72 bg-foreground/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="inline-block mb-6 xs:mb-8 sm:mb-10 md:mb-12 group">
            <div className="border-2 border-foreground px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 sm:py-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
                Experience
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-5 xs:space-y-6 sm:space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="group relative pl-7 xs:pl-8 sm:pl-9 md:pl-10 pb-6 xs:pb-7 sm:pb-8 md:pb-10 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 xs:w-1 bg-foreground/20 group-hover:bg-foreground/40 transition-opacity"></div>
                
                {/* Dot */}
                <div className="absolute -left-2 xs:-left-2.5 sm:-left-3 top-0 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full bg-foreground border-2 xs:border-[3px] sm:border-4 border-background shadow-lg group-hover:scale-125 transition-all"></div>
                
                {/* Content card */}
                <div className="ml-2.5 xs:ml-3 sm:ml-4 p-3 xs:p-4 sm:p-5 md:p-6 rounded-md xs:rounded-lg sm:rounded-xl bg-muted/30 backdrop-blur-sm border border-foreground/20 hover:border-foreground/40 hover:bg-muted/50 transition-all group-hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2.5 xs:mb-3 sm:mb-4">
                    <div className="flex-1 mb-2 xs:mb-2.5 sm:mb-3 md:mb-0">
                      <h3 className="text-base xs:text-lg sm:text-xl font-bold text-foreground mb-0.5 xs:mb-1 group-hover:text-foreground transition-colors leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-foreground/80 font-semibold mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base leading-snug">{exp.company}</p>
                      <p className="text-foreground/60 text-[10px] xs:text-xs sm:text-sm">{exp.location}</p>
                    </div>
                    <div className="px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-foreground/10 rounded-md xs:rounded-lg border border-foreground/20 self-start">
                      <p className="text-foreground/80 text-[10px] xs:text-xs sm:text-sm font-semibold whitespace-nowrap">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-2.5 xs:mb-3 sm:mb-4 leading-relaxed text-xs xs:text-sm sm:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 bg-background/50 hover:bg-background border border-foreground/20 hover:border-foreground/40 text-foreground/80 hover:text-foreground text-[10px] xs:text-xs font-semibold rounded-md xs:rounded-lg transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

