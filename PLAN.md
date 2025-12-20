# PLAN.md

## Goal

Create a reusable Jekyll theme (built via GitHub Actions) that renders a GitHub repo’s `README.md` files (root and nested directories) as a clean, GitHub-style “README preview” site:

- `/` renders repo root `README.md`
- `/<dir>/` renders `<dir>/README.md`
- `/<dir>/<subdir>/` renders `<dir>/<subdir>/README.md`
- Sidebar tree shows only directories that contain a `README.md`
- Non-README files never appear in navigation
- Minimal chrome: collapsible “Navigation” sidebar, breadcrumb, and an Edit button linking to GitHub edit UI for the currently viewed README
- Styling matches GitHub’s rendered markdown as closely as possible

## Visual references

Authoritative visual targets live in `/docs`:

- `docs/github-current.png`  
  What a GitHub repo page looks like today when viewing a README (baseline reference).

- `docs/github-current-with-nav.png`  
  GitHub repo page with file tree visible (interaction reference).

- `docs/target-no-nav.png`  
  Desired rendered site with sidebar collapsed and near-zero chrome.

- `docs/target-with-nav.png`  
  Desired rendered site with Navigation sidebar expanded.

When implementing layout, spacing, chrome, and interaction behavior, prefer the `target-*` images over GitHub.com screenshots.

## Approach

Use a build-time generator script (Node) that:
1. Scans the repo for `README.md` files.
2. Generates Jekyll pages under `_generated/` so Jekyll renders them normally.
3. Generates `_data/nav.json` describing the directory tree for the sidebar.
4. Emits per-page metadata (breadcrumb + edit link) so layout logic stays simple and predictable.

This avoids relying on unsupported GitHub Pages plugins and keeps all behavior explicit and inspectable.

## Inputs and rules

- Include root `README.md` if present.
- Include a directory in navigation only if it contains `README.md`.
- Ignore all other files.
- Support arbitrarily deep nesting.
- Directory names may contain spaces and must be URL-encoded per path segment in generated URLs.

## Generated artifacts

### Pages

For each README found at `<path>/README.md`:

- If `<path>` is repo root:
  - write `_generated/index.md`
  - page URL: `/`
- Else:
  - write `_generated/<path>/index.md`
  - page URL: `/<path>/` (URL-encoded per segment)

Each generated `index.md` contains YAML front matter followed by the original README body.

Required front matter fields:
- `layout: default`
- `readme_path: "<raw relative path to README.md>"`
- `page_url: "<resolved page URL>"`
- `breadcrumb: [ { title, url }, ... ]`
- `edit_url: "<full GitHub edit URL>"`

### Navigation data

Generate `_data/nav.json` describing the README directory tree:

```json
{
  "root": { "title": "<repo_name>", "url": "/" },
  "children": [
    {
      "title": "Name of a nested directory",
      "url": "/Name%20of%20a%20nested%20directory/",
      "children": []
    }
  ]
}
```

Rules:
- Root is present only if root README exists.
- `children` contains only directories that have a README (recursively).
- Ordering should be stable (alphabetical).

## Theme layout requirements

### Layout

- Two-column layout:
  - Left: collapsible sidebar titled “Navigation”
  - Right: header row (breadcrumb left, Edit button right) + content
- Render markdown content inside:
  `<article class="markdown-body">...</article>`

### Includes

- `_includes/sidebar.html` renders nav tree from `site.data.nav`
- `_includes/breadcrumb.html` renders `page.breadcrumb`
- `_includes/edit_button.html` links to `page.edit_url`

### Sidebar behavior

- Toggle button collapses/expands sidebar.
- Collapsed state removes almost all chrome, matching `target-no-nav.png`.
- Persist collapsed/open state in `localStorage`.

### Active states

- Highlight active nav item based on `page.page_url`.

## Styling requirements

- Markdown styling must match GitHub’s rendered markdown as closely as possible.
- Use `github-markdown-css` for markdown body styles.
- Add minimal custom CSS only for:
  - layout grid
  - sidebar chrome
  - breadcrumb row
  - icon button hover/focus states
  - responsive behavior

Do not restyle markdown elements unless required to close a parity gap.

## Edit URL rules

Edit button links directly to the GitHub edit UI for the rendered README:

`https://github.com/<owner>/<repo>/edit/<branch>/<encoded_readme_path>`

Config values live in `_config.yml`:
- `repo_owner`
- `repo_name`
- `repo_branch` (default `main`)

The generator should precompute `edit_url` to avoid Liquid encoding complexity.

## Project structure

/
  _config.yml
  _layouts/default.html
  _includes/
    sidebar.html
    breadcrumb.html
    edit_button.html
  _data/nav.json           (generated)
  _generated/              (generated)
    index.md
    <dir>/index.md
  assets/
    css/
      github-markdown.css
      site.css
    js/
      site.js
  scripts/
    generate-readme-site.mjs
  docs/
    github-current.png
    github-current-with-nav.png
    target-no-nav.png
    target-with-nav.png
  README.md
  PLAN.md

## Milestones

1. Scaffold layout and markdown rendering
2. Generator: scan READMEs and generate pages
3. Generator: build nav tree
4. Breadcrumb + Edit button wiring
5. Sidebar collapse + persistence
6. Visual parity pass against target images

## Acceptance criteria

Given:

repo-name/
├── README.md
└── Name of a nested directory/
    └── README.md

Expect:
- `/` renders root README
- `/Name%20of%20a%20nested%20directory/` renders nested README
- Sidebar shows only repo-name → Name of a nested directory
- Sidebar collapse matches `target-no-nav.png`
- Expanded sidebar matches `target-with-nav.png`
- Edit button links to correct GitHub edit page
- No non-README files or directories appear

## Implementation notes

- Generator overwrites `_generated/` and `_data/nav.json` on each run.
- URL encoding must be applied per path segment.
- If root README does not exist, render a minimal placeholder homepage.

## Optional follow-ups

- Auto-detect repo owner/name/branch during CI and inject config
- Add content or nav search
- Add optional “View on GitHub” link
