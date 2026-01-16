import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { GameBoard } from './GameBoard';
import { Player, useGameLogic } from '@metasquares/shared';

export function Game() {
  const { boardState, currentPlayer, metaSquares, currentScore, winner, handlePlay, newGame } =
    useGameLogic();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Metasquares</Text>

      <GameBoard
        boardState={boardState}
        metaSquares={metaSquares}
        onPlay={handlePlay}
        winner={winner}
        onNewGame={newGame}
      />

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>Score</Text>
        <View style={styles.scoreRow}>
          <View style={styles.scoreItem}>
            <View style={[styles.playerIndicator, { backgroundColor: '#ff0000' }]} />
            <Text style={styles.scoreText}>
              {Player.Player1}: {currentScore[Player.Player1]}
            </Text>
          </View>
          <View style={styles.scoreItem}>
            <View style={[styles.playerIndicator, { backgroundColor: '#0000ff' }]} />
            <Text style={styles.scoreText}>
              {Player.Player2}: {currentScore[Player.Player2]}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.currentPlayerText}>Current Player: {currentPlayer}</Text>
        <TouchableOpacity style={styles.newGameButton} onPress={newGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>🎯 What is Metasquares?</Text>
        <Text style={styles.rulesText}>
          Metasquares is a turn-based game played on a grid where players compete to form squares
          using their claimed spots. It rewards tactical placement and long-term planning.
        </Text>

        <Text style={styles.rulesSubtitle}>🕹️ How to Play</Text>
        <Text style={styles.rulesText}>
          • The game is played on an 8×8 grid.{'\n'}
          • Players take turns placing their marker (red or blue) on any unclaimed square.{'\n'}
          • When a player completes a square (of their own color), they score points equal to the
          sum of the distances between the placed tiles.{'\n'}• The game ends when a player has at
          least 150 points and is winning by 15 points.
        </Text>

        <Text style={styles.rulesSubtitle}>📐 Scoring</Text>
        <Text style={styles.rulesText}>
          Each square gives points based on how spread out the points are. The further apart the
          points in the square, the more points you earn. Squares can be tilted, and the size is
          calculated by the size of the square the points have been offset from.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  scoreContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  scoreText: {
    fontSize: 16,
    color: '#555',
  },
  infoContainer: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  currentPlayerText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  newGameButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rulesContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  rulesSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  rulesText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
});
