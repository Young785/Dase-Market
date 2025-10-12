# Environment Variables Setup

This document outlines the required environment variables for the DASE Market Place application.

## Frontend Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Frontend API URL (Laravel Backend)
VITE_API_URL=http://localhost:8000/api

# Giphy API Key for GIF support in chat
# Get your API key from https://developers.giphy.com/
VITE_GIPHY_API_KEY=your_giphy_api_key_here

# Backend URL (without /api)
VITE_BACKEND_URL=http://localhost:8000
```

## Getting a Giphy API Key

1. Visit [Giphy Developers](https://developers.giphy.com/)
2. Sign up or log in to your account
3. Create a new app and get your API key
4. Copy the API key and paste it in your `.env` file as `VITE_GIPHY_API_KEY`

## Important Notes

- Never commit your `.env` file to version control
- The `.env` file should be added to `.gitignore`
- For production, use environment-specific values
- Update the chat component (`src/components/dashboard/chat/index.jsx`) to use `import.meta.env.VITE_GIPHY_API_KEY` instead of hardcoded key

## Usage in Code

Access environment variables in your React components using:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const giphyKey = import.meta.env.VITE_GIPHY_API_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
```

## Backend Environment Variables

For Laravel backend configuration, refer to the `backend/.env` file with database, mail, and other service configurations.

