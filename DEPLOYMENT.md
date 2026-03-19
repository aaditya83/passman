# Deployment

## Backend on Render

This project is set up to deploy the backend from the `backend/` folder.

### Option A: Use `render.yaml`

1. Push this repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select this GitHub repository.
4. Render will detect `render.yaml` and create the backend service.

### Option B: Create the service manually

Use these settings:

- Runtime: `Node`
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `node server.js`

### Backend environment variables

Set these in Render:

```env
MONGOURL=your-mongodb-atlas-connection-string
FRONTEND_URL=https://passman-kappa.vercel.app
PORT=3000
```

### Backend check

After deployment, open:

```text
https://your-render-backend-url.onrender.com/health
```

It should return:

```json
{"success":true}
```

## Frontend on Vercel

Set this environment variable in Vercel for the frontend:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Then redeploy the frontend.

## Expected Result

After both deployments are updated:

1. Adding a password sends it to the hosted backend.
2. The backend saves it in MongoDB.
3. Reloading the page fetches the saved passwords again.
