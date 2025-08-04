# Push Your Portfolio to GitHub

Since GitHub requires authentication, here's the easiest way to get your code uploaded:

## Option 1: Download and Upload (Easiest)

1. **Download your code:**
   - In the file explorer (left panel), right-click on `github-deploy` folder
   - Select "Download as ZIP"
   - Extract the ZIP on your computer

2. **Upload to GitHub:**
   - Go to [github.com](https://github.com) and create new repository called `portfolio`
   - Click "uploading an existing file"
   - Drag all the extracted files into GitHub
   - Commit with message "Portfolio with working contact form"

## Option 2: GitHub CLI (if you have it)

```bash
# Install GitHub CLI first, then:
gh auth login
git remote add origin https://github.com/matthewsnyder263/portfolio.git
git push -u origin main
```

## Option 3: Personal Access Token

1. **Create token:** GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. **Use token as password:**
   ```bash
   git remote add origin https://github.com/matthewsnyder263/portfolio.git
   git push -u origin main
   # When prompted for password, use your token instead
   ```

## After Upload → Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable: `RESEND_API_KEY` = `re_RQzu1YsA_BfbZNr92fD5XTRJspkU9e3rJ`
4. Deploy

Your contact form will work immediately!