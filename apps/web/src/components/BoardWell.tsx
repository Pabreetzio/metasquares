import { Player } from '@metasquares/shared';

export function BoardWell({row, col}: {row: number, col: number}) {
    const cx = 25 + col * 50;
    const cy = 25 + row * 50;

    return (
        <circle
          cx={cx}
          cy={cy}
          r="20"
          fill="url(#well-gradient)"
        />
      );
}