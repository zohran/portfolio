import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/readProjects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Use first thumbnail or fallback to dummy image
  const thumbnail = project.thumbnails && project.thumbnails.length > 0 
    ? project.thumbnails[0] 
    : `https://picsum.photos/seed/${project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)}/600/600`;
  
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block relative overflow-hidden bg-muted aspect-square"
    >
      {/* Background Image */}
      <Image
        src={thumbnail}
        alt={project.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
        unoptimized
      />
      {/* Description overlay - always visible */}
      <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
        <div className="text-center p-2.5 xs:p-3 sm:p-4">
          <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 xs:mb-1.5 sm:mb-2 uppercase px-1.5 xs:px-2 leading-tight">
            {project.name}
          </h3>
          <p className="text-foreground/70 text-[10px] xs:text-xs sm:text-sm px-1.5 xs:px-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}

