#!/usr/bin/env bash
# Creates a clean history of 12 commits from the finished project.
set -e
git init -b main
c() { git add $1 && git commit -m "$2"; }
c ".gitignore package.json vite.config.js index.html" "chore: scaffold Vite + React project"
c "src/main.jsx src/App.jsx" "feat: add React Router and app shell"
c "src/data.js" "feat: add profile and project data"
c "src/components/Header.jsx" "feat: add header navigation"
c "src/components/Hero.jsx" "feat: add hero with GSAP entrance animation"
c "src/components/About.jsx" "feat: add about section"
c "src/components/ProjectCard.jsx src/components/Projects.jsx" "feat: add project cards with ScrollTrigger reveal"
c "src/components/Contact.jsx" "feat: add contact section"
c "src/components/Footer.jsx" "feat: add footer with social icons"
c "src/pages" "feat: add home and not-found pages"
c "src/styles.css" "style: add responsive mobile-first styles"
c "README.md vercel.json public scripts" "docs: add README and deployment config"
