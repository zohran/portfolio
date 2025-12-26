interface Skill {
  name: string;
  icon: string;
}

interface SkillsSectionProps {
  skills: {
    usingNow: Skill[];
    learning: Skill[];
    other: Skill[];
  };
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const SkillGrid = ({ items, title }: { items: Skill[]; title: string }) => (
    <div className="mb-12">
      {/* <h3 className="text-lg font-bold text-foreground/80 mb-6 uppercase tracking-wide">
        {title}
      </h3> */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center text-center p-6 bg-muted/50 hover:bg-muted transition-colors border border-border/30"
          >
            <div className="w-16 h-16 mb-4 bg-background flex items-center justify-center text-foreground/80 font-bold text-lg border border-border/30">
              {skill.icon}
            </div>
            <span className="text-sm font-medium text-foreground/70">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block border-2 border-foreground px-6 py-2 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
              Skills
            </h2>
          </div>

          <SkillGrid items={skills.usingNow} title="Using Now:" />
          {/* <SkillGrid items={skills.learning} title="Learning:" /> */}
          {/* <SkillGrid items={skills.other} title="Other Skills:" /> */}
        </div>
      </div>
    </section>
  );
}

