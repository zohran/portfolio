import { readFileSync } from 'fs';
import { join } from 'path';

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  thumbnails: string[];
  repoLink: string;
  demoLink: string;
  featured: boolean;
}

export function readProjects(): Project[] {
  const filePath = join(process.cwd(), 'data', 'projects.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function readProjectById(id: string): Project | null {
  const projects = readProjects();
  return projects.find(project => project.id === id) || null;
}



