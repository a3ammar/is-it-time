// @flow

import React, { Component } from 'react';
import Sector, { Point } from './sectors';
import styles from './styles.scss';

function moveDirection(point: Point) {
  const { x, y } = Sector.findDirection(point);

  return `${x * -30}px ${y * -30}px`;
}

export default class Background extends Component {
  props: {
    movementPosition: Point,
  }

  get style(): Object {
    return {
      backgroundPosition: moveDirection(this.props.movementPosition),
      transition: '0.5s ease-in-out',
    };
  }

  render() {
    return (
      <div
        className={styles.background}
        style={this.style}
      />
    );
  }
}
