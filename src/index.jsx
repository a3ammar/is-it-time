// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './App.scss';

function parseDate(json: JSON) {
  const date = json.data.gregorian;
  const year = Number(date.year);
  const month = Number(date.month.number) - 1;
  const day = Number(date.day);

  return new Date(year, month, day);
}

function Loading() {
  return (
    <div className={styles.loading}>
      <span role="img" aria-label="Loading">🤔</span>
    </div>
  );
}

ReactDOM.render(
  <Loading />,
  document.getElementById('app'),
);

fetch('https://api.aladhan.com/hToG?date=01-09-1438')
  .then(response => (
    response.json()
  ))
  .then((json) => {
    ReactDOM.render(
      <h1>{parseDate(json).toLocaleString()}</h1>,
      document.getElementById('app'),
    );
  });
