#!/bin/bash

# Script to prepare portfolio for GitHub deployment
echo "🚀 Preparing portfolio for GitHub deployment..."

# Create deployment directory
mkdir -p github-deploy
cd github-deploy

# Copy essential files
echo "📁 Copying project files..."
cp -r ../client ./
cp -r ../server ./
cp -r ../shared ./
cp -r ../attached_assets ./

# Copy configuration files
cp ../package-clean.json ./package.json
cp ../vite.config-clean.ts ./vite.config.ts
cp ../tsconfig.json ./
cp ../tailwind.config.ts ./
cp ../postcss.config.js ./
cp ../components.json ./
cp ../drizzle.config.ts ./

# Copy documentation
cp ../README.md ./
cp ../DEPLOYMENT.md ./
cp ../.gitignore ./

# Remove Replit-specific files
echo "🧹 Cleaning up Replit references..."
rm -f .replit
rm -f replit.nix
rm -f replit.md

# Create environment example
echo "📝 Creating environment template..."
cat > .env.example << EOF
# Resend API Key for contact form
RESEND_API_KEY=your_resend_api_key_here

# Optional: Alternative email services
# MAILGUN_API_KEY=your_mailgun_api_key
# MAILGUN_DOMAIN=your_mailgun_domain

# Production environment
NODE_ENV=production
EOF

# Create quick setup script
cat > setup.sh << 'EOF'
#!/bin/bash
echo "🚀 Setting up Matt Snyder Portfolio..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Please create a .env file based on .env.example"
    echo "   Add your RESEND_API_KEY for email functionality"
    cp .env.example .env
fi

echo "✅ Setup complete!"
echo "📖 Run 'npm run dev' to start development server"
echo "🏗️  Run 'npm run build' to build for production"
EOF

chmod +x setup.sh

echo "✅ GitHub deployment package ready in ./github-deploy/"
echo ""
echo "Next steps:"
echo "1. cd github-deploy"
echo "2. git init && git add . && git commit -m 'Initial portfolio'"
echo "3. Push to your GitHub repository"
echo "4. Deploy to Vercel, Netlify, or Railway"