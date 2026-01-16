
import React from 'react';
import { useState } from 'react';
import { GameBoard } from './GameBoard.js';
import { Player, Square, MetaSquare } from '@metasquares/shared';

export function Game() {
        const [boardState, setBoardState] = useState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
        const [currentPlayer, setCurrentPlayer] = useState(Player.Player1);
        const [metaSquares, setMetasquares] = useState([] as MetaSquare[]);
        const [currentScore, setCurrentScore] = useState({[Player.Player1]: 0, [Player.Player2]: 0} as {[Player.Player1]: number, [Player.Player2]: number});
        const [winner, setWinner] = useState(null as Player | null);
        const newGame = () => {
            setWinner(null);
            setBoardState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
            setCurrentPlayer(Player.Player1);
            setCurrentScore({ [Player.Player1]: 0, [Player.Player2]: 0});
            let metaSquares: MetaSquare[] = [
            ];
            setMetasquares(metaSquares);
        }

        const getNewSquares = (moveRow: number, moveCol: number, currentPlayer: Player,  boardState: Player[][]) => {
            let newSquares: MetaSquare[] = [];
            for (let dx = 0; dx < boardState.length; dx++) {
                for(let dy = 1; dy < boardState.length - dx; dy++) { //assumes square board
                    
                    //rotation 1
                    let point1 = {x: moveCol, y: moveRow};                    
                    let point2 = {x: point1.x+dx , y: point1.y+dy};
                    let point3 = {x: point2.x-dy, y: point2.y+dx};
                    let point4 = {x: point3.x-dx, y: point3.y-dy};
                    
                    let square = new Square(point1, point2, point3, point4);
                    let valid = validateSquareBounds(square, boardState, currentPlayer);

                    if (valid) {
                        newSquares.push({square: square, player: currentPlayer});
                    }
                    //rotation 2
                    point2 = {x: point1.x-dy , y: point1.y+dx};
                    point3 = {x: point2.x-dx, y: point2.y-dy};
                    point4 = {x: point3.x+dy, y: point3.y-dx};
                    square = new Square(point1, point2, point3, point4);
                    valid = validateSquareBounds(square, boardState, currentPlayer);
                    if (valid) {
                        newSquares.push({square: square, player: currentPlayer});
                    }

                    //rotation 3
                    point2 = {x: point1.x-dx , y: point1.y-dy};
                    point3 = {x: point2.x+dy, y: point2.y-dx};
                    point4 = {x: point3.x+dx, y: point3.y+dy};
                    square = new Square(point1, point2, point3, point4);
                    valid = validateSquareBounds(square, boardState, currentPlayer);
                    if (valid) {
                        newSquares.push({square: square, player: currentPlayer});
                    }

                    //rotation 4
                    point2 = {x: point1.x+dy , y: point1.y-dx};
                    point3 = {x: point2.x+dx, y: point2.y+dy};
                    point4 = {x: point3.x-dy, y: point3.y+dx};
                    square = new Square(point1, point2, point3, point4);
                    valid = validateSquareBounds(square, boardState, currentPlayer);
                    if (valid) {
                        newSquares.push({square: square, player: currentPlayer});
                    }
                }
            }
            return newSquares;
        }
        

    function validateSquareBounds(square: Square, boardState: Player[][], currentPlayer: Player) {
        let outOfBounds = false;
        let ownedByCurrentPlayer = true;
        for (let point of square) {
            if (point.x < 0 || point.y < 0 || point.x >= boardState.length || point.y >= boardState[0].length) {
                outOfBounds = true;
                break;
            }
            if (boardState[point.y][point.x] !== currentPlayer) {
                ownedByCurrentPlayer = false;
                break;
            }
        }
        let valid = !outOfBounds && ownedByCurrentPlayer;
        return valid
    }

        const handlePlay = (row: number, col: number) => {
            const newBoardState = [...boardState];
            newBoardState[row][col] = currentPlayer;
            setBoardState(newBoardState);
            const newSquares = getNewSquares(row, col, currentPlayer, newBoardState);
            const newMetaSquares = [...metaSquares, ...newSquares];
            setMetasquares(newMetaSquares);
            let newScore = currentScore;
            if (newSquares.length > 0) {
                for (let i = 0; i < newSquares.length; i++) {
                    const square = newSquares[i].square;
                    const size = (Math.abs(square[0].x - square[1].x) + Math.abs(square[0].y - square[1].y)+1);
                    const area = size * size;
                    if (currentPlayer !== Player.None) {
                        newScore[currentPlayer] += area;
                    }
                }
            }
            setCurrentScore(newScore);
            let otherPlayer = currentPlayer === Player.Player1 ? Player.Player2 : Player.Player1;
            if (currentPlayer !== Player.None && currentScore[currentPlayer] >= 150 && currentScore[currentPlayer] > (currentScore[otherPlayer]+15)) {
                setWinner(currentPlayer);
            }

            if (currentPlayer === Player.Player1) {
                setCurrentPlayer(Player.Player2);
            }
            else {
                setCurrentPlayer(Player.Player1);
            }
        }

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