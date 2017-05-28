// @flow

import React, { Component } from 'react';
import pattern from './pattern.svg';
import styles from './styles.scss';

export default class Background extends Component {
  render() {
    return (
      <div
        className={styles.background}
        dangerouslySetInnerHTML={{ __html: pattern }}
      />
    );
  }
}
