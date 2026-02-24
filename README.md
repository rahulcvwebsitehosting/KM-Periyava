# KM Periyava Sannadhi

This project is a React application built with Vite.

## Deployment on Vercel

To deploy this application on Vercel:

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect that it's a Vite project.
4.  **Important:** You must add the following Environment Variable in your Vercel project settings:
    *   `GEMINI_API_KEY`: Your Google Gemini API key.

The build command should be `npm run build` (or `vite build`), and the output directory should be `dist`.

A `vercel.json` file is included to handle Single Page Application (SPA) routing.
