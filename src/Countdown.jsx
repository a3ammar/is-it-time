// @flow

import React from 'react';
import styles from './styles.scss';

const localizationRules = {
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

function toArabicNumber(number: number) {
  const codePointDifference = 1584;
  const asString = String(number);

  return asString.split('').map(char => (
    String.fromCodePoint(char.codePointAt(0) + codePointDifference)
  )).join('');
}

class Period {
  name: string;
  count: number;

  constructor(name, count) {
    this.name  = name;
    this.count = count;
  }

  get localizedName() {
    const rule = localizationRules[this.name];
    const key  = countToKey(this.count);

    return rule[key];
  }

  get localizedCount() {
    return this.count > 2 ? toArabicNumber(this.count) : null;
  }
}

function Done() {
  return (
    <span role="img" aria-label="Party Popper">🎉</span>
  );
}

function Counter({ period }: { period: Period }) {
  if (!period.localizedName) {
    return null;
  }

  return (
    <div className={styles.counter}>
      <span className={styles.counterCount}>{period.localizedCount}</span>
      <span className={styles.counterPeriod}>{period.localizedName}</span>
    </div>
  );
}

export default function Countdown({ untilDate }: { untilDate: number }) {
  if (untilDate <= 0) {
    return (
      <div className={styles.countdown}>
        <Done />
      </div>
    );
  }

  const dateAsSeconds = Math.floor(untilDate / 1000);
  const periods = [
    new Period('seconds', Math.floor(dateAsSeconds % 60)),
    new Period('minutes', Math.floor((dateAsSeconds / 60) % 60)),
    new Period('hours',   Math.floor((dateAsSeconds / 60 / 60) % 24)),
    new Period('days',    Math.floor((dateAsSeconds / 60 / 60 / 24) % 7)),
    new Period('weeks',   Math.floor((dateAsSeconds / 60 / 60 / 24 / 7) % 4)),
    new Period('months',  Math.floor((dateAsSeconds / 60 / 60 / 24 / 7 / 4))),
  ].reverse();

  return (
    <div className={styles.countdown}>
      {
        periods.map(period => (
          <Counter key={period.name} period={period} />
        ))
      }
    </div>
  );
}
