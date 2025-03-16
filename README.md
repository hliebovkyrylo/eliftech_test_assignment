# ElifTech test assignment
2 of 3 levels completed.

## What was done

- Authorization
- CRUD operations questionnaires
- Pagination and filtering of questionnaires
- Ability to fill out questionnaires and view your results
- Drag&Drop questionnaires
- Saving responses before submitting the form
- Ability to choose the type of answer
- Ability to add questions and answer options as much as you want

## Technologies
### Front-End
- Next.js
- TypeScript
- Tailwindcss
- React-Query
- Shadcn/ui
- React-hook-form
- Zod
### Backend
- NestJS
- PostgreSQL
- Prisma
- TypeScript
- Docker

### Assembly

- Turbo Monorepo

## Application architecture

```
├── apps/                        # Applications
│   ├── api/                     # Backend (NestJS)
│   │   ├── node_modules/        # Dependencies
│   │   ├── prisma/              # Database settings (Prisma)
│   │   ├── src/                 # Source code
│   │   │   ├── [module]         # Application modules (e.g., auth)
│   │   │   ├── common/          # Common utilities
│   │   │   └── utils/           # Helper functions
│   │   ├── test/                # Tests
│   │   └── [config files]       # Configuration files (.env, tsconfig, etc.)
│   ├── web/                     # Frontend (Next.js)
│   │   ├── node_modules/        # Dependencies
│   │   ├── public/              # Static files
│   │   ├── src/                 # Source code
│   │   │   ├── components/      # Reusable components
│   │   │   ├── lib/             
│   │   │   ├── modules/         # Logic modules
│   │   │   │   ├── [module]     # Modules (e.g., auth)
│   │   │   └── pages/           # Application pages
│   │   └── [config files]       # Configuration files (next.config, etc.)
├── [root config files]          # Global configurations 
```

## Installation

### Installing dependencies

```
npm i
```

### Running a Database in a Docker Container

```
npm run docker
```

### Generating tables in a database

```
npx prisma generate
```

### Launching applications
```
npm run dev
```
