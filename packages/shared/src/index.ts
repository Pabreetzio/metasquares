// Export all types
export { Player } from './types/Player.types';
export type { Point } from './types/Point.types';
export { Square } from './types/Square.types';
export type { MetaSquare } from './types/MetaSquare.types';

// Export hooks
export { useGameLogic } from './hooks/useGameLogic';
export type { GameState } from './hooks/useGameLogic';

// Export utilities
export {
  BOARD_SIZE,
  DEFAULT_CELL_SIZE,
  getCellCenter,
  getWellRadius,
  getMarbleRadius,
  getPlayerStrokeColor,
  getPlayerGradientId,
  SVG_GRADIENTS,
} from './utils/rendering';
