
import React from 'react';
import { GameBoard } from './GameBoard.js';
import { Player, useGameLogic } from '@metasquares/shared';

export function Game() {
        const { boardState, currentPlayer, metaSquares, currentScore, winner, handlePlay, newGame } = useGameLogic();

    return (
        <div id="game">
        <GameBoard boardState={boardState} metaSquares={metaSquares} onPlay={handlePlay} winner={winner} onNewGame={newGame}></GameBoard>
        <div>
            <h2>Score</h2>
            <div>{Player.Player1}: {currentScore[Player.Player1]}</div>
            <div>{Player.Player2}: {currentScore[Player.Player2]}</div>
        </div>
        <button onClick={newGame}>New Game</button>
        <div>Current Player: {currentPlayer}</div>
        </div>
    );
}