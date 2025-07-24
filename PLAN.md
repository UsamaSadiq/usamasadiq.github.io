# Migration and Feature Plan

This document outlines the tasks required to migrate legacy HTML content to the new Jekyll site and enhance the portfolio.

## 1. Import legacy project content
- Convert each file under `legacy_projects/` to Jekyll pages in `_projects` or `_posts`.
  - `legacy_projects/hilteks.html` -> `_projects/hilteks.md` full page content.
  - `legacy_projects/scrappers/edx_scrapper.html` -> `_projects/edx-scraper.md` or blog post with instructions.
  - `legacy_projects/flashmaster` -> embed React build or link to external demo, document usage in a Jekyll page.
- Preserve images/assets by moving them into `assets/` and update references.

## 2. Add site navigation
- Use Minimal Mistakes navigation data (`_data/navigation.yml`) to define menu links: Home, Blog, Projects, Resume.
- Include a Resume button linking to `Usama Sadiq Resume .pdf`.
- Enable header navigation via theme configuration.

## 3. Home page layout improvements
- Create a side panel on the home page with:
  - Profile picture (stored in `assets/images/profile.jpg`).
  - Short bio and key skills list.
  - Social links (GitHub, LinkedIn, Twitter etc.) using FontAwesome icons.
- Keep main content area for About, Education, and latest blog posts/projects.
- Optionally use Bootstrap components where needed, ensuring compatibility with Jekyll layouts.

## 4. Blogging setup
- Extend `_config.yml` with categories, tag archives, search and pagination settings from Minimal Mistakes.
- Add author profile data in `_data/authors.yml` for bio and avatar.
- Start writing posts under `_posts/` (currently only the welcome post exists).

## 5. Additional interactive features
- Implement dark/light mode toggle using theme skin or custom CSS.
- Add project filtering or tags (e.g., backend/devops) using simple JavaScript as in legacy index.
- Display featured projects on the home page.
- Consider adding a contact form or RSS feed link.

## 6. Cleanup
- Remove `legacy_index.html` once its content is ported.
- Document development steps in README.

