import { BoardWell } from "./BoardWell";

enum Player {
    Player1 = "X",
    Player2 = "O",
}
interface WellProps {
    row: number;
    col: number;
    marble?: Player;
  }
    
export function GameBoard() {
  return (
    <svg width="600" height="600" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="well-gradient" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#ffffff66" />
        <stop offset="100%" stopColor="#00000066" />
      </radialGradient>
      <radialGradient id="red-marble" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#ff0000dd" />
        <stop offset="100%" stopColor="#330000dd" />
      </radialGradient>
      <radialGradient id="blue-marble" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#0000ffdd" />
        <stop offset="100%" stopColor="#000033dd" />
      </radialGradient>

    </defs>
    {[...Array(8)].map((_, row) =>
      [...Array(8)].map((_, col) => {
        let wellProps: WellProps = {
            row: row,
            col: col
            };
            if (row === 0 && col === 0) {
                wellProps.marble = Player.Player1;
            }
            else if (row === 0 && col === 1) {
                wellProps.marble = Player.Player2;
            }
       return <BoardWell  row={row} col={col} marble={wellProps.marble}></BoardWell>;
      })
    )}
  </svg>
  );
}