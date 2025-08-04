# Matt Snyder - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Full-Stack Developer. Built with React, TypeScript, and Tailwind CSS with a functional contact form powered by Resend.

## 🚀 Features

- **Modern Design**: Dark theme with blue/violet gradient accents
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scroll navigation with mobile menu
- **Project Showcase**: Featured projects with live demos and GitHub links
- **Working Contact Form**: Email integration using Resend API
- **Performance Optimized**: Fast loading with Vite build system

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Wouter for routing
- React Hook Form with Zod validation
- TanStack Query for API calls
- Shadcn/ui components
- Framer Motion for animations

**Backend:**
- Express.js server
- TypeScript
- Nodemailer for email functionality
- In-memory storage for contact messages

**Build Tools:**
- Vite for development and building
- ESBuild for server bundling
- TypeScript compiler

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/matthewsnyder263/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 🚀 Deployment

### Build for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

### Environment Variables

For production deployment, make sure to set:
- `RESEND_API_KEY`: Your Resend API key for email functionality
- `NODE_ENV=production`: For production optimizations

### Hosting Options

This application can be deployed to:
- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Use their GitHub integration for continuous deployment
- **Railway**: Deploy with their GitHub integration
- **Heroku**: Use git-based deployment
- **VPS/Cloud**: Deploy on any Node.js hosting platform

## 📧 Email Setup

The contact form uses Resend for email delivery:

1. **Create a Resend account** at [resend.com](https://resend.com)
2. **Generate an API key** in your Resend dashboard
3. **Add the API key** to your environment variables as `RESEND_API_KEY`

The system will automatically detect and use the Resend service when the API key is provided.

## 🗂️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions and configs
│   │   └── hooks/         # Custom React hooks
│   └── index.html         # HTML entry point
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── email.ts          # Email service
│   └── storage.ts        # Data storage layer
├── shared/                # Shared types and schemas
│   └── schema.ts         # Zod schemas and TypeScript types
└── attached_assets/      # Static assets (images, etc.)
```

## 🎨 Customization

### Personal Information

Update your personal information in `client/src/pages/portfolio.tsx`:
- Name and title in the hero section
- Bio and professional summary
- Contact details (email, phone, location)
- Social media links

### Projects

Modify the `projects` array in `portfolio.tsx` to showcase your own projects:
```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description...",
    image: "project-image-url",
    techStack: ["React", "Node.js", "MongoDB"],
    projectUrl: "https://your-project.com",
    githubUrl: "https://github.com/yourusername/project"
  },
  // Add more projects...
];
```

### Styling

The color scheme can be customized in `client/src/index.css` by modifying the CSS custom properties:
```css
:root {
  --primary: hsl(207, 90%, 54%);
  --primary-foreground: hsl(211, 100%, 99%);
  /* Modify other color variables... */
}
```

## 📱 Contact Form

The contact form includes:
- Name validation
- Email validation
- Message validation
- Anti-spam measures
- Email delivery confirmation
- Error handling

Messages are stored in memory and sent via email to the configured address.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Matt Snyder**
- Email: msnyd87@gmail.com
- Phone: +1 (323) 844-3638
- Location: Sparks, NV
- LinkedIn: [linkedin.com/in/msnyd87](https://www.linkedin.com/in/msnyd87/)
- GitHub: [github.com/matthewsnyder263](https://github.com/matthewsnyder263/)

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*