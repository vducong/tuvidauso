import { DIA_CHI_IN_ORDER, type DIA_CHI } from "./dia_chi";
import { LUONG_NGHI } from "./nap_am";
import { NGU_HANH, NGU_HANH_MAP_BY_NAME, type NguHanh } from "./ngu_hanh";

export enum SAO_NAME {
  // Tử Vi tinh hệ (section 8.1)
  TU_VI = "Tử Vi",
  LIEM_TRINH = "Liêm Trinh",
  THIEN_DONG = "Thiên Đồng",
  VU_KHUC = "Vũ Khúc",
  THIEN_CO = "Thiên Cơ",
  THAI_DUONG = "Thái Dương",

  // Thiên Phủ tinh hệ (section 8.2)
  THIEN_PHU = "Thiên Phủ",
  THAI_AM = "Thái Âm",
  THAM_LANG = "Tham Lang",
  CU_MON = "Cự Môn",
  THIEN_TUONG = "Thiên Tướng",
  THIEN_LUONG = "Thiên Lương",
  THAT_SAT = "Thất Sát",
  PHA_QUAN = "Phá Quân",

  // Thái Tuế tinh hệ (section 8.3)
  THAI_TUE = "Thái Tuế",
  THIEU_DUONG = "Thiếu Dương",
  TANG_MON = "Tang Môn",
  THIEU_AM = "Thiếu Âm",
  QUAN_PHUF = "Quan Phù",
  TU_PHU = "Tử Phù",
  TUE_PHA = "Tuế Phá",
  LONG_DUC = "Long Đức",
  BACH_HO = "Bạch Hổ",
  PHUC_DUC = "Phúc Đức",
  DIEU_KHACH = "Điếu Khách",
  TRUC_PHU = "Trực Phù",

  // Lộc Tồn tinh hệ (section 8.4)
  LOC_TON = "Lộc Tồn",
  LUC_SI = "Lực Sỹ",
  THANH_LONG = "Thanh Long",
  TIEU_HAO = "Tiểu Hao",
  TUONG_QUAN = "Tướng Quân",
  TAU_THU = "Tấu Thư",
  PHI_LIEM = "Phi Liêm",
  HY_THAN = "Hỷ Thần",
  BENH_PHU = "Bệnh Phù",
  DAI_HAO = "Đại Hao",
  PHUC_BINH = "Phục Binh",
  QUAN_PHUR = "Quan Phủ",

  // Tràng Sinh tinh hệ (section 8.5)
  TRANG_SINH = "Tràng Sinh",
  MOC_DUC = "Mộc Dục",
  QUAN_DOI = "Quan Đới",
  LAM_QUAN = "Lâm Quan",
  DE_VUONG = "Đế Vượng",
  SUY = "Suy",
  BENH = "Bệnh",
  TU = "Tử",
  MO = "Mộ",
  TUYET = "Tuyệt",
  THAI = "Thai",
  DUONG = "Dưỡng",

  // Lục sát (section 8.6)
  KINH_DUONG = "Kình Dương",
  DA_LA = "Đà La",
  DIA_KIEP = "Địa Kiếp",
  DIA_KHONG = "Địa Không",
  HOA_TINH = "Hỏa Tinh",
  LINH_TINH = "Linh Tinh",

  // Tả Hữu (section 8.7)
  TA_PHU = "Tả Phù",
  HUU_BAT = "Hữu Bật",

  // Xương Khúc (section 8.8)
  VAN_XUONG = "Văn Xương",
  VAN_KHUC = "Văn Khúc",

  // Long Phượng (section 8.9)
  LONG_TRI = "Long Trì",
  PHUONG_CAC = "Phượng Các",

  // Khôi Việt (section 8.10)
  THIEN_KHOI = "Thiên Khôi",
  THIEN_VIET = "Thiên Việt",

  // Khốc Hư (section 8.11)
  THIEN_KHOC = "Thiên Khốc",
  THIEN_HU = "Thiên Hư",

  // Thai Tọa (section 8.12)
  TAM_THAI = "Tam Thai",
  BAT_TOA = "Bát Tọa",

  // Quang Quý (section 8.13)
  AN_QUANG = "Ân Quang",
  THIEN_QUY = "Thiên Quý",

  // Thiên, Nguyệt Đức (section 8.14)
  THIEN_DUC = "Thiên Đức",
  NGUYET_DUC = "Nguyệt Đức",

  // Hình, Riêu, Y (section 8.15)
  THIEN_HINH = "Thiên Hình",
  THIEN_RIEU = "Thiên Riêu",
  THIEN_Y = "Thiên Y",

  // Hồng Hỷ (section 8.16)
  HONG_LOAN = "Hồng Loan",
  THIEN_HY = "Thiên Hỷ",

  // Ấn Phù (section 8.17)
  QUOC_AN = "Quốc Ấn",
  DUONG_PHU = "Đường Phù",

  // Thiên Địa, Giải Thần (section 8.18)
  THIEN_GIAI = "Thiên Giải",
  DIA_GIAI = "Địa Giải",
  GIAI_THAN = "Giải Thần",

  // Thai Cáo (section 8.19)
  THAI_PHU = "Thai Phụ",
  PHONG_CAO = "Phong Cáo",

  // Tài Thọ (section 8.20)
  THIEN_TAI = "Thiên Tài",
  THIEN_THO = "Thiên Thọ",

  // Thương Sứ (section 8.21)
  THIEN_THUONG = "Thiên Thương",
  THIEN_SU = "Thiên Sứ",

  // La Võng (section 8.22)
  THIEN_LA = "Thiên La",
  DIA_VONG = "Địa Võng",

  // Tứ Hóa (section 8.23)
  HOA_LOC = "Hóa Lộc",
  HOA_QUYEN = "Hóa Quyền",
  HOA_KHOA = "Hóa Khoa",
  HOA_KY = "Hóa Kỵ",

  // Quan Phúc (section 8.24)
  THIEN_QUAN = "Thiên Quan",
  THIEN_PHUC = "Thiên Phúc",

  // Cô Quả (section 8.25)
  CO_THAN = "Cô Thần",
  QUA_TU = "Quả Tú",

  // Individual stars (sections 8.26-8.37)
  DAO_HOA = "Đào Hoa",
  THIEN_MA = "Thiên Mã",
  KIEP_SAT = "Kiếp Sát",
  PHA_TOAI = "Phá Toái",
  HOA_CAI = "Hoa Cái",
  LUU_HA = "Lưu Hà",
  THIEN_TRU = "Thiên Trù",
  LUU_NIEN_VAN_TINH = "Lưu Niên Văn Tinh",
  BAC_SY = "Bác Sỹ",
  DAU_QUAN = "Đẩu Quân",
  THIEN_KHONG = "Thiên Không",

  // Nhị Không (section 8.37)
  TUAN = "Tuần",
  TRIET = "Triệt",
}

// Tính lí
export enum TINH_LI {
  MIEU = "Miếu", // đại cát
  VUONG = "Vượng", // thứ cát
  DAC = "Đắc", // tiểu cát
  BINH = "Bình", // không cát không hung
  HAM = "Hãm", // hung
}

export enum SAO_CATEG {
  DE = "Đế tinh",
  PHUC = "Phúc tinh",
  THIEN = "Thiện tinh",
  QUY = "Quý tinh",
  PHU = "Phú tinh",
  QUYEN = "Quyền tinh",
  TAI = "Tài tinh",
  AM = "Ám tinh",
  DAM = "Dâm tinh",
  HAO = "Hao tinh",
  DUNG = "Dũng tinh",
  THO = "Thọ tinh",
  VAN = "Văn tinh",
  TRO = "Trợ tinh",
  BAI = "Bại tinh",
  HINH = "Hình tinh",
  HI = "Hỉ tinh",

  CAT = "Cát tinh",
  HUNG = "Hung tinh",
  SAT = "Sát tinh",
}

export class SaoManager {
  private saoMap: Record<SAO_NAME, Sao>;

  constructor() {
    this.saoMap = {
      [SAO_NAME.TU_VI]: new Sao({
        name: SAO_NAME.TU_VI,
        ctg: [SAO_CATEG.DE, SAO_CATEG.QUY],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THO,
        tinhLiPossibilities: [
          TINH_LI.BINH,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.BINH,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.BINH,
          TINH_LI.VUONG,
          TINH_LI.BINH,
        ],
      }),
      [SAO_NAME.LIEM_TRINH]: new Sao({
        name: SAO_NAME.LIEM_TRINH,
        ctg: [SAO_CATEG.HINH],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_DONG]: new Sao({
        name: SAO_NAME.THIEN_DONG,
        ctg: [SAO_CATEG.PHUC, SAO_CATEG.THO],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.VU_KHUC]: new Sao({
        name: SAO_NAME.VU_KHUC,
        ctg: [SAO_CATEG.TAI],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.KIM,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THAI_DUONG]: new Sao({
        name: SAO_NAME.THAI_DUONG,
        ctg: [SAO_CATEG.QUY],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.VUONG,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_CO]: new Sao({
        name: SAO_NAME.THIEN_CO,
        ctg: [SAO_CATEG.THIEN, SAO_CATEG.THO, SAO_CATEG.PHUC],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.MOC,
        tinhLiPossibilities: [
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_PHU]: new Sao({
        name: SAO_NAME.THIEN_PHU,
        ctg: [SAO_CATEG.QUYEN, SAO_CATEG.TAI],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.THO,
        tinhLiPossibilities: [
          TINH_LI.MIEU,
          TINH_LI.BINH,
          TINH_LI.MIEU,
          TINH_LI.BINH,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.BINH,
          TINH_LI.VUONG,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.THAI_AM]: new Sao({
        name: SAO_NAME.THAI_AM,
        ctg: [SAO_CATEG.PHU, SAO_CATEG.TAI],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
          TINH_LI.MIEU,
        ],
      }),
      [SAO_NAME.THAM_LANG]: new Sao({
        name: SAO_NAME.THAM_LANG,
        ctg: [SAO_CATEG.HUNG, SAO_CATEG.DAM],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.CU_MON]: new Sao({
        name: SAO_NAME.CU_MON,
        ctg: [SAO_CATEG.AM],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.THIEN_TUONG]: new Sao({
        name: SAO_NAME.THIEN_TUONG,
        ctg: [SAO_CATEG.QUYEN, SAO_CATEG.DUNG],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.THIEN_LUONG]: new Sao({
        name: SAO_NAME.THIEN_LUONG,
        ctg: [SAO_CATEG.THO, SAO_CATEG.PHUC],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.MOC,
        tinhLiPossibilities: [
          TINH_LI.VUONG,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THAT_SAT]: new Sao({
        name: SAO_NAME.THAT_SAT,
        ctg: [SAO_CATEG.QUYEN, SAO_CATEG.DUNG],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.KIM,
        tinhLiPossibilities: [
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.VUONG,
          TINH_LI.MIEU,
          TINH_LI.DAC,
          TINH_LI.MIEU,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.VUONG,
        ],
      }),
      [SAO_NAME.PHA_QUAN]: new Sao({
        name: SAO_NAME.PHA_QUAN,
        ctg: [SAO_CATEG.HUNG, SAO_CATEG.HAO],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.MIEU,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.MIEU,
          TINH_LI.VUONG,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.KINH_DUONG]: new Sao({
        name: SAO_NAME.KINH_DUONG,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.KIM,
        hanhPhu: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.DA_LA]: new Sao({
        name: SAO_NAME.KINH_DUONG,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.KIM,
        hanhPhu: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.HOA_TINH]: new Sao({
        name: SAO_NAME.HOA_TINH,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.HOA,
        hanhPhu: NGU_HANH.KIM,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.LINH_TINH]: new Sao({
        name: SAO_NAME.LINH_TINH,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.HOA,
        hanhPhu: NGU_HANH.KIM,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.VAN_XUONG]: new Sao({
        name: SAO_NAME.VAN_XUONG,
        ctg: [SAO_CATEG.VAN],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.KIM,
        hanhPhu: NGU_HANH.THO,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.VAN_KHUC]: new Sao({
        name: SAO_NAME.VAN_KHUC,
        ctg: [SAO_CATEG.VAN],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THUY,
        hanhPhu: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.THIEN_KHOI]: new Sao({
        name: SAO_NAME.THIEN_KHOI,
        ctg: [SAO_CATEG.QUY, SAO_CATEG.VAN, SAO_CATEG.PHUC],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.HOA,
        hanhPhu: NGU_HANH.KIM,
      }),
      [SAO_NAME.THIEN_VIET]: new Sao({
        name: SAO_NAME.THIEN_VIET,
        ctg: [SAO_CATEG.QUY, SAO_CATEG.VAN, SAO_CATEG.PHUC],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.HOA,
        hanhPhu: NGU_HANH.MOC,
      }),
      [SAO_NAME.TA_PHU]: new Sao({
        name: SAO_NAME.TA_PHU,
        ctg: [SAO_CATEG.TRO, SAO_CATEG.PHU],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THO,
        hanhPhu: NGU_HANH.KIM,
      }),
      [SAO_NAME.HUU_BAT]: new Sao({
        name: SAO_NAME.HUU_BAT,
        ctg: [SAO_CATEG.TRO, SAO_CATEG.PHU],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THUY,
        hanhPhu: NGU_HANH.THO,
      }),
      [SAO_NAME.LOC_TON]: new Sao({
        name: SAO_NAME.LOC_TON,
        ctg: [SAO_CATEG.QUY, SAO_CATEG.TAI],
        luongNghi: LUONG_NGHI.DUONG,
        hanhChinh: NGU_HANH.THO,
        hanhPhu: NGU_HANH.THUY,
      }),
      [SAO_NAME.DIA_KIEP]: new Sao({
        name: SAO_NAME.DIA_KIEP,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.DIA_KHONG]: new Sao({
        name: SAO_NAME.DIA_KHONG,
        ctg: [SAO_CATEG.SAT],
        luongNghi: LUONG_NGHI.AM,
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
        ],
      }),
      [SAO_NAME.THIEN_KHONG]: new Sao({
        name: SAO_NAME.THIEN_KHONG,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.HOA_LOC]: new Sao({
        name: SAO_NAME.HOA_LOC,
        ctg: [SAO_CATEG.TAI],
        hanhChinh: NGU_HANH.MOC,
        hanhPhu: NGU_HANH.THO,
      }),
      [SAO_NAME.HOA_QUYEN]: new Sao({
        name: SAO_NAME.HOA_QUYEN,
        ctg: [SAO_CATEG.QUYEN],
        hanhChinh: NGU_HANH.MOC,
        hanhPhu: NGU_HANH.THUY,
      }),
      [SAO_NAME.HOA_KHOA]: new Sao({
        name: SAO_NAME.HOA_KHOA,
        ctg: [SAO_CATEG.VAN, SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.MOC,
        hanhPhu: NGU_HANH.THUY,
      }),
      [SAO_NAME.HOA_KY]: new Sao({
        name: SAO_NAME.HOA_KY,
        ctg: [SAO_CATEG.AM],
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.DAI_HAO]: new Sao({
        name: SAO_NAME.DAI_HAO,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.TIEU_HAO]: new Sao({
        name: SAO_NAME.TIEU_HAO,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.TANG_MON]: new Sao({
        name: SAO_NAME.TANG_MON,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.MOC,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.BACH_HO]: new Sao({
        name: SAO_NAME.BACH_HO,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.MOC,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_KHOC]: new Sao({
        name: SAO_NAME.THIEN_KHOC,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_HU]: new Sao({
        name: SAO_NAME.THIEN_HU,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_MA]: new Sao({
        name: SAO_NAME.THIEN_MA,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_HINH]: new Sao({
        name: SAO_NAME.THIEN_HINH,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.HOA,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.THIEN_RIEU]: new Sao({
        name: SAO_NAME.THIEN_RIEU,
        ctg: [SAO_CATEG.AM, SAO_CATEG.DAM],
        hanhChinh: NGU_HANH.THUY,
        tinhLiPossibilities: [
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.HAM,
          TINH_LI.DAC,
          TINH_LI.DAC,
          TINH_LI.HAM,
        ],
      }),
      [SAO_NAME.LONG_TRI]: new Sao({
        name: SAO_NAME.LONG_TRI,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.PHUONG_CAC]: new Sao({
        name: SAO_NAME.PHUONG_CAC,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.MOC,
        hanhPhu: NGU_HANH.THO,
      }),
      [SAO_NAME.TAM_THAI]: new Sao({
        name: SAO_NAME.TAM_THAI,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.BAT_TOA]: new Sao({
        name: SAO_NAME.BAT_TOA,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.AN_QUANG]: new Sao({
        name: SAO_NAME.AN_QUANG,
        ctg: [SAO_CATEG.QUY, SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.THIEN_QUY]: new Sao({
        name: SAO_NAME.THIEN_QUY,
        ctg: [SAO_CATEG.QUY, SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DAO_HOA]: new Sao({
        name: SAO_NAME.DAO_HOA,
        ctg: [SAO_CATEG.DAM],
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.HONG_LOAN]: new Sao({
        name: SAO_NAME.HONG_LOAN,
        ctg: [SAO_CATEG.DAM],
        hanhChinh: NGU_HANH.THUY,
        hanhPhu: NGU_HANH.KIM,
      }),
      [SAO_NAME.THIEN_HY]: new Sao({
        name: SAO_NAME.THIEN_HY,
        ctg: [SAO_CATEG.HI],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.THAI_PHU]: new Sao({
        name: SAO_NAME.THAI_PHU,
        ctg: [SAO_CATEG.VAN],
        hanhChinh: NGU_HANH.KIM,
        hanhPhu: NGU_HANH.THO,
      }),
      [SAO_NAME.PHONG_CAO]: new Sao({
        name: SAO_NAME.PHONG_CAO,
        ctg: [SAO_CATEG.QUYEN, SAO_CATEG.VAN],
        hanhChinh: NGU_HANH.THO,
        hanhPhu: NGU_HANH.THUY,
      }),
      [SAO_NAME.QUOC_AN]: new Sao({
        name: SAO_NAME.QUOC_AN,
        ctg: [SAO_CATEG.QUYEN],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DUONG_PHU]: new Sao({
        name: SAO_NAME.DUONG_PHU,
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.THIEN_THO]: new Sao({
        name: SAO_NAME.THIEN_THO,
        ctg: [SAO_CATEG.THO, SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.BAC_SY]: new Sao({
        name: SAO_NAME.BAC_SY,
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.LUU_NIEN_VAN_TINH]: new Sao({
        name: SAO_NAME.LUU_NIEN_VAN_TINH,
        ctg: [SAO_CATEG.TAI],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.HOA_CAI]: new Sao({
        name: SAO_NAME.HOA_CAI,
        hanhChinh: NGU_HANH.KIM,
      }),
      [SAO_NAME.THIEN_TRU]: new Sao({
        name: SAO_NAME.THIEN_TRU,
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THIEN_QUAN]: new Sao({
        name: SAO_NAME.THIEN_QUAN,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THIEN_PHUC]: new Sao({
        name: SAO_NAME.THIEN_PHUC,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THIEN_GIAI]: new Sao({
        name: SAO_NAME.THIEN_GIAI,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.DIA_GIAI]: new Sao({
        name: SAO_NAME.DIA_GIAI,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.GIAI_THAN]: new Sao({
        name: SAO_NAME.GIAI_THAN,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.THIEN_DUC]: new Sao({
        name: SAO_NAME.THIEN_DUC,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.NGUYET_DUC]: new Sao({
        name: SAO_NAME.NGUYET_DUC,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THIEN_Y]: new Sao({
        name: SAO_NAME.THIEN_Y,
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.CO_THAN]: new Sao({
        name: SAO_NAME.CO_THAN,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.QUA_TU]: new Sao({
        name: SAO_NAME.QUA_TU,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DAU_QUAN]: new Sao({
        name: SAO_NAME.DAU_QUAN,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THIEN_THUONG]: new Sao({
        name: SAO_NAME.THIEN_THUONG,
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THIEN_SU]: new Sao({
        name: SAO_NAME.THIEN_SU,
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.KIEP_SAT]: new Sao({
        name: SAO_NAME.KIEP_SAT,
        ctg: [SAO_CATEG.SAT, SAO_CATEG.HUNG],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.LUU_HA]: new Sao({
        name: SAO_NAME.LUU_HA,
        ctg: [SAO_CATEG.HUNG],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.PHA_TOAI]: new Sao({
        name: SAO_NAME.PHA_TOAI,
        ctg: [SAO_CATEG.HUNG],
        hanhChinh: NGU_HANH.HOA,
        hanhPhu: NGU_HANH.KIM,
      }),
      [SAO_NAME.THIEN_TAI]: new Sao({
        name: SAO_NAME.THIEN_TAI,
        ctg: [SAO_CATEG.TRO],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THIEN_LA]: new Sao({
        name: SAO_NAME.THIEN_LA,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DIA_VONG]: new Sao({
        name: SAO_NAME.DIA_VONG,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THAI_TUE]: new Sao({
        name: SAO_NAME.THAI_TUE,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THIEU_DUONG]: new Sao({
        name: SAO_NAME.THIEU_DUONG,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THIEU_AM]: new Sao({
        name: SAO_NAME.THIEU_AM,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.QUAN_PHUR]: new Sao({
        name: SAO_NAME.QUAN_PHUR,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.TU_PHU]: new Sao({
        name: SAO_NAME.TU_PHU,
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.TRUC_PHU]: new Sao({
        name: SAO_NAME.TRUC_PHU,
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.TUE_PHA]: new Sao({
        name: SAO_NAME.TUE_PHA,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.LONG_DUC]: new Sao({
        name: SAO_NAME.LONG_DUC,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.PHUC_DUC]: new Sao({
        name: SAO_NAME.PHUC_DUC,
        ctg: [SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DIEU_KHACH]: new Sao({
        name: SAO_NAME.DIEU_KHACH,
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.LUC_SI]: new Sao({
        name: SAO_NAME.LUC_SI,
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.THANH_LONG]: new Sao({
        name: SAO_NAME.THANH_LONG,
        ctg: [SAO_CATEG.HI],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.TUONG_QUAN]: new Sao({
        name: SAO_NAME.TUONG_QUAN,
        ctg: [SAO_CATEG.QUYEN],
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.TAU_THU]: new Sao({
        name: SAO_NAME.TAU_THU,
        ctg: [SAO_CATEG.QUY],
        hanhChinh: NGU_HANH.KIM,
      }),
      [SAO_NAME.PHI_LIEM]: new Sao({
        name: SAO_NAME.PHI_LIEM,
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.HY_THAN]: new Sao({
        name: SAO_NAME.HY_THAN,
        ctg: [SAO_CATEG.HI],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.BENH_PHU]: new Sao({
        name: SAO_NAME.BENH_PHU,
        hanhChinh: NGU_HANH.THO,
        hanhPhu: NGU_HANH.MOC,
      }),
      [SAO_NAME.PHUC_BINH]: new Sao({
        name: SAO_NAME.PHUC_BINH,
        ctg: [SAO_CATEG.AM],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.QUAN_PHUF]: new Sao({
        name: SAO_NAME.QUAN_PHUF,
        ctg: [SAO_CATEG.HINH],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.TRANG_SINH]: new Sao({
        name: SAO_NAME.TRANG_SINH,
        ctg: [SAO_CATEG.THO, SAO_CATEG.PHUC],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.MOC_DUC]: new Sao({
        name: SAO_NAME.MOC_DUC,
        ctg: [SAO_CATEG.DAM],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.QUAN_DOI]: new Sao({
        name: SAO_NAME.QUAN_DOI,
        ctg: [SAO_CATEG.QUYEN],
        hanhChinh: NGU_HANH.KIM,
      }),
      [SAO_NAME.LAM_QUAN]: new Sao({
        name: SAO_NAME.LAM_QUAN,
        hanhChinh: NGU_HANH.KIM,
      }),
      [SAO_NAME.DE_VUONG]: new Sao({
        name: SAO_NAME.DE_VUONG,
        ctg: [SAO_CATEG.THO],
        hanhChinh: NGU_HANH.KIM,
      }),
      [SAO_NAME.SUY]: new Sao({
        name: SAO_NAME.SUY,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.BENH]: new Sao({
        name: SAO_NAME.BENH,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.HOA,
      }),
      [SAO_NAME.TU]: new Sao({
        name: SAO_NAME.TU,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THUY,
      }),
      [SAO_NAME.MO]: new Sao({
        name: SAO_NAME.MO,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.TUYET]: new Sao({
        name: SAO_NAME.TUYET,
        ctg: [SAO_CATEG.BAI],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.THAI]: new Sao({
        name: SAO_NAME.THAI,
        ctg: [SAO_CATEG.DAM],
        hanhChinh: NGU_HANH.THO,
      }),
      [SAO_NAME.DUONG]: new Sao({
        name: SAO_NAME.DUONG,
        hanhChinh: NGU_HANH.MOC,
      }),
      [SAO_NAME.TUAN]: new Sao({
        name: SAO_NAME.TUAN,
        ctg: [SAO_CATEG.TRO],
      }),
      [SAO_NAME.TRIET]: new Sao({
        name: SAO_NAME.TRIET,
        ctg: [SAO_CATEG.TRO],
      }),
    };
  }

  getSao(name: SAO_NAME): Sao {
    return this.saoMap[name];
  }
}

export class Sao {
  private name: SAO_NAME;
  private ctg?: SAO_CATEG[];
  private luongNghi?: LUONG_NGHI;

  // Hành chính
  private hanhChinh?: NguHanh;

  // Hành phụ
  // E.g. Kim đới Hoả: Kim = hành chính, Hoả = hành phụ
  private hanhPhu?: NguHanh;

  private tinhLi?: TINH_LI;
  private tinhLiPossibilities?: TINH_LI[];

  constructor(dto: {
    name: SAO_NAME;
    ctg?: SAO_CATEG[];
    luongNghi?: LUONG_NGHI;

    hanhChinh?: NGU_HANH;
    hanhPhu?: NGU_HANH;

    tinhLiPossibilities?: TINH_LI[];
  }) {
    this.name = dto.name;
    this.ctg = dto.ctg;
    this.tinhLiPossibilities = dto.tinhLiPossibilities;

    this.luongNghi = dto.luongNghi;

    this.hanhChinh = dto.hanhChinh
      ? NGU_HANH_MAP_BY_NAME[dto.hanhChinh]
      : undefined;
    this.hanhPhu = dto.hanhPhu ? NGU_HANH_MAP_BY_NAME[dto.hanhPhu] : undefined;
  }

  toJSON() {
    return {
      name: this.name,
      luongNghi: this.luongNghi,
      hanhChinh: this.hanhChinh?.toJSON(),
      hanhPhu: this.hanhPhu?.getName(),
      tinhLi: this.tinhLi,
    };
  }

  getName(): SAO_NAME {
    return this.name;
  }

  setTinhLi(diaChi: DIA_CHI) {
    if (!this.tinhLiPossibilities) {
      return undefined;
    }

    const idx = DIA_CHI_IN_ORDER.indexOf(diaChi);
    this.tinhLi = idx > 0 ? this.tinhLiPossibilities[idx] : undefined;
  }
}

export const saoManager = new SaoManager();
