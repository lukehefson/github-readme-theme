#!/bin/bash

# Script to copy theme files to a test repository
# Usage: ./copy-to-repo.sh /path/to/repo-name

if [ -z "$1" ]; then
    echo "Usage: ./copy-to-repo.sh /path/to/target-repo"
    exit 1
fi

TARGET_DIR="$1"

if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: Target directory does not exist: $TARGET_DIR"
    exit 1
fi

echo "Copying theme files to $TARGET_DIR..."

# Copy directories
cp -r _config.yml "$TARGET_DIR/"
cp -r _layouts "$TARGET_DIR/"
cp -r _includes "$TARGET_DIR/"
cp -r assets "$TARGET_DIR/"
cp -r scripts "$TARGET_DIR/"
cp -r .github "$TARGET_DIR/"
cp Gemfile "$TARGET_DIR/"
cp package.json "$TARGET_DIR/"
cp .gitignore "$TARGET_DIR/"

echo "Files copied successfully!"
echo ""

# Validate critical files
echo "Validating copied files..."
VALIDATION_FAILED=0

# Check that default.html starts correctly
if ! head -n 1 "$TARGET_DIR/_layouts/default.html" | grep -q "^<!DOCTYPE html>"; then
    echo "⚠️  WARNING: _layouts/default.html doesn't start with <!DOCTYPE html>"
    echo "   First line: $(head -n 1 "$TARGET_DIR/_layouts/default.html")"
    VALIDATION_FAILED=1
fi

# Check that _config.yml exists and has required fields
if [ ! -f "$TARGET_DIR/_config.yml" ]; then
    echo "⚠️  WARNING: _config.yml not found"
    VALIDATION_FAILED=1
fi

if [ $VALIDATION_FAILED -eq 0 ]; then
    echo "✓ Validation passed"
else
    echo "⚠️  Validation found issues - please review the files"
fi

echo ""
echo "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. Edit _config.yml with your repo details:"
echo "   - repo_owner: Your GitHub username"
echo "   - repo_name: Your repository name"
echo "   - baseurl: \"/your-repo-name\" (or \"\" for custom domain)"
echo "   - url: Your GitHub Pages URL"
echo "3. Run: npm install && bundle install"
echo "4. Run: npm run generate && npm run serve"

