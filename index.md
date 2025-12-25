---
layout: default
readme_path: "README.md"
page_url: "/"
edit_url: "https://github.com/lukehefson/github-readme-theme/edit/main/README.md"
title: "github-readme-theme"
breadcrumb:
  - title: "github-readme-theme"
    url: "/"
---

# GitHub README Theme

A reusable Jekyll theme that automatically converts your GitHub repository's `README.md` files into a beautiful, GitHub-style documentation site with automatic navigation.

## What It Does

This theme scans your repository for all `README.md` files and creates a documentation website where:
- Each directory with a README becomes a page
- Navigation sidebar automatically shows your directory structure
- Styling matches GitHub's markdown rendering
- Edit buttons link directly to GitHub's edit interface
- Works with nested directories of any depth

## Features

- 🎨 Matches GitHub's markdown styling exactly
- 📁 Automatic navigation tree from README files
- 🔄 Collapsible sidebar with localStorage persistence
- 🍞 Breadcrumb navigation
- ✏️ Direct edit links to GitHub
- 🚀 Automatic deployment via GitHub Actions
- 🌐 Supports custom domains
- 📱 Responsive design

## Prerequisites

Before you begin, make sure you have:

- A GitHub repository with at least one `README.md` file
- Node.js 18+ installed (for the generator script)
- Ruby 3.2+ and Bundler installed (for Jekyll)
- Basic familiarity with Git and GitHub

## Installation

### Step 1: Copy Theme Files to Your Repository

You have two options:

**Option A: Use the Copy Script (Recommended)**

If you have this theme repository locally:

1. First, clone or navigate to your target repository (the one you want to apply the theme to):
   ```bash
   git clone https://github.com/your-username/your-repo.git
   # or if already cloned, just note the path
   ```

2. Then, from the theme repository, run the copy script:
   ```bash
   cd /path/to/github-readme-theme
   ./copy-to-repo.sh /path/to/your-repo
   ```
   
   The script will copy all theme files to your target repository. You don't need to be inside the target repo - just provide its path.

**Option B: Manual Copy**

Copy these files and directories to your repository:

```
_config.yml
_layouts/
_includes/
assets/
scripts/
.github/workflows/
Gemfile
package.json
.gitignore (or merge with your existing one)
```

### Step 2: Install Dependencies

Navigate to your repository and install dependencies:

```bash
cd /path/to/your-repo
npm install
bundle install
```

This will create:
- `package-lock.json` (for npm)
- `Gemfile.lock` (for Ruby gems)

**Important:** Commit these lock files to your repository for consistent builds:

```bash
git add package-lock.json Gemfile.lock
git commit -m "Add dependency lock files"
```

### Step 3: Configure Your Repository

Edit `_config.yml` and update these values:

```yaml
# Repository information for edit links
repo_owner: "your-github-username"
repo_name: "your-repo-name"
repo_branch: "main"  # or "master" if that's your default branch

# GitHub Pages configuration
# For project pages (your-repo.github.io/repo-name):
baseurl: "/your-repo-name"
url: "https://your-username.github.io"

# For custom domain (yourdomain.com):
# baseurl: ""
# url: "https://yourdomain.com"
```

**Configuration Options Explained:**

- `repo_owner`: Your GitHub username or organization name
- `repo_name`: The name of your repository
- `repo_branch`: The branch where your README files live (usually `main` or `master`)
- `baseurl`: 
  - For project pages: Set to `"/your-repo-name"` (the repository name)
  - For custom domains: Set to `""` (empty string)
- `url`: 
  - For project pages: `"https://your-username.github.io"`
  - For custom domains: Your custom domain URL

### Step 4: Test Locally (Optional)

Generate the site and test it locally:

```bash
npm run generate
npm run serve
```

This will:
1. Scan your repository for all `README.md` files
2. Generate Jekyll pages from them
3. Start a local server at `http://localhost:4000`

You should see your README files rendered as a documentation site with navigation.

### Step 5: Deploy to GitHub Pages

#### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
4. Save

#### Push Your Changes

Commit and push all the theme files:

```bash
git add .
git commit -m "Add GitHub README Theme"
git push origin main
```

The GitHub Actions workflow will automatically:
1. Run the generator script to find all README files
2. Build the Jekyll site
3. Deploy to GitHub Pages

#### Access Your Site

After deployment completes (usually 1-2 minutes):

- **Project pages:** `https://your-username.github.io/your-repo-name/`
- **Custom domain:** Your configured domain

You can check the deployment status in the **Actions** tab of your repository.

## How It Works

### The Generator Script

The `scripts/generate-readme-site.mjs` script:

1. **Scans your repository** for all `README.md` files (excluding `node_modules`, `vendor`, `_generated`, etc.)
2. **Generates Jekyll pages** in `_generated/` and at the root:
   - Each README becomes an `index.md` file in its directory
   - Adds Jekyll front matter with metadata (breadcrumbs, edit URLs, etc.)
3. **Creates navigation data** in `_data/nav.json`:
   - Only includes directories that contain README files
   - Builds a hierarchical tree structure

### URL Structure

- `/` → Root `README.md`
- `/<directory>/` → `<directory>/README.md`
- `/<directory>/<subdirectory>/` → `<directory>/<subdirectory>/README.md`

Directory names with spaces are automatically URL-encoded.

### Navigation Rules

- **Only directories with READMEs appear** in the navigation sidebar
- Navigation tree is built recursively
- Items are sorted alphabetically
- Clicking a directory expands it (if it has children) or navigates to its README

## Custom Domain Setup

If you want to use a custom domain (e.g., `docs.yourdomain.com`):

1. **Update `_config.yml`:**
   ```yaml
   baseurl: ""
   url: "https://docs.yourdomain.com"
   ```

2. **Configure DNS:**
   - Add a CNAME record pointing to `your-username.github.io`
   - Or add A records for GitHub Pages IPs (see [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

3. **Configure in GitHub:**
   - Go to Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS" (recommended)

4. **Commit and push** the `_config.yml` changes

## Project Structure

```
your-repo/
├── _config.yml              # Jekyll configuration (edit this!)
├── _layouts/
│   └── default.html        # Main layout template
├── _includes/
│   ├── sidebar.html        # Navigation sidebar
│   ├── nav_item.html       # Recursive nav item
│   ├── breadcrumb.html     # Breadcrumb navigation
│   └── edit_button.html    # Edit on GitHub button
├── assets/
│   ├── css/
│   │   └── site.css        # Custom styles
│   └── js/
│       └── site.js         # Sidebar toggle logic
├── scripts/
│   └── generate-readme-site.mjs  # Generator script
├── .github/workflows/
│   └── build.yml           # GitHub Actions workflow
├── Gemfile                 # Ruby dependencies
├── package.json            # Node.js dependencies
└── README.md              # Your root README (this file)
```

**Note:** The following are generated automatically and should be in `.gitignore`:
- `_generated/` - Generated Jekyll pages
- `_data/nav.json` - Navigation tree data
- `index.md` files in directories with READMEs
- `_site/` - Built site (for local testing)

## Development Commands

```bash
# Generate site files from READMEs
npm run generate

# Build Jekyll site (generates _site/)
npm run build

# Generate and serve locally
npm run serve
```

## Troubleshooting

### CSS/JavaScript Not Loading

**Problem:** Site loads but styling is broken.

**Solution:** Check your `baseurl` in `_config.yml`:
- For project pages: Must match your repo name (e.g., `"/my-repo"`)
- For custom domains: Should be empty (`""`)

After fixing, commit and push. You may need to do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) to clear browser cache.

### Navigation Shows Wrong Directories

**Problem:** Navigation includes directories like `vendor/` or `node_modules/`.

**Solution:** These should be automatically excluded. If you see them:
1. Check that `vendor/` and `node_modules/` are in your `.gitignore`
2. Verify the generator script is up to date
3. Check the GitHub Actions logs to see what READMEs are being found

### Deployment Fails

**Problem:** GitHub Actions workflow fails.

**Common causes:**
- Missing `package-lock.json` or `Gemfile.lock` - Commit these files
- Ruby version mismatch - The workflow uses Ruby 3.2
- Node version mismatch - The workflow uses Node 20

Check the Actions tab for specific error messages.

### Edit Button Links Are Wrong

**Problem:** Edit button goes to wrong URL or 404s.

**Solution:** Verify `repo_owner`, `repo_name`, and `repo_branch` in `_config.yml` match your repository exactly.

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit issues or pull requests.
