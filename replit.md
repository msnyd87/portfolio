# Personal Portfolio Website

## Project Overview
A responsive freelance developer portfolio website built with React/TypeScript and Tailwind CSS. Features a modern dark theme design, hero section, projects showcase, and working contact form.

## Architecture
- **Frontend**: React with TypeScript, Wouter routing, Tailwind CSS styling
- **Backend**: Express.js with in-memory storage for contact form submissions
- **UI Components**: Shadcn/ui components with Radix UI primitives
- **Styling**: Custom dark theme with gradient accents and smooth animations
- **State Management**: TanStack Query for API calls and form handling

## Key Features
- Modern dark theme with blue/violet gradient accents
- Responsive navigation with mobile menu
- Hero section with developer profile and call-to-action buttons
- Featured projects grid with tech stack badges
- Working contact form with backend integration
- Smooth scroll navigation and hover animations

## Project Structure
- `client/src/pages/portfolio.tsx` - Main portfolio component (single-file approach)
- `server/routes.ts` - API routes for contact form
- `shared/schema.ts` - Data models and validation schemas
- `server/storage.ts` - In-memory storage for contact messages

## User Preferences
- Prefers simple, everyday language explanations
- Wants to showcase real projects and professional experience
- Values clean, professional portfolio presentation

## Recent Changes (August 4, 2025)
- **Personal Information Updated**: Changed from Alex Chen to Matt Snyder with title "Full-Stack Developer"  
- **Bio Updated**: Added Matt's authentic background story emphasizing his path from operational leadership and government service to software engineering, with mission to solve real-world problems
- **GitHub Links Fixed**: All project links now point to actual GitHub repositories instead of portfolio URL
- **Real Projects Added**: Replaced 6 sample projects with Matt's actual GitHub repositories:
  1. Halfway - MBTI Dating App (React, FastAPI, PostgreSQL)
  2. WTO Alert Filter (Python automation tool)
  3. CarCar - Auto Management System (React, Django, Docker)
  4. Task Management System (Django, Python)
  5. Scrumptious Recipes (Django recipe app)
  6. Conference Management System (Django, React)
- **Contact Details Updated**: 
  - Email: msnyd87@gmail.com
  - Phone: +1 (323) 844-3638
  - Location: Sparks, NV
- **Social Links Updated**: Reduced to GitHub and LinkedIn only (commented out GitLab and old portfolio)
- **Email Integration**: Successfully integrated Resend API for working contact form
- **Server Fix (Aug 4, 2025)**: Restored missing server directory and files, fixed startup issues, confirmed contact form working
- **GitHub Deployment**: **COMPLETED** - Portfolio successfully deployed to https://matthewsnyder263.github.io/ with working FormSubmit.co contact integration (Updated Aug 4, 2025)
- **Deployment Fix (Aug 4, 2025)**: Resolved git conflicts and 405 errors by creating clean HTML deployment with FormSubmit.co contact form, eliminating React build issues
- **Replit Cleanup**: Removed all Replit-specific dependencies and references for clean deployment

## Architecture Notes
- All projects link to Matt's actual GitHub repositories
- Portfolio successfully deployed and live on GitHub Pages
- Contact form fully functional with FormSubmit.co email delivery (tested and working)
- Clean deployment package created without Replit dependencies
- Maintained responsive design and animations
- Production-ready with comprehensive documentation
- Form submission redirects back to portfolio instead of external thank you page