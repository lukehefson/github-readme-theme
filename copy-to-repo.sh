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
echo "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. Edit _config.yml with your repo details:"
echo "   repo_owner: \"lukehefson\""
echo "   repo_name: \"repo-name\""
echo "   repo_branch: \"main\""
echo "3. Run: npm install && bundle install"
echo "4. Run: npm run generate && npm run serve"

