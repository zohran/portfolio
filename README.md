# Portfolio Website

A modern, self-managed portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Light and Dark Mode with system preference detection
- 📱 Fully responsive design
- 🚀 Server-side rendering with Next.js App Router
- 📝 Content managed through local JSON files
- 🔍 SEO-friendly with metadata optimization
- ♿ Accessible UI with semantic HTML

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── projects/          # Projects pages
├── components/             # React components
├── data/                  # JSON data files
│   ├── profile.json
│   ├── projects.json
│   ├── education.json
│   └── socialLinks.json
├── lib/                   # Utility functions
└── public/                # Static assets
    └── images/
```

## Customizing Content

All content is managed through JSON files in the `/data` directory:

- **profile.json**: Personal information and profile details
- **projects.json**: Project listings with details
- **education.json**: Education history
- **socialLinks.json**: Social media and contact links

Simply edit these files to update your portfolio content. Images should be placed in `/public/images/`.

## Building for Production

```bash
npm run build
npm start
```

## License

MIT



