// Ngũ hành nạp âm
// Lưỡng nghi
export enum LUONG_NGHI {
  DUONG = "Dương",
  AM = "Âm",
}

// Tam phân theo lưỡng nghi
export enum TAM_PHAN {
  THIEU_DUONG = "Thiếu Dương",
  DUONG_MINH = "Dương Minh",
  THAI_DUONG = "Thái Dương",

  THIEU_AM = "Thiếu Âm",
  QUYET_AM = "Quyết Âm",
  THAI_AM = "Thái Âm",
}

export class TamPhan {
  private name: TAM_PHAN;
  private luongNghi: LUONG_NGHI;

  // Lượng hoá
  private luongHoa: number;

  constructor(name: TAM_PHAN, luongNghi: LUONG_NGHI, luongHoa: number) {
    this.name = name;
    this.luongNghi = luongNghi;
    this.luongHoa = luongHoa;
  }

  getLuongNghi(): LUONG_NGHI {
    return this.luongNghi;
  }

  public getLuongHoa(): number {
    return this.luongHoa;
  }
}

export const TAM_PHAN_MAP: Record<TAM_PHAN, TamPhan> = {
  [TAM_PHAN.THIEU_DUONG]: new TamPhan(
    TAM_PHAN.THIEU_DUONG,
    LUONG_NGHI.DUONG,
    0
  ),
  [TAM_PHAN.DUONG_MINH]: new TamPhan(TAM_PHAN.DUONG_MINH, LUONG_NGHI.DUONG, 1),
  [TAM_PHAN.THAI_DUONG]: new TamPhan(TAM_PHAN.THAI_DUONG, LUONG_NGHI.DUONG, 2),

  [TAM_PHAN.THIEU_AM]: new TamPhan(TAM_PHAN.THIEU_AM, LUONG_NGHI.AM, 0),
  [TAM_PHAN.QUYET_AM]: new TamPhan(TAM_PHAN.QUYET_AM, LUONG_NGHI.AM, 1),
  [TAM_PHAN.THAI_AM]: new TamPhan(TAM_PHAN.THAI_AM, LUONG_NGHI.AM, 2),
};
