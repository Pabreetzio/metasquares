import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import {
  Player,
  MetaSquare,
  getCellCenter,
  getWellRadius,
  getPlayerStrokeColor,
  SVG_GRADIENTS,
} from '@metasquares/shared';
import { BoardWell } from './BoardWell';
import { PlayerMarble } from './PlayerMarble';

interface GameBoardProps {
  boardState: Player[][];
  metaSquares: MetaSquare[];
  onPlay: (row: number, col: number) => void;
  winner: string | null;
  onNewGame: () => void;
}

export function GameBoard({
  boardState,
  metaSquares,
  onPlay,
  winner,
  onNewGame,
}: GameBoardProps) {
  const screenWidth = Dimensions.get('window').width;
  const boardSize = Math.min(screenWidth - 32, 400);
  const cellSize = boardSize / 8;

  const handleWellPress = (row: number, col: number) => {
    if (boardState[row][col] === Player.None && !winner) {
      onPlay(row, col);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'relative', width: boardSize, height: boardSize }}>
        <Svg width={boardSize} height={boardSize} viewBox={`0 0 ${boardSize} ${boardSize}`}>
          <Defs>
            {Object.values(SVG_GRADIENTS).map((gradient) => (
              <RadialGradient
                key={gradient.id}
                id={gradient.id}
                cx={gradient.cx}
                cy={gradient.cy}
                r={gradient.r}
                fx={gradient.fx}
                fy={gradient.fy}
              >
                {gradient.stops.map((stop, idx) => (
                  <Stop key={idx} offset={stop.offset} stopColor={stop.color} />
                ))}
              </RadialGradient>
            ))}
          </Defs>

          {/* Draw wells */}
          {boardState.map((row, rowIndex) =>
            row.map((_, colIndex) => (
              <BoardWell
                key={`well-${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                cellSize={cellSize}
              />
            ))
          )}

          {/* Draw squares */}
          {metaSquares.map((metaSquare, index) => (
            <Path
              key={`square-${index}`}
              d={metaSquare.square.toSvgPath(cellSize)}
              fill="transparent"
              stroke={getPlayerStrokeColor(metaSquare.player)}
              strokeWidth="2"
            />
          ))}

          {/* Draw marbles */}
          {boardState.map((row, rowIndex) =>
            row.map((player, colIndex) => {
              return (
                player !== Player.None && (
                  <PlayerMarble
                    key={`marble-${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    player={player}
                    cellSize={cellSize}
                  />
                )
              );
            })
          )}
        </Svg>

        {/* Overlay touch hitboxes */}
        {boardState.map((row, rowIndex) =>
          row.map((player, colIndex) => {
            if (player !== Player.None) return null;

            const { cx, cy } = getCellCenter(rowIndex, colIndex, cellSize);
            const radius = getWellRadius(cellSize);

            return (
              <TouchableOpacity
                key={`hitbox-${rowIndex}-${colIndex}`}
                style={{
                  position: 'absolute',
                  left: cx - radius,
                  top: cy - radius,
                  width: radius * 2,
                  height: radius * 2,
                }}
                onPress={() => handleWellPress(rowIndex, colIndex)}
                activeOpacity={0.7}
              />
            );
          })
        )}
      </View>

      {winner && (
        <View style={styles.winnerOverlay}>
          <View style={styles.winnerBox}>
            <Text style={styles.winnerText}>{winner} Wins!</Text>
            <TouchableOpacity style={styles.newGameButton} onPress={onNewGame}>
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newGameButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
