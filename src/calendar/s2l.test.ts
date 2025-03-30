import { expect, test, describe } from "bun:test";
import { S2L } from "./s2l";

describe("Solar to Lunar date conversion", () => {
  test("22/01/2023", () => {
    const result = S2L({ dd: 22, mm: 1, yy: 2023 });
    expect(result.lunarDob).toEqual({ dd: 1, mm: 1, yy: 2023 });
    expect(result.lunarLeap).toBe(0);
  });

  test("29/09/2023", () => {
    const result = S2L({ dd: 29, mm: 9, yy: 2023 });
    expect(result.lunarDob).toEqual({ dd: 15, mm: 8, yy: 2023 });
    expect(result.lunarLeap).toBe(0);
  });

  test("25/12/2023", () => {
    const result = S2L({ dd: 25, mm: 12, yy: 2023 });
    expect(result.lunarDob).toEqual({ dd: 13, mm: 11, yy: 2023 });
    expect(result.lunarLeap).toBe(0);
  });

  test("29/02/2020", () => {
    const result = S2L({ dd: 29, mm: 2, yy: 2020 });
    expect(result.lunarDob).toEqual({ dd: 7, mm: 2, yy: 2020 });
    expect(result.lunarLeap).toBe(0);
  });

  test("01/01/2023 UTC+8", () => {
    const result = S2L({ dd: 1, mm: 1, yy: 2023 }, 8);
    expect(result.lunarDob).toEqual({ dd: 10, mm: 12, yy: 2022 });
    expect(result.lunarLeap).toBe(0);
  });
});
