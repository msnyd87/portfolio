# Deployment Guide

How to deploy this portfolio website.

## Deployment Options

### Option 1: GitHub Pages + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/matthewsnyder263/your-portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Add environment variable: `RESEND_API_KEY`
   - Deploy automatically

### Option 2: GitHub Pages (Static Only)

For a static version without the contact form backend:

1. **Build static version:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   - Push the `dist/client` folder to `gh-pages` branch
   - Enable GitHub Pages in repository settings

### Option 3: Railway (Full-Stack)

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add `RESEND_API_KEY` environment variable
   - Deploy with automatic builds

## 📦 Pre-Deployment Checklist

### 1. Clean Up Replit References

Before deploying, replace these files:
- `package.json` → Use `package-clean.json`
- `vite.config.ts` → Use `vite.config-clean.ts`

### 2. Environment Variables

Set up these environment variables on your hosting platform:
```
RESEND_API_KEY=your_resend_api_key
NODE_ENV=production
```

### 3. Domain Configuration

If using a custom domain:
- Update CNAME records
- Configure SSL certificates
- Update any hardcoded URLs

## 🔧 Platform-Specific Setup

### Vercel

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

### Netlify

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist/client"

[build.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Railway

Create `railway.toml`:
```toml
[build]
  builder = "nixpacks"

[deploy]
  startCommand = "npm start"
  healthcheckPath = "/"
  healthcheckTimeout = 100
  restartPolicyType = "always"
```

## 🗂️ Files to Include

Essential files for deployment:
```
├── client/                 # Frontend code
├── server/                 # Backend code
├── shared/                 # Shared types
├── attached_assets/        # Your assets
├── package-clean.json      # Clean dependencies
├── vite.config-clean.ts    # Clean Vite config
├── README.md              # Documentation
├── .gitignore             # Git ignore rules
└── DEPLOYMENT.md          # This guide
```

## 🚫 Files to Exclude

Don't include these Replit-specific files:
- `.replit`
- `replit.nix`
- `replit.md`
- Original `package.json` (use clean version)
- Original `vite.config.ts` (use clean version)

## 🔍 Final Testing

Before going live:

1. **Test locally:**
   ```bash
   npm run build
   npm start
   ```

2. **Test contact form:**
   - Submit a test message
   - Verify email delivery
   - Check error handling

3. **Test responsive design:**
   - Mobile devices
   - Tablet layouts
   - Desktop resolutions

4. **Performance check:**
   - Load time optimization
   - Asset compression
   - SEO validation

## 🔄 Replacing Your Current GitHub Pages

1. **Backup current site:**
   ```bash
   git clone https://github.com/matthewsnyder263/matthewsnyder263.github.io.git backup-old-site
   ```

2. **Replace with new portfolio:**
   ```bash
   # In your old repository
   rm -rf * # Remove old files
   cp -r /path/to/new-portfolio/* . # Copy new files
   git add .
   git commit -m "Replace with new React portfolio"
   git push
   ```

3. **Update repository settings:**
   - Enable GitHub Pages if needed
   - Configure custom domain
   - Update repository description

## 🆘 Troubleshooting

### Common Issues:

1. **Build failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

2. **Email not working:**
   - Verify `RESEND_API_KEY` is set correctly
   - Check Resend dashboard for delivery status
   - Test API key with curl request

3. **Assets not loading:**
   - Check asset paths in production
   - Verify build process includes all assets
   - Update import paths if necessary

Need help? Contact: msnyd87@gmail.com