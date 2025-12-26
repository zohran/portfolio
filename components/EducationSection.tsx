import { Education } from '@/lib/readEducation';

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 md:py-32 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-foreground/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="inline-block mb-12 group">
            <div className="border-2 border-foreground px-6 py-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="relative text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
                Education
              </h2>
            </div>
          </div>

          {/* Education cards */}
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-foreground/20 hover:border-foreground/40 hover:bg-background/70 transition-all hover:shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 pb-6 border-b border-border/30">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-foreground transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-foreground/80 font-semibold text-lg">{edu.institute}</p>
                  </div>
                  <div className="px-4 py-2 bg-foreground/10 rounded-lg border border-foreground/20 inline-block">
                    <p className="text-foreground/80 text-sm font-semibold">{edu.year}</p>
                  </div>
                </div>

                {/* Subjects */}
                {edu.subjects && edu.subjects.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">
                      Key Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border/40 text-foreground/80 hover:text-foreground text-sm font-medium rounded-lg transition-all cursor-default"
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
                    <h4 className="text-sm font-semibold text-foreground/80 mb-4 uppercase tracking-wider">
                      Notable Projects
                    </h4>
                    <ul className="space-y-3">
                      {edu.projects.map((project, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <span className="text-foreground/60 mt-1.5">▸</span>
                          <span className="text-sm leading-relaxed">{project}</span>
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
