
import React from 'react';
import { useState } from 'react';
import { GameBoard } from './GameBoard.js';
import { Player } from '../types/Player.types.js';

export function Game() {
    
        const [boardState, setBoardState] = useState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
        const [currentPlayer, setCurrentPlayer] = useState(Player.Player1);
        const newGame = () => {
            setBoardState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
            setCurrentPlayer(Player.Player1);
        }
        const handlePlay = (row: number, col: number) => {
            const newBoardState = [...boardState];
            newBoardState[row][col] = currentPlayer;
            setBoardState(newBoardState);

            if (currentPlayer === Player.Player1) {
                setCurrentPlayer(Player.Player2);
            }
            else {
                setCurrentPlayer(Player.Player1);
            }
        }

    return (
        <>
        <GameBoard boardState={boardState} onPlay={handlePlay}></GameBoard>
        <button onClick={newGame}>New Game</button>
        <div>Current Player: {currentPlayer}</div>
        </>
    );
}