// Finds the Julian day number that marks the start of lunar month 11 for a given year and time zone
export function getLunarMonth11(yy: number, timeZone: number): number {
  const off: number = jdFromDate(31, 12, yy) - 2415021;
  const k: number = Math.floor(off / 29.530588853);
  let nm: number = getNewMoonDay(k, timeZone);
  const sunLong: number = getSunLongitude(nm, timeZone);
  // sun longitude at local midnight
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

/**
 * Compute the (integral) Julian day number of day dd/mm/yyyy,
 * i.e. the number of days between 1/1/4713 BC (Julian calendar)
 * and dd/mm/yyyy.
 */
export function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd =
      dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

/**
 * Convert a Julian day number to day/month/year.
 * jd is an integer.
 */
export function jdToDate(jd: number): {
  day: number;
  month: number;
  year: number;
} {
  let a: number, b: number, c: number;
  if (jd > 2299160) {
    // After 5/10/1582, Gregorian calendar
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return { day, month, year };
}

export function getLeapMonthOffset(a11: number, timeZone: number): number {
  let k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1; // start with month following lunar month 11
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
  while (true) {
    last = arc;
    i += 1;
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    if (!(arc !== last && i < 14)) {
      break;
    }
  }
  return i - 1;
}

// Compute the day of the k-th new moon in the given time zone
// The time zone if the time difference between local time and UTC. 7.0 for UTC+7:00
export function getNewMoonDay(k: number, timeZone: number): number {
  return Math.floor(newMoon(k) + 0.5 + timeZone / 24);
}

// Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
// (measured as the number of days since 1/1/4713 BC noon UCT, e.g., 2451545.125 is 1/1/2000 15:00 UTC)
// Returns a floating number, e.g., 2415079.9758617813 for k=2 or 2414961.935157746 for k=-2.
function newMoon(k: number): number {
  // Time in Julian centuries from 1900 January 0.5
  const timeInJulian = k / 1236.85;
  const t2 = timeInJulian * timeInJulian;
  const t3 = t2 * timeInJulian;
  const dr = Math.PI / 180;

  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * t2 - 0.000000155 * t3;
  jd1 +=
    0.00033 * Math.sin((166.56 + 132.87 * timeInJulian - 0.009173 * t2) * dr);

  // Mean new moon
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3;
  // Sun's mean anomaly
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3;
  // Moon's mean anomaly
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3;

  // Moon's argument of latitude
  let c1 =
    (0.1734 - 0.000393 * timeInJulian) * Math.sin(M * dr) +
    0.0021 * Math.sin(2 * dr * M);
  c1 = c1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  c1 = c1 - 0.0004 * Math.sin(3 * dr * Mpr);
  c1 = c1 + 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  c1 =
    c1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  c1 =
    c1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  c1 =
    c1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  let deltat: number;
  if (timeInJulian < -11) {
    deltat =
      0.001 +
      0.000839 * timeInJulian +
      0.0002261 * t2 -
      0.00000845 * t3 -
      0.000000081 * timeInJulian * t3;
  } else {
    deltat = -0.000278 + 0.000265 * timeInJulian + 0.000262 * t2;
  }

  const jdNew = jd1 + c1 - deltat;
  return jdNew;
}

function getSunLongitude(jdn: number, timeZone: number): number {
  const t = (jdn - 2451545.5 - timeZone / 24) / 36525;
  const t2 = t * t;
  const dr = Math.PI / 180;
  const m = 357.5291 + 35999.0503 * t - 0.0001559 * t2 - 0.00000048 * t * t2;
  const l0 = 280.46645 + 36000.76983 * t + 0.0003032 * t2;

  let dl = (1.9146 - 0.004817 * t - 0.000014 * t2) * Math.sin(dr * m);
  dl +=
    (0.019993 - 0.000101 * t) * Math.sin(dr * 2 * m) +
    0.00029 * Math.sin(dr * 3 * m);

  let l = l0 + dl;
  const omega = 125.04 - 1934.136 * t;
  l = l - 0.00569 - 0.00478 * Math.sin(omega * dr);
  l = l * dr;
  l = l - 2 * Math.PI * Math.floor(l / (2 * Math.PI));
  return Math.floor((l / Math.PI) * 6);
}
