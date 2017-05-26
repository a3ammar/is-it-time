// @flow

import React from 'react';
import styles from './styles.scss';

const pluralizationRules = {
  years: {
    one: 'سنة واحدة',
    two: 'سنتين',
    few: 'سنوات',
    many: 'سنة',
  },

  months: {
    one: 'شهر واحد',
    two: 'شهرين',
    few: 'شهور',
    many: 'شهر',
  },

  weeks: {
    one: 'أسبوع واحد',
    two: 'أسبوعين',
    few: 'أسابيع',
    many: 'أسبوع',
  },

  days: {
    one: 'يوم واحد',
    two: 'يومين',
    few: 'أيام',
    many: 'يوم',
  },

  hours: {
    one: 'ساعة واحدة',
    two: 'ساعتين',
    few: 'ساعات',
    many: 'ساعة',
  },

  minutes: {
    zero: 'أقل من دقيقة',
    one: 'دقيقة واحدة',
    two: 'دقيقتين',
    few: 'دقائق',
    many: 'دقيقة',
  },

  seconds: {
    zero: 'أقل من ثانية',
    one: 'ثانية واحدة',
    two: 'ثانيتين',
    few: 'ثواني',
    many: 'ثانية',
  },
};

function toArabicNumber(number: number) {
  const codePointDifference = 1584;
  const asString = String(number);

  return asString.split('').map(char => (
    String.fromCodePoint(char.codePointAt(0) + codePointDifference)
  )).join('');
}

function countToKey(count: number) {
  const cardinal = count % 100;

  let key;
  if (cardinal === 0) {
    key = 'zero';
  } else if (cardinal === 1) {
    key = 'one';
  } else if (cardinal === 2) {
    key = 'two';
  } else if (cardinal > 2 && cardinal <= 10) {
    key = 'few';
  } else if (cardinal > 10 && cardinal <= 99) {
    key = 'many';
  } else {
    key = null;
  }

  return key;
}

function dateToDurations(dateAsSeconds: number) {
  const seconds = Math.floor(dateAsSeconds % 60);
  const minutes = Math.floor((dateAsSeconds / 60) % 60);
  const hours   = Math.floor((dateAsSeconds / 60 / 60) % 24);
  const days    = Math.floor((dateAsSeconds / 60 / 60 / 24) % 7);
  const weeks   = Math.floor((dateAsSeconds / 60 / 60 / 24 / 7) % 4);
  const months  = Math.floor((dateAsSeconds / 60 / 60 / 24 / 30) % 12);
  const years   = Math.floor((dateAsSeconds / 60 / 60 / 24 / 30 / 12));

  return [
    { name: 'years',   count: years },
    { name: 'months',  count: months },
    { name: 'weeks',   count: weeks },
    { name: 'days',    count: days },
    { name: 'hours',   count: hours },
    { name: 'minutes', count: minutes },
    { name: 'seconds', count: seconds },
  ];
}

function pluralize(period: string, count: number) {
  const rule = pluralizationRules[period];
  const key = countToKey(count);
  const arabicCount = toArabicNumber(count);
  let plural = rule[key];

  if (key === 'few' || key === 'many') {
    plural = `${arabicCount} ${plural}`;
  }

  return plural || null;
}

function dateAsWords(dateAsSeconds: number) {
  if (dateAsSeconds <= 0) {
    return [{ period: 'done', duration: '🎉' }];
  }

  return dateToDurations(dateAsSeconds).reduce((plurals, period) => {
    const plural = pluralize(period.name, period.count);

    if (plural) {
      plurals.push({ period: period.name, duration: plural });
    }

    return plurals;
  }, []);
}

export default function Duration({ untilDate }: { untilDate: number }) {
  const seconds = Math.floor(untilDate / 1000);

  return (
    <div className={styles.duration}>
      {dateAsWords(seconds).map(({ period, duration }) => (
        <div key={period} className={styles.counter}>{duration}</div>
      ))}
    </div>
  );
}
