# Metasquares

A modern web implementation of the abstract strategy game **Metasquares**, built using:

- [TanStack Start](https://tanstack.com/start) for the frontend framework
- [Clerk](https://clerk.dev) for authentication
- [Convex](https://convex.dev) for the backend and real-time game data

Hosted at: [https://metasquares.graham.tech](https://metasquares.graham.tech)

---

## 🎯 What is Metasquares?

Metasquares is a turn-based game played on a grid where players compete to form squares using their claimed spots. It rewards tactical placement and long-term planning.

### 🕹️ How to Play

- The game is played on an *n x n* grid (usually 8x8).
- Players take turns placing their marker (e.g., red or blue) on any unclaimed square.
- When a player completes a **square** (of their own color), they score points equal to the *sum of the distances* between the placed tiles.
- The game ends when a player has at least 150 points and is winning by 15 points. If a player is not winning by 15 points when they reach 150 points play continues until a player has a 15 point lead. 

### 📐 Scoring

Each square gives points based on how spread out the points are. The further apart the points in the square, the more points you earn. Squares can be tilted, and the size is calculated by the size of the square the points have been offset from. For example, in a 3x3 grid, if the middles of each side are chosen then the diamond-looking square that is formed is still worth 9 points. For a 4x4 grid there are two other offset squares at different angles that each are worth 16 points. 

---

## 💡 Why I Built This

This project started as a code challenge entry at **ADI Global / Snap One**, where I work as a software developer. I wanted to:

- Explore new tools like **TanStack Start** and **Convex**
- Learn **Clerk** for authentication and session handling
- Reinforce modern React patterns in a real project
- Recreate a lesser-known strategy game I enjoyed

---

Planned support for:

- Authentication via Clerk
- Real-time multiplayer sessions via Convex
- Game creation, joining, and spectator mode

---

## 📚 License
This project is licensed under the [MIT License](LICENSE).

> The original concept of MetaSquares was created by puzzle designer **Scott Kim** in 1996 for MetaCreations and America Online.  
> This project is an independent, non-commercial reimplementation of the game for educational and personal use, and is not affiliated with or endorsed by the original creator or any commercial publisher.

---

## ✍️ Author

Built by [Patrick Graham](https://graham.tech)  
ADI Global / Snap One
