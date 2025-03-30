import { NGU_HANH } from "./ngu_hanh";

// Ngũ cục
export class NguCuc {
  private nguHanh: NGU_HANH;
  private idx: number;
  private name: string;

  constructor(nguHanh: NGU_HANH, idx: number, name: string) {
    this.nguHanh = nguHanh;
    this.idx = idx;
    this.name = name;
  }

  toJSON() {
    return {
      name: this.name,
      nguHanh: this.nguHanh,
    };
  }

  getNguHanh(): NGU_HANH {
    return this.nguHanh;
  }

  getIdx(): number {
    return this.idx;
  }
}

export const NGU_CUC_MAP: Record<NGU_HANH, NguCuc> = {
  [NGU_HANH.THUY]: new NguCuc(NGU_HANH.THUY, 2, "Thuỷ nhị cục"),
  [NGU_HANH.MOC]: new NguCuc(NGU_HANH.MOC, 3, "Mộc tam cục"),
  [NGU_HANH.KIM]: new NguCuc(NGU_HANH.KIM, 4, "Kim tứ cục"),
  [NGU_HANH.THO]: new NguCuc(NGU_HANH.THO, 5, "Thổ ngũ cục"),
  [NGU_HANH.HOA]: new NguCuc(NGU_HANH.HOA, 6, "Hỏa lục cục"),
};

export const NGU_CUC_BY_INDEX: Record<number, NguCuc> = {
  2: NGU_CUC_MAP[NGU_HANH.THUY],
  3: NGU_CUC_MAP[NGU_HANH.MOC],
  4: NGU_CUC_MAP[NGU_HANH.KIM],
  5: NGU_CUC_MAP[NGU_HANH.THO],
  6: NGU_CUC_MAP[NGU_HANH.HOA],
};

export const NGU_CUC_THIENCAN_DIACHI: number[][] = [
  // GIÁP (0)
  [2, 2, 6, 6, 3, 3, 5, 5, 4, 4, 6, 6],
  // ẤT (1)
  [6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 5, 5],
  // BÍNH (2)
  [5, 5, 3, 3, 2, 2, 4, 4, 6, 6, 3, 3],
  // ĐINH (3)
  [3, 3, 4, 4, 6, 6, 2, 2, 5, 5, 4, 4],
  // MẬU (4)
  [4, 4, 2, 2, 5, 5, 6, 6, 3, 3, 2, 2],
  // KỶ (5) - Same as GIÁP
  [2, 2, 6, 6, 3, 3, 5, 5, 4, 4, 6, 6],
  // CANH (6) - Same as ẤT
  [6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 5, 5],
  // TÂN (7) - Same as BÍNH
  [5, 5, 3, 3, 2, 2, 4, 4, 6, 6, 3, 3],
  // NHÂM (8) - Same as ĐINH
  [3, 3, 4, 4, 6, 6, 2, 2, 5, 5, 4, 4],
  // QUÝ (9) - Same as MẬU
  [4, 4, 2, 2, 5, 5, 6, 6, 3, 3, 2, 2],
];
