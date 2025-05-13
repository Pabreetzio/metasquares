import { Player } from '../types/Player.types.js';

export function BoardWell({row, col, player, onWellClick}: {row: number, col: number, player: Player, onWellClick: () => void}) {
    const cx = 25 + col * 50;
    const cy = 25 + row * 50;
    let fill = "well-gradient";
    if (player === Player.Player1) {
        fill = "red-marble";
    }
    else if (player === Player.Player2) {  
        fill = "blue-marble";
    }
    return (
        <>
        <circle
          key={`${row}-${col}`}
          cx={cx}
          cy={cy}
          r="20"
          fill="url(#well-gradient)"
          onClick={onWellClick}
          cursor={player === "" ? "pointer": "default"}
        />
        { player != "" &&  <circle
                key={`${row}-${col}-marble`}
                cx={cx}
                cy={cy}
                r="15"
                fill={`url(#${fill})`}
            /> }
           
        </>
      );
}