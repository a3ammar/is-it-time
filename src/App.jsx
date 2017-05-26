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
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleMouseMovement = (event: SyntheticMouseEvent) => {
    this.setState({ mousePosition: new Point(event.screenX, event.screenY) });
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
      <div className={this.className} onMouseMove={this.handleMouseMovement}>
        <Answer isDone={this.isDone} mousePosition={this.state.mousePosition} />
        <Duration untilDate={this.untilDate} />
      </div>
    );
  }
}
