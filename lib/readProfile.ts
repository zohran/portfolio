import { readFileSync } from 'fs';
import { join } from 'path';

export interface Profile {
  name: string;
  title: string;
  description: string;
  strengths: string[];
  profileImage: string;
}

export function readProfile(): Profile {
  const filePath = join(process.cwd(), 'data', 'profile.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}



