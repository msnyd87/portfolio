# Setting Up GitHub Token in Replit

## Method 1: Using Replit Secrets (Recommended)
1. Go to Replit Sidebar → Tools → Secrets
2. Create a new secret:
   - Key: `GIT_URL`
   - Value: `https://matthewsnyder263:YOUR_TOKEN@github.com/matthewsnyder263/portfolio.git`

Then use: `git push $GIT_URL`

## Method 2: Replit Git Integration
1. Replit Sidebar → Version Control (Git icon)
2. Click "Connect to GitHub" or "Manage GitHub Connection"
3. Paste your token when prompted

## Your GitHub Token
If you have your token ready, I can help you set it up using Method 1 (Secrets) which is more secure.

## Generate New Token (if needed)
Go to: https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Name: "Replit Portfolio"
- Select: `repo` (full access)
- Generate and copy the token