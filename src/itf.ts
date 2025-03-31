import type { Dob } from "./calendar/type";
import type { GENDER } from "./constant";
import type { DiaBan } from "./dia_ban";
import type { ThienBan } from "./thien_ban";

export interface TuViCalculator {
  calc(
    name: string,
    gender: GENDER,
    solarDob: Dob,
    solarHh: number,
    solarMm: number,
    tz?: number
  ): LaSo;
}

// Lá số Tử Vi
export type LaSo = {
  thienBan: ThienBan;
  diaBan: DiaBan;
};
