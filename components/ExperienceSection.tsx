import { Experience } from '@/lib/readExperience';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-foreground/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="inline-block mb-12 group">
            <div className="border-2 border-foreground px-6 py-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="relative text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
                Experience
              </h2>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="group relative pl-10 pb-10 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-foreground/20 group-hover:bg-foreground/40 transition-opacity"></div>
                
                {/* Dot */}
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-foreground border-4 border-background shadow-lg group-hover:scale-125 transition-all"></div>
                
                {/* Content card */}
                <div className="ml-4 p-6 rounded-xl bg-muted/30 backdrop-blur-sm border border-foreground/20 hover:border-foreground/40 hover:bg-muted/50 transition-all group-hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1 mb-3 md:mb-0">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-foreground transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-foreground/80 font-semibold mb-1">{exp.company}</p>
                      <p className="text-foreground/60 text-sm">{exp.location}</p>
                    </div>
                    <div className="px-4 py-2 bg-foreground/10 rounded-lg border border-foreground/20">
                      <p className="text-foreground/80 text-sm font-semibold">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-background/50 hover:bg-background border border-foreground/20 hover:border-foreground/40 text-foreground/80 hover:text-foreground text-xs font-semibold rounded-lg transition-all cursor-default"
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

