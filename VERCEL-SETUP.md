# Deploy to Vercel (Free) - Working Contact Form

## Quick Setup (5 minutes)

1. **Push to GitHub:**
   ```bash
   cd github-deploy
   git remote add origin https://github.com/matthewsnyder263/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign up" (use your GitHub account)
   - Click "Import Git Repository"  
   - Select your portfolio repository
   - Click "Deploy"

3. **Add your email API key:**
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Environment Variables"
   - Add: `RESEND_API_KEY` = `your_resend_key_here`
   - Click "Redeploy"

4. **Done!** Your contact form will work perfectly.

## Result:
- Your portfolio gets a URL like: `your-portfolio.vercel.app`
- Contact form sends real emails to msnyd87@gmail.com
- Free forever (Vercel free tier)
- Automatic updates when you push to GitHub

## Optional: Custom Domain
If you want to keep using your matthewsnyder263.github.io domain:
- In Vercel: Settings → Domains → Add matthewsnyder263.github.io
- In GitHub: Settings → Pages → Custom domain → point to Vercel

Your contact form will be working in about 5 minutes!