import { Player, getCellCenter, getMarbleRadius, getPlayerGradientId, DEFAULT_CELL_SIZE } from '@metasquares/shared';

export function PlayerMarble({row, col, player}: {row: number, col: number, player: Player}) {
    const { cx, cy } = getCellCenter(row, col, DEFAULT_CELL_SIZE);
    const radius = getMarbleRadius(DEFAULT_CELL_SIZE);
    const fill = `url(#${getPlayerGradientId(player)})`;

    return (
        <>
        { player != "" &&  <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={fill}
            /> }
      </>
      );
}