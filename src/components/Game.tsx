
import React from 'react';
import { useState } from 'react';
import { GameBoard } from './GameBoard.js';
import { Player } from '../types/Player.types.js';
import { Square } from '../types/Square.types.js';
import { MetaSquare } from '../types/MetaSquare.types.js';

export function Game() {
        const [boardState, setBoardState] = useState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
        const [currentPlayer, setCurrentPlayer] = useState(Player.Player1);
        const [metaSquares, setMetasquares] = useState([] as MetaSquare[]);
        const newGame = () => {
            setBoardState(Array(8).fill(Player.None).map(() => Array(8).fill(Player.None)));
            setCurrentPlayer(Player.Player1);

            let metaSquares: MetaSquare[] = [
            ];
            setMetasquares(metaSquares);
        }
        const inExistingSquare = (newSquare: Square, existingSquares: Square[]) => {
            return existingSquares.some((existingSquare) => {
                return newSquare.every(newSquarePoint => {
                    return existingSquare.some(existingSquarePoint => {
                        return newSquarePoint.x === existingSquarePoint.x && newSquarePoint.y === existingSquarePoint.y;
                    });
                });
            });

        }
        const getNewSquares3 = (moveRow: number, moveCol: number, currentPlayer: Player,  boardState: Player[][]) => {
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
            if ((boardState[point.y])[point.x] !== currentPlayer) {
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
            const newSquares = getNewSquares3(row, col, currentPlayer, newBoardState);
            const newMetaSquares = [...metaSquares, ...newSquares];
            setMetasquares(newMetaSquares);
                        

            if (currentPlayer === Player.Player1) {
                setCurrentPlayer(Player.Player2);
            }
            else {
                setCurrentPlayer(Player.Player1);
            }
        }

    return (
        <>
        <GameBoard boardState={boardState} metaSquares={metaSquares} onPlay={handlePlay}></GameBoard>
        <button onClick={newGame}>New Game</button>
        <div>Current Player: {currentPlayer}</div>
        </>
    );
}