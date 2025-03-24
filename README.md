# Sign-In Form

A sign-in form SPA created with React, React Router, and React Hook Form. 

## Tech Stack

- React 19
- React Router v7
- React Hook Form with Zod validation
- CSS Modules
- TypeScript
- Vite

## Mock Credentials

For testing purposes, use the following credentials:

- Email: `user@example.com`
- Password: `Password1!`

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
pnpm build
```

This will generate a production-ready build in the `dist` directory.

## Deployment

This project is configured for GitHub Pages deployment:

```bash
pnpm deploy
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API/service layer
├── styles/            # Global styles and variables
├── types/             # TypeScript types and schemas
├── utils/             # Utility functions
├── App.tsx            # Main application component with routes
└── main.tsx           # Application entry point
```
