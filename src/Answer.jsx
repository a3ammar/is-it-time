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

function shadowStyle(point: Point, colors: Array<string>) {
  const { x, y } = shadowDirection(point);
  const lastColor = 'rgba(25, 6, 8, 0.8)';

  return colors.map((color, index) => (
    `${index * x * -2}px ${index * y * -2}px 0px ${color}`
  )).concat(`${x * -40}px ${y * -40}px 25px ${lastColor}`);
}

export default class Answer extends Component {
  element: Element;

  props: {
    isDone: boolean;
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

  get className(): string {
    return [
      styles.answer,
      this.props.isDone ? styles.answerDone : styles.answerCounting,
    ].join(' ');
  }

  get shadowColors(): Array<string> {
    const counting = [
      '#c53f51',
      '#be3d4e',
      '#a23443',
      '#9b3240',
      '#802934',
      '#792631',
      '#5d1e26',
      '#561b23',
      '#3a1318',
      '#331015',
    ];

    const done = [
      '#c67465',
      '#bf7062',
      '#a36053',
      '#9c5c50',
      '#804b41',
      '#79473e',
      '#5d3730',
      '#56332c',
      '#3a221e',
      '#331e1a',
    ];

    return this.props.isDone ? done : counting;
  }

  get style(): Object {
    return {
      textShadow: shadowStyle(this.relativeMousePosition, this.shadowColors),
      transition: '0.5s ease-in-out',
    };
  }

  get answer(): string {
    if (this.props.isDone) {
      return 'حان';
    }

    return 'لا';
  }

  render() {
    return (
      <h1
        className={this.className}
        style={this.style}
        ref={(element) => { this.element = element; }}
      >
        {this.answer}
      </h1>
    );
  }
}
