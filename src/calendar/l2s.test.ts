import { describe, expect, test } from "bun:test";

import { L2S } from "./l2s";

describe("Lunar to Solar date conversion", () => {
  test("01/01/2023", () => {
    const solar = L2S(1, 1, 2023, 0);
    expect(solar).toEqual({ day: 22, month: 1, year: 2023 });
  });

  test("15/08/2023", () => {
    const solar = L2S(15, 8, 2023, 0);
    expect(solar).toEqual({ day: 29, month: 9, year: 2023 });
  });

  test("13/11/2023", () => {
    const solar = L2S(13, 11, 2023, 0);
    expect(solar).toEqual({ day: 25, month: 12, year: 2023 });
  });

  test("07/02/2020", () => {
    const solar = L2S(7, 2, 2020, 0);
    expect(solar).toEqual({ day: 29, month: 2, year: 2020 });
  });

  test("10/12/2022 UTC+8", () => {
    const solar = L2S(10, 12, 2022, 0, 8);
    expect(solar).toEqual({ day: 1, month: 1, year: 2023 });
  });
});
