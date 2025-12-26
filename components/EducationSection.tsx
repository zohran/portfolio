import { Education } from '@/lib/readEducation';

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-16 xs:py-20 sm:py-24 md:py-32 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-48 h-48 xs:w-64 xs:h-64 sm:w-72 sm:h-72 bg-foreground/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-2.5 xs:px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="inline-block mb-6 xs:mb-8 sm:mb-10 md:mb-12 group">
            <div className="border-2 border-foreground px-3 xs:px-4 sm:px-5 md:px-6 py-1 xs:py-1.5 sm:py-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight leading-tight">
                Education
              </h2>
            </div>
          </div>

          {/* Education cards */}
          <div className="space-y-5 xs:space-y-6 sm:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="group p-3 xs:p-4 sm:p-6 md:p-8 rounded-lg xs:rounded-xl sm:rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/20 hover:border-foreground/40 hover:bg-background/70 transition-all hover:shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 xs:mb-4 sm:mb-5 md:mb-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 border-b border-border/30">
                  <div className="flex-1 mb-2.5 xs:mb-3 sm:mb-4 md:mb-0">
                    <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 xs:mb-1.5 sm:mb-2 group-hover:text-foreground transition-colors leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-foreground/80 font-semibold text-xs xs:text-sm sm:text-base md:text-lg leading-snug">{edu.institute}</p>
                  </div>
                  <div className="px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 bg-foreground/10 rounded-md xs:rounded-lg border border-foreground/20 inline-block self-start">
                    <p className="text-foreground/80 text-[10px] xs:text-xs sm:text-sm font-semibold whitespace-nowrap">{edu.year}</p>
                  </div>
                </div>

                {/* Subjects */}
                {edu.subjects && edu.subjects.length > 0 && (
                  <div className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
                    <h4 className="text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground/80 mb-2 xs:mb-3 sm:mb-4 uppercase tracking-wider">
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                      {edu.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 bg-muted/50 hover:bg-muted border border-border/40 text-foreground/80 hover:text-foreground text-[10px] xs:text-xs sm:text-sm font-medium rounded-md xs:rounded-lg transition-all cursor-default"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {edu.projects && edu.projects.length > 0 && (
                  <div>
                    <h4 className="text-[10px] xs:text-xs sm:text-sm font-semibold text-foreground/80 mb-2 xs:mb-3 sm:mb-4 uppercase tracking-wider">
                      Notable Projects
                    </h4>
                    <ul className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                      {edu.projects.map((project, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-1.5 xs:gap-2 sm:gap-3 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <span className="text-foreground/60 mt-0.5 xs:mt-1 sm:mt-1.5 flex-shrink-0 text-xs">▸</span>
                          <span className="text-[10px] xs:text-xs sm:text-sm leading-relaxed">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
