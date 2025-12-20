# Testing Guide for repo-name

This guide walks you through testing the GitHub README Theme with your repository: https://github.com/lukehefson/repo-name

## Step 1: Clone Your Repository

```bash
git clone https://github.com/lukehefson/repo-name.git
cd repo-name
```

## Step 2: Copy Theme Files to Your Repo

You have two options:

### Option A: Copy files manually
Copy all the theme files from this project into your `repo-name` directory:
- `_config.yml`
- `_layouts/`
- `_includes/`
- `assets/`
- `scripts/`
- `.github/workflows/`
- `Gemfile`
- `package.json`
- `.gitignore`

### Option B: Use a script (recommended)
From the theme project directory, run:
```bash
# Create a script to copy files
rsync -av --exclude='.git' --exclude='node_modules' --exclude='_site' --exclude='_generated' --exclude='docs' --exclude='PLAN.md' --exclude='TESTING_GUIDE.md' /Users/lukehefson/Projects/github-readme-theme/ /path/to/repo-name/
```

## Step 3: Update Configuration

Edit `_config.yml` in your repo-name directory:

```yaml
repo_owner: "lukehefson"
repo_name: "repo-name"
repo_branch: "main"
```

## Step 4: Install Dependencies

```bash
# Install Node.js dependencies (if needed)
npm install

# Install Ruby dependencies
bundle install
```

## Step 5: Test Locally

```bash
# Generate the site files
npm run generate

# Serve locally (will be available at http://localhost:4000)
npm run serve
```

You should see:
- Your root README.md rendered at `/`
- The nested directory "Name of a nested directory" in the sidebar
- Navigation working correctly
- Edit buttons linking to GitHub

## Step 6: Verify Generated Files

After running `npm run generate`, check:
- `_generated/index.md` exists (root README)
- `_generated/Name of a nested directory/index.md` exists (if that directory has a README)
- `_data/nav.json` contains the navigation tree

## Step 7: Deploy to GitHub Pages

1. **Enable GitHub Pages** in your repo settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add GitHub README Theme"
   git push origin main
   ```

3. **Monitor the workflow**:
   - Go to Actions tab in your repo
   - Watch the "Build and Deploy" workflow run
   - Once complete, your site will be live at: `https://lukehefson.github.io/repo-name/`

## Expected Results

Based on your repo structure, you should see:
- **Root page** (`/`): Your comprehensive README with all markdown examples
- **Navigation sidebar**: Shows "repo-name" as root, and "Name of a nested directory" if it contains a README
- **Breadcrumbs**: Shows current location
- **Edit buttons**: Link to edit the README on GitHub

## Troubleshooting

### Generator script fails
- Make sure Node.js 18+ is installed: `node --version`
- Check that all theme files were copied correctly

### Jekyll build fails
- Make sure Ruby and Bundler are installed
- Run `bundle install` to install Jekyll dependencies

### Navigation not showing
- Check that `_data/nav.json` was generated
- Verify README files exist in the directories you expect

### GitHub Pages not deploying
- Check Actions tab for workflow errors
- Ensure GitHub Pages is enabled in Settings → Pages
- Verify the workflow has the correct permissions

## Quick Test Command

To quickly test everything:
```bash
npm run generate && npm run serve
```

Then open http://localhost:4000 in your browser.

