// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './styles.scss';

// You can change the date easily, formatting as `day/month/year`.
const date = '1/9/1438';

function parseInputDate() {
  const parsedDate = date.split('/');

  return JSON.stringify({
    day: parsedDate[0],
    month: parsedDate[1],
    year: parsedDate[2],
  });
}

function parseGregorianDate(json: { year_gr: number, month_gr: number, day_gr: number }) {
  return new Date(json.year_gr, json.month_gr - 1, json.day_gr);
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

fetch('https://util.services/api/convert-hijri-to-greg/', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: parseInputDate(),
})
  .then(response => (
    response.json()
  ))
  .then((json) => {
    ReactDOM.render(
      <App date={parseGregorianDate(json)} />,
      document.getElementById('app'),
    );
  });
