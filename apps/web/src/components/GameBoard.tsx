import { on } from "events";
import { BoardWell } from "./BoardWell";
import { WellHitbox } from "./WellHitbox";
import { PlayerMarble } from "./PlayerMarble";
import { useState } from 'react';   

import { Player, MetaSquare } from '@metasquares/shared';

export function GameBoard({boardState, metaSquares, onPlay, winner, onNewGame} : 
  {boardState: Player[][], metaSquares: MetaSquare[], onPlay: (row: number, col: number) => void, winner: string | null, onNewGame: () => void}) {
    const handleWellClick = (row: number, col: number) => {
        return () => {
            if (boardState[row][col] === Player.None) {
                onPlay(row, col);
                console.log(boardState);
            }
        };
    };
    const handleNewGame = () => {
        onNewGame();
    }
  return (
    <svg id="game-board" width="600" height="600" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="well-gradient" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#ffffff66" />
        <stop offset="100%" stopColor="#00000066" />
      </radialGradient>
      <radialGradient id="red-marble" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#ff0000" />
        <stop offset="100%" stopColor="#330000" />
      </radialGradient>
      <radialGradient id="blue-marble" cx="70%" cy="70%" r="70%" fx="70%" fy="70%">
        <stop offset="0%" stopColor="#0000ff" />
        <stop offset="100%" stopColor="#000033" />
      </radialGradient>

    </defs>
    {[boardState.map((row, rowIndex) => 
        row.map((player, colIndex) => {
            return <BoardWell key={`board-well-${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex}></BoardWell>;
        })
    )]}
    
    {[metaSquares.map((metaSquare, index) => {
        const strokeColor = metaSquare.player === Player.Player1 ? "#ff0000" : "#0000ff";
        return <path key={`meta-square-${index}`} d={metaSquare.square.toSvgPath(50)} fill="transparent" stroke={strokeColor} strokeWidth="2" />;
    })]}
    {/* <path key={`meta-square-3`} d="M 75 25 L 375 75 L 325 375 L 25 325 Z" fill="transparent" stroke="red" strokeWidth="2" /> */}
    {[boardState.map((row, rowIndex) => 
      row.map((player, colIndex) => {      
        return player == Player.None ? 
          <WellHitbox key={`well-hitbox${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} player={player} 
            onWellClick={handleWellClick(rowIndex,colIndex)}></WellHitbox> :
          <PlayerMarble key={`player-marble-${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} player={player} ></PlayerMarble>;
        })
      )]}

    {  
      winner != null && <foreignObject x="0" y="0" width="100%" height="100%">

<div className="w-full h-full flex items-center justify-center">
    <div className="bg-white/90 dark:bg-black/80 px-6 py-4 rounded-xl shadow-md text-center">
      <p className="text-2xl font-bold text-center text-current m-2">{winner} Wins!</p>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded" onClick={handleNewGame}>New Game</button>
    </div>    </div>
  </foreignObject>
    }

  </svg>
  );
}