import { createFileRoute } from '@tanstack/react-router'
import { GameBoard } from '~/components/GameBoard.js'
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="mx-auto max-w-2xl p-4 flex flex-col gap-4">
      <GameBoard></GameBoard>
      <h2>🎯 What is Metasquares?</h2>
      <p>Metasquares is a turn-based game played on a grid where players compete to form squares using their claimed spots. It rewards tactical placement and long-term planning.</p>

      <h3>🕹️ How to Play</h3>
      <ul>
        <li>The game is played on an *n x n* grid (usually 8x8).</li>
        <li>Players take turns placing their marker (e.g., red or blue) on any unclaimed square.</li>
        <li>When a player completes a **square** (of their own color), they score points equal to the *sum of the distances* between the placed tiles.</li>
        <li>The game ends when a player has at least 150 points and is winning by 15 points. If a player is not winning by 15 points when they reach 150 points play continues until a player has a 15 point lead.</li>
      </ul>

      <h3>📐 Scoring</h3>
      <p>Each square gives points based on how spread out the points are. The further apart the points in the square, the more points you earn. Squares can be tilted, and the size is calculated by the size of the square the points have been offset from. For example, in a 3x3 grid, if the middles of each side are chosen then the diamond-looking square that is formed is still worth 9 points. For a 4x4 grid there are two other offset squares at different angles that each are worth 16 points. </p>

    </div>
  )
}
