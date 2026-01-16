import { Player } from '@metasquares/shared';

export function PlayerMarble({row, col, player}: {row: number, col: number, player: Player}) {
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
        { player != "" &&  <circle
                cx={cx}
                cy={cy}
                r="15"
                fill={`url(#${fill})`}
            /> }
      </>
      );
}