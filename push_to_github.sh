#!/bin/bash
REPO_PATH="/home/runner/workspace/artifacts/roomhy-website/repo"
GITHUB_URL="https://Harsh02032002:${GITHUB_PERSONAL_ACCESS_TOKEN}@github.com/Harsh02032002/roohmy-design.git"
GIT_DIR="$REPO_PATH/.git"
GIT_WORK_TREE="$REPO_PATH"

echo "Pushing to GitHub..."
git --git-dir="$GIT_DIR" --work-tree="$GIT_WORK_TREE" push "$GITHUB_URL" main --force 2>&1
