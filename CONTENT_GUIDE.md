# Content Management Guide

This portfolio website is designed to be easily customizable through JSON files. All content updates can be made by editing files in the `/data` directory.

## Updating Your Profile

Edit `/data/profile.json`:

```json
{
  "name": "Your Full Name",
  "title": "Your Professional Title",
  "description": "Your professional summary",
  "strengths": ["Skill 1", "Skill 2", "Skill 3"],
  "profileImage": "/images/profile.svg"
}
```

**Profile Image**: Replace `/public/images/profile.svg` with your own image (JPG, PNG, or SVG). Update the `profileImage` path in the JSON if using a different filename.

## Adding/Editing Projects

Edit `/data/projects.json`:

```json
{
  "id": "unique-project-slug",
  "name": "Project Name",
  "shortDescription": "Brief overview (shown in cards)",
  "description": "Detailed description (shown on project page)",
  "techStack": ["Technology 1", "Technology 2"],
  "thumbnail": "/images/projects/your-image.svg",
  "repoLink": "https://github.com/yourusername/project",
  "demoLink": "https://your-demo-url.com",
  "featured": true
}
```

**Project Images**: Add your project thumbnails to `/public/images/projects/` and reference them in the `thumbnail` field.

## Managing Education

Edit `/data/education.json`:

```json
{
  "degree": "Degree Name",
  "institute": "Institution Name",
  "year": "Start Year - End Year"
}
```

## Updating Social Links

Edit `/data/socialLinks.json`:

```json
{
  "email": "your.email@example.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "stackoverflow": "https://stackoverflow.com/users/yourid"
}
```

## Image Guidelines

- **Profile Image**: Recommended size 400x400px or larger (square)
- **Project Thumbnails**: Recommended size 800x600px or larger (16:9 or 4:3 ratio)
- Supported formats: JPG, PNG, SVG, WebP
- Place images in `/public/images/` or `/public/images/projects/`

## After Making Changes

1. Save your JSON files
2. The changes will be reflected immediately in development mode
3. For production, rebuild the site: `npm run build`

## Notes

- All JSON files must be valid JSON (use a JSON validator if needed)
- Image paths should start with `/images/` (they're served from the `/public` folder)
- Project IDs should be URL-friendly (lowercase, hyphens instead of spaces)
- The `featured` field determines which projects appear on the homepage



