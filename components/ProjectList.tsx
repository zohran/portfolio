import { Project } from '@/lib/readProjects';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  featuredOnly?: boolean;
}

export default function ProjectList({
  projects,
  featuredOnly = false,
}: ProjectListProps) {
  const displayProjects = featuredOnly
    ? projects.filter((p) => p.featured)
    : projects;

  if (displayProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/60">No projects found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2.5 xs:gap-3 sm:gap-4 mb-5 xs:mb-6 sm:mb-8">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="text-center text-foreground/60 text-xs xs:text-sm sm:text-base md:text-lg px-2.5 xs:px-3">
        And many more to come!
      </p>
    </>
  );
}

