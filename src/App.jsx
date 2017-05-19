// @flow

import React, { Component, Element } from 'react';
import Duration from './Duration';

function Answer({ untilDate }: { untilDate: number }) {
  let answer;

  if (untilDate > 0) {
    answer = 'لا';
  } else {
    answer = 'نعم';
  }

  return <h1 className={styles.answer}>{answer}</h1>;
}

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
        <Answer untilDate={untilDate} />
        <Duration untilDate={untilDate} />
      </div>
    );
  }
}
