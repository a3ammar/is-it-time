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

  render() {
    const untilDate = this.props.date - this.state.now;

    return (
      <div className={styles.app} onMouseMove={this.handleMouseMovement}>
        <Answer untilDate={untilDate} mousePosition={this.state.mousePosition} />
        <Duration untilDate={untilDate} />
      </div>
    );
  }
}
