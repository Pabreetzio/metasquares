import { getCellCenter, getWellRadius, DEFAULT_CELL_SIZE } from '@metasquares/shared';

export function BoardWell({row, col}: {row: number, col: number}) {
    const { cx, cy } = getCellCenter(row, col, DEFAULT_CELL_SIZE);
    const radius = getWellRadius(DEFAULT_CELL_SIZE);

    return (
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="url(#well-gradient)"
        />
      );
}