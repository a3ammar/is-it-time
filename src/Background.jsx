// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import Sector, { Point } from './sectors';
import styles from './styles.scss';

function moveDirection(point: Point) {
  const { x, y } = Sector.findDirection(point);

  return `${x * -30}px ${y * -30}px`;
}

export default class Background extends Component {
  props: {
    isDone: boolean,
    movementPosition: Point,
  }

  get className(): string {
    return classNames({
      [styles.background]: true,
      [styles.backgroundDone]: this.props.isDone,
      [styles.backgroundCounting]: !this.props.isDone,
    });
  }

  get style(): Object {
    return {
      backgroundPosition: moveDirection(this.props.movementPosition),
      transition: '0.5s ease-in-out',
    };
  }

  render() {
    return (
      <div className={this.className} style={this.style} />
    );
  }
}
