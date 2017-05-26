// @flow

import React, { Component } from 'react';
import Answer from './Answer';
import Duration from './Duration';
import { Point } from './sectors';
import styles from './styles.scss';

export default class App extends Component {
  timerID: number;

  props: {
    date: Date,
  }

  state = {
    now: new Date(),
    mousePosition: new Point(0, 0),
    deviceOrientation: new Point(0, 0),
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

    this.setState({ mousePosition: new Point(screenX, screenY) });
  }

  handleOrientation = (event: any) => {
    const { beta, gamma } = event;

    // Flipping `beta` & `gamma` signs so shadow will follow the orientation.
    this.setState({ deviceOrientation: new Point(gamma * -1, beta * -1) });
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

  get className(): string {
    return [
      styles.app,
      this.isDone ? styles.appDone : styles.appCounting,
    ].join(' ');
  }

  render() {
    return (
      <div
        className={this.className}
        onMouseMove={this.handleMouseMovement}
      >
        <Answer
          isDone={this.isDone}
          mousePosition={this.state.mousePosition}
          deviceOrientation={this.state.deviceOrientation}
        />
        <Duration untilDate={this.untilDate} />
      </div>
    );
  }
}
