# GitHub README Theme

A reusable Jekyll theme that renders a GitHub repository's `README.md` files as a clean, GitHub-style documentation site with navigation.

## Features

- 🎨 Matches GitHub's markdown styling
- 📁 Automatic navigation tree from README files
- 🔄 Collapsible sidebar with localStorage persistence
- 🍞 Breadcrumb navigation
- ✏️ Direct edit links to GitHub
- 🚀 Built via GitHub Actions

## Quick Start

1. **Configure your repository** in `_config.yml`:
   ```yaml
   repo_owner: "your-username"
   repo_name: "your-repo"
   repo_branch: "main"
   ```

2. **Generate the site**:
   ```bash
   npm run generate
   ```

3. **Build and serve locally** (optional):
   ```bash
   npm run serve
   ```

4. **Deploy**: Push to GitHub and the Actions workflow will build and deploy to GitHub Pages.

## Project Structure

```
/
├── _config.yml              # Jekyll configuration
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
└── .github/workflows/
    └── build.yml           # GitHub Actions workflow
```

## How It Works

1. **Generator Script** (`scripts/generate-readme-site.mjs`):
   - Scans the repository for all `README.md` files
   - Generates Jekyll pages in `_generated/` with proper front matter
   - Creates `_data/nav.json` for navigation tree

2. **Jekyll Theme**:
   - Renders generated pages using the default layout
   - Displays navigation sidebar, breadcrumbs, and edit buttons
   - Applies GitHub markdown styling

3. **GitHub Actions**:
   - Runs generator script
   - Builds Jekyll site
   - Deploys to GitHub Pages

## URL Structure

- `/` → Root `README.md`
- `/<directory>/` → `<directory>/README.md`
- `/<directory>/<subdirectory>/` → `<directory>/<subdirectory>/README.md`

Directory names with spaces are automatically URL-encoded.

## Navigation Rules

- Only directories containing a `README.md` appear in navigation
- Navigation tree is built recursively
- Items are sorted alphabetically

## Development

```bash
# Generate site files
npm run generate

# Build Jekyll site
npm run build

# Serve locally
npm run serve
```

## License

MIT
