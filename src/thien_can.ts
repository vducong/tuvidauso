import { LUONG_NGHI } from "./nap_am";

// Thiên can
export enum THIEN_CAN {
  GIAP = "Giáp",
  AT = "Ất",
  BINH = "Bính",
  DINH = "Đinh",
  MAU = "Mậu",
  KY = "Kỷ",
  CANH = "Canh",
  TAN = "Tân",
  NHAM = "Nhâm",
  QUY = "Quý",
}

export class ThienCan {
  private name: THIEN_CAN;
  private luongNghi: LUONG_NGHI;

  // Lượng hoá
  private luongHoa: number;

  constructor(name: THIEN_CAN, luongNghi: LUONG_NGHI, luongHoa: number) {
    this.name = name;
    this.luongNghi = luongNghi;
    this.luongHoa = luongHoa;
  }

  public getName(): THIEN_CAN {
    return this.name;
  }

  public getLuongHoa(): number {
    return this.luongHoa;
  }
}

export const THIEN_CAN_MAP: Record<THIEN_CAN, ThienCan> = {
  [THIEN_CAN.GIAP]: new ThienCan(THIEN_CAN.GIAP, LUONG_NGHI.DUONG, 0),
  [THIEN_CAN.AT]: new ThienCan(THIEN_CAN.AT, LUONG_NGHI.AM, 0),
  [THIEN_CAN.BINH]: new ThienCan(THIEN_CAN.BINH, LUONG_NGHI.DUONG, 1),
  [THIEN_CAN.DINH]: new ThienCan(THIEN_CAN.DINH, LUONG_NGHI.AM, 1),
  [THIEN_CAN.MAU]: new ThienCan(THIEN_CAN.MAU, LUONG_NGHI.DUONG, 2),
  [THIEN_CAN.KY]: new ThienCan(THIEN_CAN.KY, LUONG_NGHI.AM, 2),
  [THIEN_CAN.CANH]: new ThienCan(THIEN_CAN.CANH, LUONG_NGHI.DUONG, 3),
  [THIEN_CAN.TAN]: new ThienCan(THIEN_CAN.TAN, LUONG_NGHI.AM, 3),
  [THIEN_CAN.NHAM]: new ThienCan(THIEN_CAN.NHAM, LUONG_NGHI.DUONG, 4),
  [THIEN_CAN.QUY]: new ThienCan(THIEN_CAN.QUY, LUONG_NGHI.AM, 4),
};

export const THIEN_CAN_IN_ORDER: THIEN_CAN[] = [
  THIEN_CAN.GIAP,
  THIEN_CAN.AT,
  THIEN_CAN.BINH,
  THIEN_CAN.DINH,
  THIEN_CAN.MAU,
  THIEN_CAN.KY,
  THIEN_CAN.CANH,
  THIEN_CAN.TAN,
  THIEN_CAN.NHAM,
  THIEN_CAN.QUY,
];

// Thiên Can theo số cuối năm sinh
export const THIEN_CAN_YEAR_BY_LAST_DIGIT: THIEN_CAN[] = [
  THIEN_CAN.CANH,
  THIEN_CAN.TAN,
  THIEN_CAN.NHAM,
  THIEN_CAN.QUY,
  THIEN_CAN.GIAP,
  THIEN_CAN.AT,
  THIEN_CAN.BINH,
  THIEN_CAN.DINH,
  THIEN_CAN.MAU,
  THIEN_CAN.KY,
];
