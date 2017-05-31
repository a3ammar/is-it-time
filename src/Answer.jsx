// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import Sector, { Point } from './sectors';
import styles from './styles.scss';

function shadowStyle(point: Point, colors: Array<string>) {
  const { x, y } = Sector.findDirection(point);
  const lastColor = 'rgba(25, 6, 8, 0.8)';

  return colors.map((color, index) => (
    `${index * x * -2}px ${index * y * -2}px 0px ${color}`
  )).concat(`${x * -30}px ${y * -30}px 25px ${lastColor}`);
}

export default class Answer extends Component {
  element: Element;

  props: {
    isDone: boolean,
    movementPosition: Point,
  }

  get className(): string {
    return classNames({
      [styles.answer]: true,
      [styles.answerDone]: this.props.isDone,
      [styles.answerCounting]: !this.props.isDone,
    });
  }

  get shadowColors(): Array<string> {
    const counting = [
      '#733333',
      '#703131',
      '#622b2b',
      '#5e2a2a',
      '#512424',
      '#4d2222',
      '#3f1c1c',
      '#3c1b1b',
      '#2e1414',
      '#2b1313',
    ];

    const done = [
      '#b048b9',
      '#cd4c6f',
      '#f2531c',
      '#dd8b41',
      '#c7cc6c',
      '#92cc93',
      '#57cbc0',
      '#818dbd',
      '#b048b9',
      '#0a5c64',
    ];

    return this.props.isDone ? done : counting;
  }

  get style(): Object {
    return {
      textShadow: shadowStyle(this.props.movementPosition, this.shadowColors),
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
      <h1 className={this.className} style={this.style}>
        {this.answer}
      </h1>
    );
  }
}
