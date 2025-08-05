# Portfolio Website

Personal portfolio built with React and TypeScript. Features a contact form that actually works and showcases real projects.

## What it is

- React frontend with TypeScript
- Express backend for the contact form
- Tailwind for styling
- Contact form sends emails via Resend API
- Responsive design that works on mobile

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- Wouter (lightweight router)
- React Hook Form + Zod validation
- TanStack Query for API calls
- Shadcn/ui components

**Backend:**
- Express.js
- Resend for email sending
- In-memory storage (no database needed)

## Setup

```bash
git clone [your-repo]
cd portfolio-website
npm install
```

Create `.env` file:
```
RESEND_API_KEY=your_api_key_here
```

Run it:
```bash
npm run dev
```

Visits `http://localhost:5000`

## Deployment

**Note:** GitHub Pages won't work because it can't run the Node.js server for the contact form.

**Use Vercel instead:**
1. Push to GitHub
2. Connect repo to Vercel
3. Add `RESEND_API_KEY` environment variable
4. Deploy

**Or build locally:**
```bash
npm run build
npm start
```

## Email Setup

Contact form uses Resend:
1. Sign up at resend.com
2. Get your API key
3. Add it to `.env` as `RESEND_API_KEY`

Form will send emails to the address hardcoded in `server/email.ts`.

## Project Structure

```
client/src/pages/portfolio.tsx  # Main portfolio page (everything in one file)
server/                         # Express backend
├── index.ts                   # Server setup
├── routes.ts                  # API routes
├── email.ts                   # Email sending logic
└── storage.ts                 # In-memory storage
shared/schema.ts               # TypeScript types and validation
```

Most of the frontend is in one file (`portfolio.tsx`) to keep it simple

## Customizing

**Personal info:** Edit the constants at the top of `portfolio.tsx`

**Projects:** Update the `projects` array in `portfolio.tsx`

**Colors:** Modify CSS variables in `client/src/index.css`

**Email recipient:** Change the email address in `server/email.ts`

## Notes

- Contact form validates with Zod and stores messages in memory
- Uses React Hook Form for form handling
- Responsive design works on mobile
- Single-page app with smooth scrolling navigation

## License

MIT
