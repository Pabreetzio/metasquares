# Metasquares - Project Guide for Claude

## Project Overview

Metasquares is a **monorepo** containing both web and mobile implementations of the abstract strategy game MetaSquares (originally created by Scott Kim in 1996). This is a turn-based two-player game where players compete to form squares on an 8x8 grid, earning points based on the size of squares formed.

**Live Site (Web)**: https://metasquares.graham.tech

## Monorepo Structure

This is an **npm workspaces monorepo** with the following structure:

```
C:\Projects\metasquares\
├── apps/
│   ├── web/                 # TanStack Start web application
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   │   ├── Game.tsx         # Main game logic and state management
│   │   │   │   ├── GameBoard.tsx    # Visual board rendering
│   │   │   │   ├── BoardWell.tsx    # Individual well/cell on the board
│   │   │   │   ├── PlayerMarble.tsx # Visual representation of player markers
│   │   │   │   └── WellHitbox.tsx   # Click detection for wells
│   │   │   ├── routes/      # TanStack Router routes
│   │   │   │   ├── index.tsx        # Home page with game
│   │   │   │   └── _authed/         # Protected routes (Clerk integration)
│   │   │   ├── utils/       # Utility functions
│   │   │   ├── client.tsx   # Client-side entry point
│   │   │   └── ssr.tsx      # Server-side rendering entry point
│   │   ├── public/          # Static assets
│   │   ├── app.config.ts    # TanStack Start configuration
│   │   ├── tsconfig.json    # TypeScript config for web app
│   │   └── package.json     # Web app dependencies
│   │
│   └── mobile/              # React Native (Expo) mobile application
│       ├── src/
│       │   └── components/  # React Native components
│       │       ├── Game.tsx         # Main game container (uses shared hook)
│       │       ├── GameBoard.tsx    # SVG-based board rendering
│       │       ├── BoardWell.tsx    # Individual well/cell
│       │       └── PlayerMarble.tsx # Player marker visualization
│       ├── App.tsx          # Main app component
│       ├── app.json         # Expo configuration
│       ├── tsconfig.json    # TypeScript config for mobile app
│       └── package.json     # Mobile app dependencies
│
├── packages/
│   ├── shared/              # Shared code between web and mobile
│   │   ├── src/
│   │   │   ├── types/       # Shared TypeScript types
│   │   │   │   ├── Player.types.ts   # Player enum (Red, Blue, None)
│   │   │   │   ├── Point.types.ts    # Point type (x, y coordinates)
│   │   │   │   ├── Square.types.ts   # Square class (4 points)
│   │   │   │   └── MetaSquare.types.ts # MetaSquare type
│   │   │   ├── hooks/       # Shared React hooks
│   │   │   │   └── useGameLogic.ts   # Core game logic hook
│   │   │   └── index.ts     # Package exports
│   │   ├── tsconfig.json    # TypeScript config for shared package
│   │   └── package.json     # Shared package config
│   │
│   └── convex/              # Shared Convex backend
│       ├── tasks.ts         # Sample query (to be replaced with game logic)
│       ├── _generated/      # Auto-generated Convex files
│       └── package.json     # Convex package config
│
├── package.json             # Root workspace configuration
├── README.md
└── CLAUDE.MD
```

## Tech Stack

### Web App (@metasquares/web)
- **Frontend Framework**: TanStack Start (React 19)
- **Router**: TanStack Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vinxi
- **Language**: TypeScript

### Mobile App (@metasquares/mobile)
- **Framework**: React Native 0.81.5 with Expo 54
- **SVG Rendering**: react-native-svg
- **Language**: TypeScript
- **Authentication**: Clerk for Expo (not yet integrated)

### Shared Packages
- **@metasquares/shared**: Game types and logic shared between web and mobile
- **@metasquares/convex**: Convex backend (real-time serverless backend)
- **Authentication**: Clerk (web: `@clerk/tanstack-react-start`, mobile: `@clerk/clerk-expo`)

## Game Logic

### Core Game Rules (implemented in `packages/shared/src/hooks/useGameLogic.ts`)

1. **Board**: 8x8 grid, initialized with `Player.None`
2. **Players**: Two players (Player1 = red, Player2 = blue)
3. **Turns**: Players alternate placing markers on empty wells
4. **Square Detection**: After each move, the system checks for all valid squares formed by the current player
5. **Scoring**: Each square scores points = (size × size), where size is the perimeter distance
6. **Win Condition**: First player to reach 150+ points with a 15+ point lead wins

### Shared Game Logic Hook

The game logic is now centralized in `useGameLogic()` hook in the shared package:

```typescript
import { useGameLogic } from '@metasquares/shared';

const {
  boardState,      // 2D array of Player values
  currentPlayer,   // Current player's turn
  metaSquares,     // Array of formed squares
  currentScore,    // Score object for both players
  winner,          // Winning player (null if ongoing)
  handlePlay,      // Function to handle a move
  newGame          // Function to reset the game
} = useGameLogic();
```

### Key Internal Functions

- `handlePlay(row, col)`: Processes a player's move
- `getNewSquares(moveRow, moveCol, currentPlayer, boardState)`: Finds all new squares formed by a move
- `validateSquareBounds(square, boardState, currentPlayer)`: Validates if a square is valid
- `newGame()`: Resets the game state

### Square Detection Algorithm

The game checks 4 rotations for each possible square size:
- Starting from the clicked position
- For each dx (0 to board length) and dy (1 to remaining board size)
- Tests 4 rotational variants of the square
- Validates all 4 corners are owned by the current player and within bounds

## Shared Types Package

All game types are now in `@metasquares/shared` and used by both apps:

```typescript
// Available exports from @metasquares/shared
import {
  Player,
  Square,
  MetaSquare,
  Point,
  useGameLogic,
  GameState
} from '@metasquares/shared';

// Player enum
enum Player {
  Player1 = "Red",
  Player2 = "Blue",
  None = ""
}

// Point type
type Point = { x: number; y: number };

// Square class - extends Array<Point> with SVG rendering
class Square extends Array<Point> {
  toSvgPath(cellSize: number): string;
}

// MetaSquare type
type MetaSquare = {
  square: Square;
  player: Player;
};

// Game logic hook
function useGameLogic(): {
  boardState: Player[][];
  currentPlayer: Player;
  metaSquares: MetaSquare[];
  currentScore: { [Player.Player1]: number; [Player.Player2]: number };
  winner: Player | null;
  handlePlay: (row: number, col: number) => void;
  newGame: () => void;
};
```

## State Management

Game state is now managed through the shared `useGameLogic()` hook, which uses React `useState` internally:
- `boardState`: 2D array tracking well ownership
- `currentPlayer`: Which player's turn it is
- `metaSquares`: Array of all formed squares
- `currentScore`: Score object for both players
- `winner`: Winning player (null if game ongoing)

Both web and mobile apps use the same hook for consistent game behavior.

## Convex Backend

Located in `packages/convex/`. Currently minimal - contains a sample `tasks` query. Game logic runs client-side.

**Future Integration Points**:
- Game session management
- Multiplayer synchronization
- Game history/replay
- Leaderboards
- User profiles

## Development

### Initial Setup

```bash
# From the root directory
npm install              # Install all dependencies for all workspaces
```

### Running the Web App

```bash
# From root
npm run dev:web          # Start web dev server

# Or from apps/web
cd apps/web
npm run dev
```

### Running the Mobile App

```bash
# From root
npm run dev:mobile       # Start Expo dev server

# Or from apps/mobile
cd apps/mobile
npm start                # Start Expo
npm run android          # Run on Android
npm run ios              # Run on iOS (macOS only)
```

### Building

```bash
# Web app
npm run build:web        # Build for production

# Mobile app
cd apps/mobile
npx expo build           # Build for app stores
```

## Working with the Monorepo

### Adding Dependencies

```bash
# Add to web app
npm install <package> --workspace=@metasquares/web

# Add to mobile app
npm install <package> --workspace=@metasquares/mobile

# Add to shared package
npm install <package> --workspace=@metasquares/shared
```

### Using Shared Packages

The web and mobile apps can import from shared packages:

```typescript
// In web or mobile app
import { Player, Square, MetaSquare } from '@metasquares/shared';
import { api } from '@metasquares/convex/_generated/api';
```

TypeScript path mappings are configured in each app's `tsconfig.json`.

## Current State & TODOs

### ✅ Completed
- Monorepo structure with npm workspaces
- Basic game board rendering (web & mobile)
- Player marble placement (web & mobile)
- Square detection algorithm (shared)
- Win condition logic (shared)
- Score calculation (shared)
- Visual feedback for squares formed (web & mobile)
- New game functionality (web & mobile)
- Shared types package
- **Shared game logic hook (useGameLogic)**
- **React Native app with full game UI**
- **SVG rendering with react-native-svg**
- React Native app scaffolding (Expo)
- Convex moved to shared location

### 🚧 In Progress
- Convex backend integration (directory exists, minimal implementation)
- Clerk authentication setup (dependencies installed, not integrated)

### 📋 Planned Features
- Real-time multiplayer via Convex
- User authentication and profiles (Clerk)
- Game lobbies and matchmaking
- Spectator mode
- Game history and replays
- Cross-platform play (web vs mobile)
- Mobile-specific optimizations (gestures, haptics)

## Known Issues

- Game state is client-only (no persistence)
- No multiplayer support yet
- Clerk authentication routes exist but aren't fully connected
- `tasks` query in Convex is sample code, not used by game
- Mobile app needs testing on physical devices

## Code Style Notes

- TypeScript with `.tsx` for React components
- Functional components with hooks
- Web: Tailwind for styling
- Mobile: React Native StyleSheet
- File imports use `.js` extensions in web app (TypeScript convention)
- Shared packages use standard `.ts` extensions

## Important Context for Claude

When working on this project:

1. **Monorepo Structure**: This is an npm workspaces monorepo. Always be aware of which package you're working in (web, mobile, or shared).

2. **Shared Code**: Game types and logic are in `@metasquares/shared` and used by both web and mobile apps. Don't duplicate code between apps.

3. **Game Logic**: The core game algorithm is now in `packages/shared/src/hooks/useGameLogic.ts` and shared between both apps. Both web and mobile use the same `useGameLogic()` hook for consistent behavior.

4. **Convex Integration**: The Convex backend is in `packages/convex/` and scaffolded but not integrated. Game state should eventually move to Convex for multiplayer support.

5. **Authentication**: Clerk is partially set up in both apps but not integrated. Web uses `@clerk/tanstack-react-start`, mobile uses `@clerk/clerk-expo`.

6. **Scoring**: The scoring calculation is based on square area (size²), where size is the perimeter distance between corners.

7. **Board Coordinate System**: Uses [row][col] indexing, where [0][0] is top-left.

8. **Mobile Development**: The mobile app now has full game UI ported from web, using react-native-svg for rendering. The game logic is shared via `useGameLogic()` hook.

## Cross-Platform Considerations

The apps share game logic but have platform-specific rendering:
- **SVG Rendering**: Both apps use SVG (web: native SVG, mobile: react-native-svg)
- **Styling**: Web uses Tailwind CSS, mobile uses React Native StyleSheet
- **Interaction**: Web uses click events, mobile uses touch gestures (via SVG onPress)
- **Shared Logic**: Game state management and square detection algorithm are fully shared via `useGameLogic()` hook
- **Components**: Each platform has its own UI components that consume the shared hook

## Author

Built by Patrick Graham for ADI Global / Snap One as a code challenge entry and learning project.

## License

MIT License. See README.md for full attribution to original game creator Scott Kim.
