import { Point } from './Point.types';
export class Square extends Array<Point> {
    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
      super(p1, p2, p3, p4);
  
      // Ensure exactly 4 points
      if (this.length !== 4) {
        throw new Error("Square must have exactly 4 points");
      }
  
      // Fix prototype chain (needed for Array subclassing)
      Object.setPrototypeOf(this, Square.prototype);
    }
  
    toSvgPath(cellSize: number): string {
      const toCoord = (p: Point) =>
        `${p.x * cellSize + cellSize / 2} ${p.y * cellSize + cellSize / 2}`;
  
      return `M ${toCoord(this[0])} L ${toCoord(this[1])} L ${toCoord(this[2])} L ${toCoord(this[3])} Z`;
    }
  }