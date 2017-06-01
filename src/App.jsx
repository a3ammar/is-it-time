// @flow

import React, { Component } from 'react';
import Answer from './Answer';
import Countdown from './Countdown';
import Background from './Background';
import { Point } from './sectors';
import styles from './styles.scss';

const origin = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

function Repository() {
  return (
    <a
      className={styles.repository}
      href="https://github.com/a3ammar/is-it-time"
      title="Source Code on GitHub"
      aria-label="Source Code on GitHub"
    />
  );
}

export default class App extends Component {
  timerID: number;

  props: {
    date: Date,
  }

  state = {
    now: new Date(),
    movementPosition: new Point(0, 0),
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    window.addEventListener('deviceorientation', this.handleOrientation);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }

  handleMouseMovement = (event: SyntheticMouseEvent) => {
    const { screenX, screenY } = event;

    this.setState({ movementPosition: new Point(screenX, screenY, origin) });
  }

  handleOrientation = (event: any) => {
    const { beta, gamma } = event;

    // Phones are held with an orientation that faces the user.
    const betaAdjusted = beta - 50;

    // Flipping `beta` & `gamma` signs so shadow will follow the orientation.
    this.setState({ movementPosition: new Point(gamma * -1, betaAdjusted * -1) });
  }

  tick() {
    this.setState({ now: new Date() });
  }

  get untilDate(): number {
    return this.props.date - this.state.now;
  }

  get isDone(): boolean {
    return this.untilDate <= 0;
  }

  render() {
    return (
      <div className={styles.app} onMouseMove={this.handleMouseMovement}>
        <Repository />
        <Answer isDone={this.isDone} movementPosition={this.state.movementPosition} />
        <Countdown untilDate={this.untilDate} />
        <Background isDone={this.isDone} movementPosition={this.state.movementPosition} />
      </div>
    );
  }
}
