import { Player, getCellCenter, getWellRadius, DEFAULT_CELL_SIZE } from '@metasquares/shared';

export function WellHitbox({row, col, player, onWellClick}: {row: number, col: number, player: Player, onWellClick: () => void}) {
    const { cx, cy } = getCellCenter(row, col, DEFAULT_CELL_SIZE);
    const radius = getWellRadius(DEFAULT_CELL_SIZE);

    return (
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="transparent"
          onClick={onWellClick}
          {...player === Player.None ? {cursor: "pointer"} : {}}
        />
      );
}