export enum NGU_HANH {
  KIM = "Kim",
  MOC = "Mộc",
  THUY = "Thủy",
  HOA = "Hỏa",
  THO = "Thổ",
}

export enum NGU_SAC {
  TRANG = "Trắng",
  XANH = "Xanh",
  DEN = "Đen",
  DO = "Đỏ",
  VANG = "Vàng",
}

export enum SVBT {
  SINH = "Sinh",
  VUONG = "Vượng",
  BAI = "Bại",
  TUYET = "Tuyệt",
}

export class NguHanh {
  private name: NGU_HANH;
  private nguSac: NGU_SAC;

  // Lượng hoá
  private luongHoa: number;

  constructor(name: NGU_HANH, nguSac: NGU_SAC, luongHoa: number) {
    this.name = name;
    this.nguSac = nguSac;
    this.luongHoa = luongHoa;
  }

  toJSON() {
    return {
      name: this.name,
      nguSac: this.nguSac,
    };
  }

  getName(): NGU_HANH {
    return this.name;
  }

  getNguSac(): NGU_SAC {
    return this.nguSac;
  }
}

export const NGU_HANH_MAP_BY_NAME: Record<NGU_HANH, NguHanh> = {
  [NGU_HANH.KIM]: new NguHanh(NGU_HANH.KIM, NGU_SAC.TRANG, 0),
  [NGU_HANH.THUY]: new NguHanh(NGU_HANH.THUY, NGU_SAC.DEN, 1),
  [NGU_HANH.HOA]: new NguHanh(NGU_HANH.HOA, NGU_SAC.DO, 2),
  [NGU_HANH.THO]: new NguHanh(NGU_HANH.THO, NGU_SAC.VANG, 3),
  [NGU_HANH.MOC]: new NguHanh(NGU_HANH.MOC, NGU_SAC.XANH, 4),
};

export const NGU_HANH_MAP_BY_LUONG_HOA: Record<number, NguHanh> = {
  0: NGU_HANH_MAP_BY_NAME[NGU_HANH.KIM],
  1: NGU_HANH_MAP_BY_NAME[NGU_HANH.THUY],
  2: NGU_HANH_MAP_BY_NAME[NGU_HANH.HOA],
  3: NGU_HANH_MAP_BY_NAME[NGU_HANH.THO],
  4: NGU_HANH_MAP_BY_NAME[NGU_HANH.MOC],
};

// Nguyên thể bản mệnh
export enum NGUYEN_THE_BAN_MENH {
  // Hành Kim (Metal)
  HAI_TRUNG_KIM = "Hải Trung Kim",
  KIM_BAC_KIM = "Kim Bạc Kim",
  BACH_LAP_KIM = "Bạch Lạp Kim",
  SA_TRUNG_KIM = "Sa Trung Kim",
  KIEM_PHONG_KIM = "Kiếm Phong Kim",
  THOA_XUYEN_KIM = "Thoa Xuyến Kim",

  // Hành Thủy (Water)
  GIAN_HA_THUY = "Giản Hạ Thủy",
  DAI_KHE_THUY = "Đại Khê Thủy",
  TRUONG_LUU_THUY = "Trường Lưu Thủy",
  THIEN_HA_THUY = "Thiên Hà Thủy",
  TUYEN_TRUNG_THUY = "Tuyền Trung Thủy",
  DAI_HAI_THUY = "Đại Hải Thủy",

  // Hành Mộc (Wood)
  TANG_DO_MOC = "Tang Đố Mộc",
  TUNG_BACH_MOC = "Tùng Bách Mộc",
  DAI_LAM_MOC = "Đại Lâm Mộc",
  DUONG_LIEU_MOC = "Dương Liễu Mộc",
  THACH_LUU_MOC = "Thạch Lựu Mộc",
  BINH_DIA_MOC = "Bình Địa Mộc",

  // Hành Hỏa (Fire)
  TICH_LICH_HOA = "Tích Lịch Hỏa",
  LO_TRUNG_HOA = "Lò Trung Hỏa",
  PHU_DANG_HOA = "Phú Đăng Hỏa",
  THIEN_THUONG_HOA = "Thiên Thượng Hỏa",
  SON_HA_HOA = "Sơn Hạ Hỏa",
  SON_DAU_HOA = "Sơn Đầu Hỏa",

  // Hành Thổ (Earth)
  BICH_THUONG_THO = "Bích Thượng Thổ",
  THANH_DAU_THO = "Thành Đầu Thổ",
  SA_TRUNG_THO = "Sa Trung Thổ",
  LO_BANG_THO = "Lộ Bàng Thổ",
  DAI_DICH_THO = "Đại Dịch Thổ",
  OC_THUONG_THO = "Ốc Thượng Thổ",
}

export class NguyenTheBanMenh {
  private name: NGUYEN_THE_BAN_MENH;
  private desc: string;

  private nguHanh: NGU_HANH;
  private luongHoa: number;

  constructor(
    name: NGUYEN_THE_BAN_MENH,
    desc: string,
    nguHanh: NGU_HANH,
    luongHoa: number
  ) {
    this.name = name;
    this.desc = desc;
    this.nguHanh = nguHanh;
    this.luongHoa = luongHoa;
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

  getLuongHoa(): number {
    return this.luongHoa;
  }
}

const BAN_MENH_BY_NAME: Record<NGUYEN_THE_BAN_MENH, NguyenTheBanMenh> = {
  [NGUYEN_THE_BAN_MENH.HAI_TRUNG_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.HAI_TRUNG_KIM,
    "Vàng dưới biển",
    NGU_HANH.KIM,
    1
  ),
  [NGUYEN_THE_BAN_MENH.KIM_BAC_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.KIM_BAC_KIM,
    "Vàng thỏi, lượng bạc nén",
    NGU_HANH.KIM,
    2
  ),
  [NGUYEN_THE_BAN_MENH.BACH_LAP_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.BACH_LAP_KIM,
    "Vàng trong nến trắng",
    NGU_HANH.KIM,
    3
  ),
  [NGUYEN_THE_BAN_MENH.SA_TRUNG_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.SA_TRUNG_KIM,
    "Vàng trong cát",
    NGU_HANH.KIM,
    4
  ),
  [NGUYEN_THE_BAN_MENH.KIEM_PHONG_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.KIEM_PHONG_KIM,
    "Vàng ở mũi kiếm",
    NGU_HANH.KIM,
    5
  ),
  [NGUYEN_THE_BAN_MENH.THOA_XUYEN_KIM]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.THOA_XUYEN_KIM,
    "Vàng làm trang sức",
    NGU_HANH.KIM,
    6
  ),

  // Hành Thủy (Water)
  [NGUYEN_THE_BAN_MENH.GIAN_HA_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.GIAN_HA_THUY,
    "Nước dưới khe",
    NGU_HANH.THUY,
    1
  ),
  [NGUYEN_THE_BAN_MENH.DAI_KHE_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.DAI_KHE_THUY,
    "Nước dưới khe lớn",
    NGU_HANH.THUY,
    2
  ),
  [NGUYEN_THE_BAN_MENH.TRUONG_LUU_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.TRUONG_LUU_THUY,
    "Nước chảy dòng lớn",
    NGU_HANH.THUY,
    3
  ),
  [NGUYEN_THE_BAN_MENH.THIEN_HA_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.THIEN_HA_THUY,
    "Nước ở sông trên trời",
    NGU_HANH.THUY,
    4
  ),
  [NGUYEN_THE_BAN_MENH.TUYEN_TRUNG_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.TUYEN_TRUNG_THUY,
    "Nước dưới suối",
    NGU_HANH.THUY,
    5
  ),
  [NGUYEN_THE_BAN_MENH.DAI_HAI_THUY]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.DAI_HAI_THUY,
    "Nước trong biển lớn",
    NGU_HANH.THUY,
    6
  ),

  // Hành Mộc (Wood)
  [NGUYEN_THE_BAN_MENH.TANG_DO_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.TANG_DO_MOC,
    "Gỗ cây dâu",
    NGU_HANH.MOC,
    1
  ),
  [NGUYEN_THE_BAN_MENH.TUNG_BACH_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.TUNG_BACH_MOC,
    "Gỗ cây tùng, bách",
    NGU_HANH.MOC,
    2
  ),
  [NGUYEN_THE_BAN_MENH.DAI_LAM_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.DAI_LAM_MOC,
    "Cây trong rừng lớn",
    NGU_HANH.MOC,
    3
  ),
  [NGUYEN_THE_BAN_MENH.DUONG_LIEU_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.DUONG_LIEU_MOC,
    "Gỗ cây liễu",
    NGU_HANH.MOC,
    4
  ),
  [NGUYEN_THE_BAN_MENH.THACH_LUU_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.THACH_LUU_MOC,
    "Gỗ cây thạch lựu",
    NGU_HANH.MOC,
    5
  ),
  [NGUYEN_THE_BAN_MENH.BINH_DIA_MOC]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.BINH_DIA_MOC,
    "Cây ở đồng bằng",
    NGU_HANH.MOC,
    6
  ),

  // Hành Hỏa (Fire)
  [NGUYEN_THE_BAN_MENH.TICH_LICH_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.TICH_LICH_HOA,
    "Lửa sấm sét",
    NGU_HANH.HOA,
    1
  ),
  [NGUYEN_THE_BAN_MENH.LO_TRUNG_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.LO_TRUNG_HOA,
    "Lửa trong lò",
    NGU_HANH.HOA,
    2
  ),
  [NGUYEN_THE_BAN_MENH.PHU_DANG_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.PHU_DANG_HOA,
    "Lửa ngọn đèn lớn",
    NGU_HANH.HOA,
    3
  ),
  [NGUYEN_THE_BAN_MENH.THIEN_THUONG_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.THIEN_THUONG_HOA,
    "Lửa trên trời",
    NGU_HANH.HOA,
    4
  ),
  [NGUYEN_THE_BAN_MENH.SON_HA_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.SON_HA_HOA,
    "Lửa dưới chân núi",
    NGU_HANH.HOA,
    5
  ),

  [NGUYEN_THE_BAN_MENH.SON_DAU_HOA]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.SON_DAU_HOA,
    "Lửa trên núi",
    NGU_HANH.HOA,
    6
  ),

  // Hành Thổ (Earth)
  [NGUYEN_THE_BAN_MENH.BICH_THUONG_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.BICH_THUONG_THO,
    "Đất trên vách",
    NGU_HANH.THO,
    1
  ),
  [NGUYEN_THE_BAN_MENH.THANH_DAU_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.THANH_DAU_THO,
    "Đất trên mặt thành",
    NGU_HANH.THO,
    2
  ),
  [NGUYEN_THE_BAN_MENH.SA_TRUNG_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.SA_TRUNG_THO,
    "Đất lẫn trong cát",
    NGU_HANH.THO,
    3
  ),
  [NGUYEN_THE_BAN_MENH.LO_BANG_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.LO_BANG_THO,
    "Đất giữa đường",
    NGU_HANH.THO,
    4
  ),
  [NGUYEN_THE_BAN_MENH.DAI_DICH_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.DAI_DICH_THO,
    "Đất thuộc một khu lớn",
    NGU_HANH.THO,
    5
  ),
  [NGUYEN_THE_BAN_MENH.OC_THUONG_THO]: new NguyenTheBanMenh(
    NGUYEN_THE_BAN_MENH.OC_THUONG_THO,
    "Đất trên nóc nhà",
    NGU_HANH.THO,
    6
  ),
};

export const BAN_MENH_BY_NGU_HANH: Record<
  NGU_HANH,
  Record<number, NguyenTheBanMenh>
> = {
  [NGU_HANH.KIM]: {
    1: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.HAI_TRUNG_KIM],
    2: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.KIM_BAC_KIM],
    3: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.BACH_LAP_KIM],
    4: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.SA_TRUNG_KIM],
    5: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.KIEM_PHONG_KIM],
    6: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.THOA_XUYEN_KIM],
  },
  [NGU_HANH.THUY]: {
    1: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.GIAN_HA_THUY],
    2: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.DAI_KHE_THUY],
    3: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.TRUONG_LUU_THUY],
    4: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.THIEN_HA_THUY],
    5: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.TUYEN_TRUNG_THUY],
    6: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.DAI_HAI_THUY],
  },
  [NGU_HANH.MOC]: {
    1: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.TANG_DO_MOC],
    2: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.TUNG_BACH_MOC],
    3: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.DAI_LAM_MOC],
    4: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.DUONG_LIEU_MOC],
    5: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.THACH_LUU_MOC],
    6: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.BINH_DIA_MOC],
  },
  [NGU_HANH.HOA]: {
    1: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.TICH_LICH_HOA],
    2: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.LO_TRUNG_HOA],
    3: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.PHU_DANG_HOA],
    4: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.THIEN_THUONG_HOA],
    5: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.SON_HA_HOA],
    6: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.SON_DAU_HOA],
  },
  [NGU_HANH.THO]: {
    1: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.BICH_THUONG_THO],
    2: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.THANH_DAU_THO],
    3: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.SA_TRUNG_THO],
    4: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.LO_BANG_THO],
    5: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.DAI_DICH_THO],
    6: BAN_MENH_BY_NAME[NGUYEN_THE_BAN_MENH.OC_THUONG_THO],
  },
};

// K: Kim, T: Thủy, H: Hỏa, O: Thổ, M: Mộc
export const BAN_MENH_BY_YYYY_DIACHI_THIENCAN = [
  ["K-1", "", "T-1", "", "H-1", "", "O-1", "", "M-1", ""],
  ["", "K-1", "", "T-1", "", "H-1", "", "O-1", "", "M-1"],
  ["T-2", "", "H-2", "", "O-2", "", "M-2", "", "K-2", ""],
  ["", "T-2", "", "H-2", "", "O-2", "", "M-2", "", "K-2"],
  ["H-3", "", "O-3", "", "M-3", "", "K-3", "", "T-3", ""],
  ["", "H-3", "", "O-3", "", "M-3", "", "K-3", "", "T-3"],
  ["K-4", "", "T-4", "", "H-4", "", "O-4", "", "M-4", ""],
  ["", "K-4", "", "T-4", "", "H-4", "", "O-4", "", "M-4"],
  ["T-5", "", "H-5", "", "O-5", "", "M-5", "", "K-5", ""],
  ["", "T-5", "", "H-5", "", "O-5", "", "M-5", "", "K-5"],
  ["H-6", "", "O-6", "", "M-6", "", "K-6", "", "T-6", ""],
  ["", "H-6", "", "O-6", "", "M-6", "", "K-6", "", "T-6"],
];
