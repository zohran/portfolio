import skillsData from '@/data/skills.json';

export interface Skill {
  name: string;
  icon: string;
}

export interface Skills {
  usingNow: Skill[];
  learning: Skill[];
  other: Skill[];
}

export function readSkills(): Skills {
  return skillsData as Skills;
}



