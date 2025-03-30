import { BAT_QUAI, BAT_QUAI_MAP, type BatQuai } from "./bat_quai";
import { LUONG_NGHI, TAM_PHAN, TAM_PHAN_MAP, TamPhan } from "./nap_am";
import {
  NGU_HANH,
  NGU_HANH_MAP_BY_NAME,
  NGU_SAC,
  type NguHanh,
} from "./ngu_hanh";

// Địa chi
export enum DIA_CHI {
  TI = "Tí",
  SUU = "Sửu",
  DAN = "Dần",
  MAO = "Mão",
  THIN = "Thìn",
  TY = "Tỵ",
  NGO = "Ngọ",
  MUI = "Mùi",
  THAN = "Thân",
  DAU = "Dậu",
  TUAT = "Tuất",
  HOI = "Hợi",
}

export class DiaChi {
  private name: DIA_CHI;
  private luongNghi: LUONG_NGHI;
  private tamPhan: TamPhan;
  private nguHanh: NguHanh;
  private nguSac: NGU_SAC;
  private batQuai?: BatQuai;

  constructor(
    name: DIA_CHI,
    tamPhan: TamPhan,
    nguHanh: NguHanh,
    batQuai?: BatQuai
  ) {
    this.name = name;
    this.luongNghi = tamPhan.getLuongNghi();
    this.tamPhan = tamPhan;
    this.nguHanh = nguHanh;
    this.nguSac = nguHanh.getNguSac();
    this.batQuai = batQuai;
  }

  toJSON() {
    return {
      name: this.name,
      luongNghi: this.luongNghi,
      nguHanh: this.nguHanh.getName(),
      nguSac: this.nguSac,
    };
  }

  getName(): DIA_CHI {
    return this.name;
  }

  getLuongHoa(): number {
    return this.tamPhan.getLuongHoa();
  }
}

export const DIA_CHI_MAP: Record<DIA_CHI, DiaChi> = {
  [DIA_CHI.TI]: new DiaChi(
    DIA_CHI.TI,
    TAM_PHAN_MAP[TAM_PHAN.THIEU_DUONG],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THUY],
    BAT_QUAI_MAP[BAT_QUAI.KHAM]
  ),
  [DIA_CHI.SUU]: new DiaChi(
    DIA_CHI.SUU,
    TAM_PHAN_MAP[TAM_PHAN.THIEU_DUONG],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO]
  ),
  [DIA_CHI.DAN]: new DiaChi(
    DIA_CHI.DAN,
    TAM_PHAN_MAP[TAM_PHAN.DUONG_MINH],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.MOC],
    BAT_QUAI_MAP[BAT_QUAI.CAN]
  ),
  [DIA_CHI.MAO]: new DiaChi(
    DIA_CHI.MAO,
    TAM_PHAN_MAP[TAM_PHAN.DUONG_MINH],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.MOC],
    BAT_QUAI_MAP[BAT_QUAI.CHAN]
  ),
  [DIA_CHI.THIN]: new DiaChi(
    DIA_CHI.THIN,
    TAM_PHAN_MAP[TAM_PHAN.THAI_DUONG],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO]
  ),
  [DIA_CHI.TY]: new DiaChi(
    DIA_CHI.TY,
    TAM_PHAN_MAP[TAM_PHAN.THAI_DUONG],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.HOA],
    BAT_QUAI_MAP[BAT_QUAI.TON]
  ),
  [DIA_CHI.NGO]: new DiaChi(
    DIA_CHI.NGO,
    TAM_PHAN_MAP[TAM_PHAN.THIEU_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.HOA],
    BAT_QUAI_MAP[BAT_QUAI.LI]
  ),
  [DIA_CHI.MUI]: new DiaChi(
    DIA_CHI.MUI,
    TAM_PHAN_MAP[TAM_PHAN.THIEU_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO]
  ),
  [DIA_CHI.THAN]: new DiaChi(
    DIA_CHI.THAN,
    TAM_PHAN_MAP[TAM_PHAN.QUYET_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.KIM],
    BAT_QUAI_MAP[BAT_QUAI.KHON]
  ),
  [DIA_CHI.DAU]: new DiaChi(
    DIA_CHI.DAU,
    TAM_PHAN_MAP[TAM_PHAN.QUYET_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.KIM],
    BAT_QUAI_MAP[BAT_QUAI.DOAI]
  ),
  [DIA_CHI.TUAT]: new DiaChi(
    DIA_CHI.TUAT,
    TAM_PHAN_MAP[TAM_PHAN.THAI_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THO]
  ),
  [DIA_CHI.HOI]: new DiaChi(
    DIA_CHI.HOI,
    TAM_PHAN_MAP[TAM_PHAN.THAI_AM],
    NGU_HANH_MAP_BY_NAME[NGU_HANH.THUY],
    BAT_QUAI_MAP[BAT_QUAI.CANF]
  ),
};

export const DIA_CHI_IN_ORDER: DIA_CHI[] = [
  DIA_CHI.TI,
  DIA_CHI.SUU,
  DIA_CHI.DAN,
  DIA_CHI.MAO,
  DIA_CHI.THIN,
  DIA_CHI.TY,
  DIA_CHI.NGO,
  DIA_CHI.MUI,
  DIA_CHI.THAN,
  DIA_CHI.DAU,
  DIA_CHI.TUAT,
  DIA_CHI.HOI,
];

export const DIA_CHI_YEAR_BY_DIGIT: DIA_CHI[] = [
  DIA_CHI.THAN,
  DIA_CHI.DAU,
  DIA_CHI.TUAT,
  DIA_CHI.HOI,
  DIA_CHI.TI,
  DIA_CHI.SUU,
  DIA_CHI.DAN,
  DIA_CHI.MAO,
  DIA_CHI.THIN,
  DIA_CHI.TY,
  DIA_CHI.NGO,
  DIA_CHI.MUI,
];
