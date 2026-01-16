# Convex Backend Setup

This package contains the shared Convex backend for both web and mobile apps.

## Setup

1. **Install Convex CLI** (if not already installed):
   ```bash
   npm install -g convex
   ```

2. **Initialize Convex** (first time only):
   ```bash
   cd packages/convex
   npx convex dev
   ```

   This will:
   - Create a new Convex project (or link to existing)
   - Generate a `CONVEX_URL`
   - Start the Convex development server

3. **Add the URL to your web app**:
   - Copy the `CONVEX_URL` from the output
   - Create `apps/web/.env.local` with:
     ```
     VITE_CONVEX_URL=https://your-deployment.convex.cloud
     ```

4. **For mobile app** (when ready):
   - Add the same URL to `apps/mobile/.env`

## Current State

The backend currently has:
- `tasks.ts` - Sample query (placeholder)

## Future Features

When implementing multiplayer:
- Game session management
- Real-time game state synchronization
- Player authentication integration
- Leaderboards and statistics
