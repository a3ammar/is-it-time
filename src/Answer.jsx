// @flow

import React, { Component } from 'react';
import Sector, { Point } from './sectors';
import styles from './styles.scss';

function shadowDirection(point: Point) {
  const defaultDirection = new Point(0, 0);
  const sectors = Sector.generateSectors(8, 22.5);
  const pointSector = sectors.find(sector => sector.contains(point));

  return pointSector ? pointSector.shadowDirection : defaultDirection;
}

function shadowStyle(direction: Point) {
  const { x, y } = direction;
  const lastColor = 'rgba(25, 6, 8, 0.8)';
  const colors = [
    '#d63145',
    '#cf3042',
    '#b02939',
    '#a92736',
    '#8b202d',
    '#831e2a',
    '#651720',
    '#5d151e',
    '#3f0f14',
    '#370d12',
  ];

  return colors.map((color, index) => (
    `${(index + 1) * x}px ${(index + 1) * y}px 0px ${color}`
  )).concat(`${15 * x}px ${15 * y}px 25px ${lastColor}`);
}

export default class Answer extends Component {
  element: Element;

  props: {
    untilDate: number,
    mousePosition: Point,
  }

  get relativeMousePosition(): Point {
    if (this.element === undefined) {
      return this.props.mousePosition;
    }

    const bounds = this.element.getBoundingClientRect();
    const origin = {
      x: (bounds.left + bounds.right) / 2,
      y: (bounds.top + bounds.bottom) / 2,
    };

    return new Point(
      this.props.mousePosition.x,
      this.props.mousePosition.y,
      origin,
    );
  }

  get style(): Array {
    return {
      textShadow: shadowStyle(shadowDirection(this.relativeMousePosition)),
      transition: '0.5s ease-in-out',
    };
  }

  get answer(): string {
    if (this.props.untilDate <= 0) {
      return 'حان';
    }

    return 'لا';
  }

  render() {
    return (
      <h1
        className={styles.answer}
        style={this.style}
        ref={(element) => { this.element = element; }}
      >
        {this.answer}
      </h1>
    );
  }
}
