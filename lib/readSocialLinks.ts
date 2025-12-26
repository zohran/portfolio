import { readFileSync } from 'fs';
import { join } from 'path';

export interface SocialLinks {
  email: string;
  linkedin?: string;
  github?: string;
  stackoverflow?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export function readSocialLinks(): SocialLinks {
  const filePath = join(process.cwd(), 'data', 'socialLinks.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}



