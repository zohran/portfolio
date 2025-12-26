import { readFileSync } from 'fs';
import { join } from 'path';

export interface Education {
  degree: string;
  institute: string;
  year: string;
  subjects?: string[];
  projects?: string[];
}

export function readEducation(): Education[] {
  const filePath = join(process.cwd(), 'data', 'education.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}



