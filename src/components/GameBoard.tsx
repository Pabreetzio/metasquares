import { on } from "events";
import { BoardWell } from "./BoardWell";
import { useState } from 'react';   

import { Player } from '../types/Player.types.js';

export function GameBoard({boardState, onPlay} : {boardState: Player[][], onPlay: (row: number, col: number) => void}) {
    const handleWellClick = (row: number, col: number) => {
        return () => {
            if (boardState[row][col] === Player.None) {
                onPlay(row, col);
                console.log(boardState);
            }
        };
    };
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
    {[boardState.map((row, rowIndex) => 
        row.map((player, colIndex) => {
            return <BoardWell 
            key={`board-well-${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} player={player} onWellClick={handleWellClick(rowIndex,colIndex)}></BoardWell>;
        })
    )]}

  </svg>
  );
}