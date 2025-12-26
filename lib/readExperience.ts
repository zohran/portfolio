import { readFileSync } from 'fs';
import { join } from 'path';

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

export function readExperience(): Experience[] {
  const filePath = join(process.cwd(), 'data', 'experience.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

