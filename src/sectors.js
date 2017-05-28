// @flow

function toRadian(degree) {
  return degree * (Math.PI / 180);
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number, origin: Object = { x: 0, y: 0 }) {
    this.x = x - origin.x;
    this.y = y - origin.y;
  }

  get angle(): number {
    return (Math.atan2(this.y, this.x) + (2 * Math.PI)) % (2 * Math.PI);
  }
}

// Sector is a fancy name for a slice of a circle. Its main method is `contains` which
// takes a `Point` and checks if this point is within the slice.
// The static method `generateSectors` help divide a circle with `n` slices, it takes an
// optional argument `startAngle` for specifying from which angle should the slices start.
export default class Sector {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = toRadian(start);
    this.end = toRadian(end);
  }

  static generateSectors(n: number, startAngle: number = 0) {
    const increment = 360 / n;

    return Array(n).fill(0).map((_, index) => {
      const start = (startAngle + (increment * (index + 1))) % 360;
      const end   = (startAngle + (increment * (index + 2))) % 360;

      return new this(start, end);
    });
  }

  get shadowDirection(): Point {
    const average = (this.start + this.end) / 2;

    if (this.end < this.start) {
      return new Point(Math.cos(0), Math.sin(0));
    }

    return new Point(
      Math.round(Math.cos(average)),
      Math.round(Math.sin(average)),
    );
  }

  contains(point: Point) {
    const angle = point.angle;

    if (this.end < this.start) {
      return this.start <= angle || angle <= this.end;
    }

    return this.start <= angle && angle <= this.end;
  }
}
