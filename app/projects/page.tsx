import { readProjects } from '@/lib/readProjects';
import ProjectList from '@/components/ProjectList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Portfolio',
  description: 'Browse through my portfolio of projects and applications.',
};

export default function ProjectsPage() {
  const projects = readProjects();

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Projects
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          A collection of projects I've worked on, showcasing my skills and
          experience in web development.
        </p>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}



