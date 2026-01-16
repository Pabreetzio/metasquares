import { Player } from '../types/Player.types';

/**
 * Game board constants
 */
export const BOARD_SIZE = 8;
export const DEFAULT_CELL_SIZE = 50;

/**
 * Calculate cell center coordinates
 */
export function getCellCenter(row: number, col: number, cellSize: number) {
  return {
    cx: cellSize / 2 + col * cellSize,
    cy: cellSize / 2 + row * cellSize,
  };
}

/**
 * Get well radius based on cell size
 */
export function getWellRadius(cellSize: number): number {
  return cellSize * 0.4;
}

/**
 * Get marble radius based on cell size
 */
export function getMarbleRadius(cellSize: number): number {
  return cellSize * 0.3;
}

/**
 * Get stroke color for a player's squares
 */
export function getPlayerStrokeColor(player: Player): string {
  return player === Player.Player1 ? '#ff0000' : '#0000ff';
}

/**
 * Get fill gradient ID for a player's marble
 */
export function getPlayerGradientId(player: Player): string {
  if (player === Player.Player1) return 'red-marble';
  if (player === Player.Player2) return 'blue-marble';
  return 'well-gradient';
}

/**
 * Gradient definitions for SVG rendering
 */
export const SVG_GRADIENTS = {
  wellGradient: {
    id: 'well-gradient',
    cx: '70%',
    cy: '70%',
    r: '70%',
    fx: '70%',
    fy: '70%',
    stops: [
      { offset: '0%', color: '#ffffff66' },
      { offset: '100%', color: '#00000066' },
    ],
  },
  redMarble: {
    id: 'red-marble',
    cx: '70%',
    cy: '70%',
    r: '70%',
    fx: '70%',
    fy: '70%',
    stops: [
      { offset: '0%', color: '#ff0000' },
      { offset: '100%', color: '#330000' },
    ],
  },
  blueMarble: {
    id: 'blue-marble',
    cx: '70%',
    cy: '70%',
    r: '70%',
    fx: '70%',
    fy: '70%',
    stops: [
      { offset: '0%', color: '#0000ff' },
      { offset: '100%', color: '#000033' },
    ],
  },
};
