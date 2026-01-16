import React from 'react';
import { Circle } from 'react-native-svg';
import { Player, getCellCenter, getMarbleRadius, getPlayerGradientId } from '@metasquares/shared';

interface PlayerMarbleProps {
  row: number;
  col: number;
  player: Player;
  cellSize: number;
}

export function PlayerMarble({ row, col, player, cellSize }: PlayerMarbleProps) {
  const { cx, cy } = getCellCenter(row, col, cellSize);
  const radius = getMarbleRadius(cellSize);
  const fill = `url(#${getPlayerGradientId(player)})`;

  return player !== Player.None ? (
    <Circle cx={cx} cy={cy} r={radius} fill={fill} />
  ) : null;
}
