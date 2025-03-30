import { jdFromDate } from "./calendar/lib";
import { S2L } from "./calendar/s2l";
import type { Dob } from "./calendar/type";
import type { GENDER } from "./constant";
import { NGU_CUC_BY_INDEX, NGU_CUC_THIENCAN_DIACHI, type NguCuc } from "./cuc";
import {
  DIA_CHI_IN_ORDER,
  DIA_CHI_MAP,
  DIA_CHI_YEAR_BY_DIGIT,
  type DiaChi,
} from "./dia_chi";
import { LUONG_NGHI } from "./nap_am";
import {
  BAN_MENH_BY_NGU_HANH,
  BAN_MENH_BY_YYYY_DIACHI_THIENCAN,
  NGU_HANH,
  type NguyenTheBanMenh,
} from "./ngu_hanh";
import {
  THIEN_CAN_IN_ORDER,
  THIEN_CAN_MAP,
  THIEN_CAN_YEAR_BY_LAST_DIGIT,
  type ThienCan,
} from "./thien_can";

export class ThienBan {
  private name: string;
  private gender: GENDER;

  private solarDob: Dob;
  private solarHh: number;
  private solarMm: number;

  private lunarDob: Dob;

  private hhThienCan: ThienCan;
  private hhDiaChi: DiaChi;

  private ddThienCan: ThienCan;
  private ddDiaChi: DiaChi;

  private monthThienCan: ThienCan;
  private monthDiaChi: DiaChi;

  private yyyyThienCan: ThienCan;
  private yyyyDiaChi: DiaChi;
  private yyyyLuongNghi: LUONG_NGHI;

  private cuc?: NguCuc;
  private banMenh: NguyenTheBanMenh;

  constructor(
    name: string,
    gender: GENDER,
    solarDob: Dob,
    solarHh: number,
    solarMm: number
  ) {
    this.name = name;
    this.gender = gender;

    this.solarDob = solarDob;
    this.solarHh = solarHh;
    this.solarMm = solarMm;

    this.lunarDob = S2L(solarDob).lunarDob;
    this.hhDiaChi = this.findHhDiaChi(solarHh, solarMm);

    [this.ddThienCan, this.ddDiaChi] = this.findDdCanChi(solarDob);
    this.hhThienCan = this.findHhThienCan(this.hhDiaChi, this.ddThienCan);

    this.yyyyThienCan = this.findYyyyThienCan(this.lunarDob);

    this.monthDiaChi = this.findMonthDiaChi(this.lunarDob);
    this.monthThienCan = this.findMonthThienCan(
      this.lunarDob,
      this.yyyyThienCan
    );

    this.yyyyDiaChi = this.findYyyyDiaChi(this.lunarDob);
    this.yyyyLuongNghi = this.findYyyyLuongNghi(this.yyyyThienCan);

    this.banMenh = this.findBanMenh(this.yyyyThienCan, this.yyyyDiaChi);
  }

  toJSON() {
    return {
      name: this.name,
      gender: this.gender,

      solarDob: this.solarDob,
      solarHh: this.solarHh,
      solarMm: this.solarMm,

      lunarDob: this.lunarDob,

      hhThienCan: this.hhThienCan.getName(),
      hhDiaChi: this.hhDiaChi.getName(),

      ddThienCan: this.ddThienCan.getName(),
      ddDiaChi: this.ddDiaChi.getName(),

      monthThienCan: this.monthThienCan.getName(),
      monthDiaChi: this.monthDiaChi.getName(),

      yyyyThienCan: this.yyyyThienCan.getName(),
      yyyyDiaChi: this.yyyyDiaChi.getName(),

      yyyyLuongNghi: this.yyyyLuongNghi,

      cuc: this.cuc?.toJSON(),
      banMenh: this.banMenh.toJSON(),
    };
  }

  getGender(): GENDER {
    return this.gender;
  }

  getLunarDob(): Dob {
    return this.lunarDob;
  }

  private findHhDiaChi(solarHh: number, solarMm: number): DiaChi {
    const idx = Math.floor((solarHh + 1) / 2) % 12;
    const diaChi = DIA_CHI_IN_ORDER[idx];
    if (!diaChi) {
      throw new Error(`Invalid dia chi index: ${idx}`);
    }
    return DIA_CHI_MAP[diaChi];
  }

  getHhDiaChi(): DiaChi {
    return this.hhDiaChi;
  }

  private findHhThienCan(hhDiaChi: DiaChi, ddThienCan: ThienCan): ThienCan {
    const thienCanIdx = THIEN_CAN_IN_ORDER.indexOf(ddThienCan.getName());

    let offset = thienCanIdx % 5;
    offset *= 2;

    let idx = DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName());
    idx += offset;
    idx %= 10;

    const name = THIEN_CAN_IN_ORDER[idx];
    if (!name) {
      throw new Error(`Invalid thien can index: ${idx}`);
    }
    return THIEN_CAN_MAP[name];
  }

  private findDdCanChi(solarDob: Dob): [ThienCan, DiaChi] {
    const jdn = jdFromDate(solarDob.dd, solarDob.mm, solarDob.yy);

    const can = THIEN_CAN_IN_ORDER[(jdn + 9) % 10];
    const chi = DIA_CHI_IN_ORDER[(jdn + 1) % 12];
    if (!can || !chi) {
      throw new Error(`Invalid can chi index: ${can} - ${chi}`);
    }
    return [THIEN_CAN_MAP[can], DIA_CHI_MAP[chi]];
  }

  private findMonthThienCan(lunarDob: Dob, yyyyThienCan: ThienCan): ThienCan {
    const yyyyThienCanIdx = THIEN_CAN_IN_ORDER.indexOf(yyyyThienCan.getName());

    let offset = yyyyThienCanIdx % 5; // Giáp Kỷ - Ất Canh - Bính Tân - Đinh Nhâm - Mậu Quý
    offset++;
    offset *= 2;

    let idx = (lunarDob.mm - 1) % 10;
    idx += offset;
    idx %= 10;

    const name = THIEN_CAN_IN_ORDER[idx];
    if (!name) {
      throw new Error(`Invalid thien can index: ${idx}`);
    }
    return THIEN_CAN_MAP[name];
  }

  private findMonthDiaChi(lunarDob: Dob): DiaChi {
    const idx = (lunarDob.mm + 1) % 12;
    const diaChi = DIA_CHI_IN_ORDER[idx];
    if (!diaChi) {
      throw new Error(`Invalid dia chi index: ${idx}`);
    }
    return DIA_CHI_MAP[diaChi];
  }

  private findYyyyThienCan(lunarDob: Dob): ThienCan {
    const lastDigit = lunarDob.yy % 10;
    const name = THIEN_CAN_YEAR_BY_LAST_DIGIT[lastDigit];
    if (!name) {
      throw new Error(`Invalid last digit: ${lastDigit}`);
    }
    return THIEN_CAN_MAP[name];
  }

  getYyyyThienCan(): ThienCan {
    return this.yyyyThienCan;
  }

  private findYyyyDiaChi(lunarDob: Dob): DiaChi {
    const idx = lunarDob.yy % 12;
    const diaChi = DIA_CHI_YEAR_BY_DIGIT[idx];
    if (!diaChi) {
      throw new Error(`Invalid dia chi index: ${idx}`);
    }
    return DIA_CHI_MAP[diaChi];
  }

  getYyyyDiaChi(): DiaChi {
    return this.yyyyDiaChi;
  }

  private findYyyyLuongNghi(thienCan: ThienCan): LUONG_NGHI {
    const idx = THIEN_CAN_YEAR_BY_LAST_DIGIT.indexOf(thienCan.getName());
    return idx % 2 === 0 ? LUONG_NGHI.DUONG : LUONG_NGHI.AM;
  }

  getYyyyLuongNghi(): LUONG_NGHI {
    return this.yyyyLuongNghi;
  }

  // Căn cứ vào can của tuổi và cung an Mệnh để lập Cục.
  findCuc(thienCan: ThienCan, cungAnMenh: DiaChi) {
    const row =
      NGU_CUC_THIENCAN_DIACHI[THIEN_CAN_IN_ORDER.indexOf(thienCan.getName())];
    if (!row) {
      throw new Error(`Invalid row: ${cungAnMenh.getLuongHoa()}`);
    }

    const cucIdx = row[DIA_CHI_IN_ORDER.indexOf(cungAnMenh.getName())];
    if (!cucIdx) {
      throw new Error(`Invalid ngu cuc index: ${cucIdx}`);
    }

    const cuc = NGU_CUC_BY_INDEX[cucIdx];
    if (!cuc) {
      throw new Error(`Invalid ngu cuc index: ${cucIdx}`);
    }
    this.cuc = cuc;
  }

  getCuc(): NguCuc {
    return this.cuc!;
  }

  findBanMenh(yyyyThienCan: ThienCan, yyyyDiaChi: DiaChi): NguyenTheBanMenh {
    const thienCanIndex = THIEN_CAN_IN_ORDER.indexOf(yyyyThienCan.getName());
    const diaChiIndex = DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName());

    const row = BAN_MENH_BY_YYYY_DIACHI_THIENCAN[diaChiIndex];
    if (!row) {
      throw new Error(`Invalid index: ${diaChiIndex}`);
    }

    const alias = row[thienCanIndex];
    if (alias === undefined) {
      throw new Error(`Invalid index: ${thienCanIndex}`);
    }

    let [nguHanhStr, luongHoaStr] = alias.split("-");
    if (!nguHanhStr || !luongHoaStr) {
      throw new Error(`Invalid alias: ${alias}`);
    }
    const luongHoa = parseInt(luongHoaStr, 10);

    let nguHanh: NGU_HANH;
    switch (nguHanhStr) {
      case "K":
        nguHanh = NGU_HANH.KIM;
        break;
      case "T":
        nguHanh = NGU_HANH.THUY;
        break;
      case "H":
        nguHanh = NGU_HANH.HOA;
        break;
      case "O":
        nguHanh = NGU_HANH.THO;
        break;
      case "M":
        nguHanh = NGU_HANH.MOC;
        break;
      default:
        throw new Error(`Invalid ngu hanh: ${nguHanhStr}`);
    }

    return BAN_MENH_BY_NGU_HANH[nguHanh][luongHoa]!;
  }

  getBanMenh(): NguyenTheBanMenh {
    return this.banMenh;
  }
}
