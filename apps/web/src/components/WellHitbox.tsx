import { Player } from '@metasquares/shared';

export function WellHitbox({row, col, player, onWellClick}: {row: number, col: number, player: Player, onWellClick: () => void}) {
    const cx = 25 + col * 50;
    const cy = 25 + row * 50;

    return (
        <circle
          cx={cx}
          cy={cy}
          r="20"
          fill="transparent"
          onClick={onWellClick}
          {...player === Player.None ? {cursor: "pointer"} : {}}
        />
      );
}