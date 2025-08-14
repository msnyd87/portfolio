# Quick Manual Upload - Skip Git Issues

Since Git authentication is having persistent issues, here's the fastest way to get your portfolio online:

## 1. Go to Your Empty Portfolio Repo
Visit: https://github.com/matthewsnyder263/portfolio

## 2. Upload Key Files
Click "uploading an existing file" and drag these files:

**Essential files to upload:**
- package.json (dependencies)
- vercel.json (deployment config)
- README.md (description)
- tsconfig.json (TypeScript config)

**Then create folders with "Create new file":**
- Type `server/index.ts` → paste content → commit
- Type `client/src/pages/portfolio.tsx` → paste content → commit
- Type `shared/schema.ts` → paste content → commit

## 3. Deploy to Vercel
Once files are on GitHub:
1. Go to vercel.com
2. Import your portfolio repository
3. Add environment variable: `RESEND_API_KEY` = `re_RQzu1YsA_BfbZNr92fD5XTRJspkU9e3rJ`
4. Deploy

Your contact form will work immediately!

## Files Content Ready
I can show you the exact content of each file to copy/paste if needed.