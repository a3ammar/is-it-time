// @flow

import React, { Component, Element } from 'react';
import Duration from './Duration';

export default class App extends Component {
  timerID: number;

  props: {
    children: Element<any>,
    date: ?Date,
  }

  state = {
    now: new Date(),
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  compoentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ now: new Date() });
  }

  render() {
    const untilDate = this.props.date - this.state.now;

    return (
      <div>
        {this.props.children}
        <Duration untilDate={untilDate} />
      </div>
    );
  }
}
