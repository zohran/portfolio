import { readProfile } from '@/lib/readProfile';
import { readProjects } from '@/lib/readProjects';
import { readEducation } from '@/lib/readEducation';
import { readExperience } from '@/lib/readExperience';
import ProfileSection from '@/components/ProfileSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectList from '@/components/ProjectList';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const profile = readProfile();
  const projects = readProjects();
  const education = readEducation();
  const experience = readExperience();

  const allProjects = projects;

  return (
    <>
      <ProfileSection profile={profile} />
      <AboutSection profile={profile} />
      <EducationSection education={education} />
      <ExperienceSection experience={experience} />
      <section id="portfolio" className="py-24 md:py-32 bg-muted relative overflow-hidden">
        {/* Background image effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-foreground/5" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block border-2 border-foreground px-6 py-2 mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
              Portfolio
            </h2>
          </div>
          <ProjectList projects={allProjects} />
        </div>
      </section>
      <ContactSection />
    </>
  );
}

