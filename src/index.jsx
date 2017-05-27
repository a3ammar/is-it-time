// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './styles.scss';


function dateToJSON(date: string) {
  const [day, month, year] = date.split('-');

  return JSON.stringify({ day, month, year });
}

function parseQueryString() {
  const defaultDate = '1-10-1438';
  const [_, query] = window.location.href.split('?');

  if (!query) {
    return { date: defaultDate };
  }

  return query.split('&').reduce((params, param) => {
    const [key, value] = param.split('=');

    params[key] = value;

    return params;
  }, {});
}

function extractGregorian(json: { year_gr: number, month_gr: number, day_gr: number }) {
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
  body: dateToJSON(parseQueryString().date),
})
  .then(response => (
    response.json()
  ))
  .then((json) => {
    ReactDOM.render(
      <App date={extractGregorian(json)} />,
      document.getElementById('app'),
    );
  });
