# GitHub Pages + Contact Form Issue

## Problem
GitHub Pages only serves static files and cannot run Node.js servers. Your contact form needs a backend API to process submissions and send emails.

## Solutions

### Option 1: Deploy to Vercel (Recommended - Free & Easy)
1. **Create Vercel account** at [vercel.com](https://vercel.com)
2. **Connect your GitHub repository**
3. **Add environment variable**: `RESEND_API_KEY` = your key
4. **Auto-deploy** - Vercel handles both frontend and backend
5. **Custom domain** (optional): Point your domain to Vercel instead of GitHub Pages

**Pros**: 
- Free tier available
- Automatic deployments from GitHub
- Handles both static files and API routes
- Easy custom domain setup

### Option 2: Keep GitHub Pages + Use Netlify Functions
1. **Deploy frontend** to GitHub Pages (current setup)
2. **Create Netlify account** for serverless functions
3. **Set up contact form handler** as Netlify function
4. **Update form** to post to Netlify function URL

### Option 3: Client-Side Email Service (Quick Fix)
Replace server-side email with a service like:
- **Formspree** (free tier: 50 submissions/month)
- **EmailJS** (free tier: 200 emails/month)  
- **Netlify Forms** (if you switch to Netlify)

## Recommended: Vercel Deployment

Since your site is already working perfectly, the easiest fix is to deploy the full-stack app to Vercel:

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Import Git Repository"
3. Connect your GitHub account and select your portfolio repo
4. Add environment variable: `RESEND_API_KEY`
5. Deploy - your contact form will work immediately!

Then you can either:
- Use Vercel's domain (yoursite.vercel.app)
- Point your custom domain to Vercel instead of GitHub Pages