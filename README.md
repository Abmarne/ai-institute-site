
# AI Institute Website

A modern, responsive website for the Artificial Intelligence Research Institute (AIRI) at the Technical University of Cluj-Napoca, built with Next.js, React, and Tailwind CSS.

## Strapi: quick dev-to-dev

- Strapi is a headless CMS running in `server/` (Strapi v5). It exposes REST APIs under `http://localhost:1337/api/*` when running.
- Admin UI lives at `http://localhost:1337/strapi/admin` in this repo (configurable via `STRAPI_ADMIN_URL`).
    First run will prompt you to create an admin user. Don't
- Content is draft by default; use Publish to make it live. 
- Schema/content-type changes (editing files under `server/src/api/**/content-types/*`) only take effect when Strapi boots and builds its types. If you're running via Docker, you need to rebuild or run Strapi locally to regenerate. Mounting endpoints alone won't propagate schema changes. It is suggested that you make said changes from the admin interface, but Copilot can slam them into Strapi too.
- We keep some JSONs around as a seed. You can see below how to quickly get some data in gear. 
- Make sure to make an .env file, you can copy the example just fine in dev, but you have to populate the STRAPI_API_TOKEN var from the admin interface, otherwise all API calls will fail.

## Running the migration script (JSON → Strapi)

The repo includes a migration that imports legacy JSON content into Strapi and publishes key types.

Prereqs:
- Strapi server running and reachable at `http://localhost:1337`

Populating the DB in the container:
```bash
# From the project root, with containers up
docker cp web/src/app/data ai-institute-site-strapi-1:/app/migration-data

docker exec -it ai-institute-site-strapi-1 /bin/sh -c "MIGRATION_DATA_ROOT=/app/migration-data node /app/scripts/migrate-json.js"
```

What it does:
- Imports people, departments/support units, projects, publications, datasets, etc.
- Publishes created/updated entries so they show up as live content.

What to expect:
- On success, you’ll see counts per type; entries appear in Strapi Admin under their respective collections.
- Re-running is idempotent for existing slugs; it updates and republishes as needed.
- If the frontend still doesn’t show content, check Strapi responses with curl and ensure the frontend queries include `publicationState=preview`.

## Accessing Strapi and the site

- Strapi Admin: `http://localhost:1337/strapi/admin`
- Strapi REST: `http://localhost:1337/api/projects`, `.../people`, etc. Use `?populate=...` for relations.
- Frontend (Next.js): typically `http://localhost:3000` when running locally.

## Docker vs local running and schema changes

- Everything is made to run in containers, so Strapi might break or behave unexpectedly if it doesn't find it's postgres DB. It does have a SqlLite fallback ready to go, just so you know. 
- Feel free to CD into the web directory and run `npm run dev` if you don't need anything from strapi. 

## Features

- Responsive design with mobile-friendly navigation
- Interactive research unit explorer
- Interactive timeline with animation effects
- News and media galleries
- Interactive map of collaborating universities
- Contact form integration

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Framer Motion for animations
- React Leaflet for interactive maps
- React Vertical Timeline for the timeline component
- Next Share for social media integration

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server with Turbopack:
    ```bash
    npm run dev
    ```
4. Open http://localhost:3000 in your browser

### Production Build:
```bash
npm run build
npm start
```

### Static Export:
To generate a static site that can be deployed to any web server:
```bash
npm run export
```

### Docker Deployment
Yes, this project also includes docker:
```bash
# Make sure you're in the root of the project. The dot at the end of the command assumes that
docker build -t airi-website . 

# Run the container
docker run -p 3000:3000 airi-website
```

## Project Structure
- src\app - Page components for each route
- src\components - Reusable UI components
- public\ - Static assets