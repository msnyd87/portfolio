# Manual GitHub Upload Instructions

Since Git authentication is having issues, here's how to manually upload your portfolio:

## Step 1: Create Repository on GitHub
1. Go to https://github.com/matthewsnyder263
2. Click "New repository"
3. Name: `portfolio`
4. Keep it public
5. Don't initialize with README
6. Click "Create repository"

## Step 2: Upload Key Files
GitHub will show an empty repo. Click "uploading an existing file" and upload these files:

### Essential Files to Upload:

**Root Level:**
- `package.json`
- `package-lock.json` 
- `vercel.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `README.md`

**Create Folders and Upload:**
- `server/` folder → upload all files from github-deploy/server/
- `client/` folder → upload all files from github-deploy/client/
- `shared/` folder → upload all files from github-deploy/shared/

## Step 3: Deploy to Vercel
1. Go to https://vercel.com
2. Import from GitHub: `matthewsnyder263/portfolio`
3. Add environment variable:
   - Name: `RESEND_API_KEY`
   - Value: `re_RQzu1YsA_BfbZNr92fD5XTRJspkU9e3rJ`
4. Deploy!

Your contact form will work immediately once deployed to Vercel.

## Alternative: Copy File Contents
If upload doesn't work, you can copy/paste file contents into GitHub's web editor:
1. Click "Create new file" 
2. Type filename (e.g., `package.json`)
3. Copy content from here and paste into GitHub
4. Commit each file

Would you like me to show you the contents of each key file?