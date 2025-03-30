import { LUONG_NGHI } from "./nap_am";
import { NGU_HANH, NGU_HANH_MAP_BY_NAME, type NguHanh } from "./ngu_hanh";

export enum BAT_QUAI {
  KHAM = "Khảm",
  CAN = "Cấn",
  CHAN = "Chấn",
  TON = "Tốn",
  LI = "Li",
  KHON = "Khôn",
  DOAI = "Đoài",
  CANF = "Càn",
}

enum DIRECTION {
  BAC = "Bắc",
  DONG_BAC = "Đông Bắc",
  DONG = "Đông",
  DONG_NAM = "Đông Nam",
  NAM = "Nam",
  TAY_NAM = "Tây Nam",
  TAY = "Tây",
  TAY_BAC = "Tây Bắc",
}

export class BatQuai {
  private name: BAT_QUAI;
  private nguHanh: NguHanh;
  private direction: DIRECTION;
  private amDuong: LUONG_NGHI;

  constructor(
    name: BAT_QUAI,
    nguHanh: NguHanh,
    direction: DIRECTION,
    amDuong: LUONG_NGHI
  ) {
    this.name = name;
    this.nguHanh = nguHanh;
    this.direction = direction;
    this.amDuong = amDuong;
  }
}

export const BAT_QUAI_MAP: Record<BAT_QUAI, BatQuai> = {
  [BAT_QUAI.KHAM]: new BatQuai(
    BAT_QUAI.KHAM,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THUY],
    DIRECTION.BAC,
    LUONG_NGHI.DUONG
  ),
  [BAT_QUAI.CAN]: new BatQuai(
    BAT_QUAI.CAN,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO],
    DIRECTION.DONG_BAC,
    LUONG_NGHI.DUONG
  ),
  [BAT_QUAI.CHAN]: new BatQuai(
    BAT_QUAI.CHAN,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.MOC],
    DIRECTION.DONG,
    LUONG_NGHI.DUONG
  ),
  [BAT_QUAI.TON]: new BatQuai(
    BAT_QUAI.TON,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.MOC],
    DIRECTION.DONG_NAM,
    LUONG_NGHI.AM
  ),
  [BAT_QUAI.LI]: new BatQuai(
    BAT_QUAI.LI,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.HOA],
    DIRECTION.NAM,
    LUONG_NGHI.AM
  ),
  [BAT_QUAI.KHON]: new BatQuai(
    BAT_QUAI.KHON,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO],
    DIRECTION.TAY_NAM,
    LUONG_NGHI.AM
  ),
  [BAT_QUAI.DOAI]: new BatQuai(
    BAT_QUAI.DOAI,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.KIM],
    DIRECTION.TAY,
    LUONG_NGHI.AM
  ),
  [BAT_QUAI.CANF]: new BatQuai(
    BAT_QUAI.CANF,
    NGU_HANH_MAP_BY_NAME[NGU_HANH.KIM],
    DIRECTION.TAY_BAC,
    LUONG_NGHI.DUONG
  ),
};
