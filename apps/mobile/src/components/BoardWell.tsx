import React from 'react';
import { Circle } from 'react-native-svg';
import { getCellCenter, getWellRadius } from '@metasquares/shared';

interface BoardWellProps {
  row: number;
  col: number;
  cellSize: number;
}

export function BoardWell({ row, col, cellSize }: BoardWellProps) {
  const { cx, cy } = getCellCenter(row, col, cellSize);
  const radius = getWellRadius(cellSize);

  return (
    <Circle
      cx={cx}
      cy={cy}
      r={radius}
      fill="url(#well-gradient)"
    />
  );
}
