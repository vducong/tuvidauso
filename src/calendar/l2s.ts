import {
  getLeapMonthOffset,
  getLunarMonth11,
  getNewMoonDay,
  jdToDate,
} from "./lib";

/**
 * Convert a lunar date to the corresponding solar date.
 * Returns an array: [day, month, year].
 */
export function L2S(
  lunarD: number,
  lunarM: number,
  lunarY: number,
  lunarLeap: number,
  tZ: number = 7
): { day: number; month: number; year: number } {
  let a11: number, b11: number;
  if (lunarM < 11) {
    a11 = getLunarMonth11(lunarY - 1, tZ);
    b11 = getLunarMonth11(lunarY, tZ);
  } else {
    a11 = getLunarMonth11(lunarY, tZ);
    b11 = getLunarMonth11(lunarY + 1, tZ);
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunarM - 11;
  if (off < 0) {
    off += 12;
  }
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, tZ);
    let leapM = leapOff - 2;
    if (leapM < 0) {
      leapM += 12;
    }
    if (lunarLeap !== 0 && lunarM !== leapM) {
      return { day: 0, month: 0, year: 0 };
    } else if (lunarLeap !== 0 || off >= leapOff) {
      off += 1;
    }
  }
  const monthStart = getNewMoonDay(k + off, tZ);
  return jdToDate(monthStart + lunarD - 1);
}
