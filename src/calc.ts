import type { Dob } from "./calendar/type";
import { CUNG_CHUC, GENDER } from "./constant";
import type { NguCuc } from "./cuc";

import { CUNG_DAN_IDX, DiaBan } from "./dia_ban";
import { DIA_CHI, DIA_CHI_IN_ORDER, DiaChi } from "./dia_chi";
import {
  CO_THAN_BY_YYYYDIACHI,
  CUNG_KHOI_LUU_NIEN_BY_YYYYDIACHI,
  HOA_TINH_BY_YYYYDIACHI,
  LINH_TINH_BY_YYYYDIACHI,
  LOC_TON_MAP,
  LUU_HA_BY_YYYYTHIENCAN,
  LUU_NIEN_VAN_TINH_BY_YYYYTHIENCAN,
  PHA_TOAI_BY_YYYYDIACHI,
  THIEN_KHOI_BY_YYYYTHIENCAN,
  THIEN_MA_BY_YYYYDIACHI,
  THIEN_PHUC_BY_YYYYTHIENCAN,
  THIEN_QUAN_BY_YYYYTHIENCAN,
  THIEN_TRU_BY_YYYYTHIENCAN,
  THIEN_VIET_BY_YYYYTHIENCAN,
  TRANG_SINH_MAP,
  TRIET_BY_YYYYTHIENCAN,
} from "./mapping";
import { LUONG_NGHI } from "./nap_am";
import type { NguyenTheBanMenh } from "./ngu_hanh";
import { SAO_NAME } from "./sao";
import { ThienBan } from "./thien_ban";
import { THIEN_CAN, THIEN_CAN_IN_ORDER, type ThienCan } from "./thien_can";

interface TuViCalculator {
  calc(
    name: string,
    gender: GENDER,
    solarDob: Dob,
    solarHh: number,
    solarMm: number
  ): Object;
}

export class PopularCalc implements TuViCalculator {
  constructor() {}

  calc(
    name: string,
    gender: GENDER,
    solarDob: Dob,
    solarHh: number,
    solarMm: number
  ): Object {
    const diaBan = new DiaBan();
    const thienBan = new ThienBan(name, gender, solarDob, solarHh, solarMm);

    const lunarDob = thienBan.getLunarDob();
    const hhDiaChi = thienBan.getHhDiaChi();
    const yyyyThienCan = thienBan.getYyyyThienCan();
    const yyyyDiaChi = thienBan.getYyyyDiaChi();
    const luongNghi = thienBan.getYyyyLuongNghi();

    const menhIdx = this.anCungChuc(
      diaBan,
      lunarDob,
      hhDiaChi,
      thienBan.getBanMenh()
    );
    this.anThan(diaBan, lunarDob, hhDiaChi);

    thienBan.findCuc(yyyyThienCan, diaBan.getCungViByIdx(menhIdx).getDiaChi());
    const cuc = thienBan.getCuc();

    const tuViIdx = this.anTuViTinhHe(diaBan, lunarDob, cuc);
    this.anThienPhuTinhHe(diaBan, tuViIdx);
    const thaiTueIdx = this.anThaiTueTinhHe(diaBan, yyyyDiaChi);

    const locTonIdx = this.anLocTonTinhHe(
      diaBan,
      yyyyThienCan,
      gender,
      luongNghi
    );
    this.anTrangSinhTinhHe(diaBan, cuc, gender, luongNghi);

    this.anKinhDuongDaLa(diaBan, locTonIdx);
    this.anDiaKhongDiaKiep(diaBan, hhDiaChi);

    // Hoả Tinh - Linh Tinh
    this.anHoaTinh(diaBan, hhDiaChi, yyyyDiaChi, gender, luongNghi);
    this.anLinhTinh(diaBan, hhDiaChi, yyyyDiaChi, gender, luongNghi);

    // Tả Hữu
    const taPhuIdx = this.anTaPhu(diaBan, lunarDob);
    const huuBatIdx = this.anHuuBat(diaBan, lunarDob);

    // Xương Khúc
    const vanXuongIdx = this.anVanXuong(diaBan, hhDiaChi);
    const vanKhucIdx = this.anVanKhuc(diaBan, hhDiaChi);

    // Long Phượng
    this.anLongTri(diaBan, yyyyDiaChi);
    const phuongCacIdx = this.anPhuongCac(diaBan, yyyyDiaChi);

    this.anKhoiViet(diaBan, yyyyThienCan);
    this.anKhocHu(diaBan, yyyyDiaChi);

    // Thai Toạ
    this.anTamThai(diaBan, lunarDob, taPhuIdx);
    this.anBatToa(diaBan, lunarDob, huuBatIdx);

    // Quang Quý
    this.anAnQuang(diaBan, lunarDob, vanXuongIdx);
    this.anThienQuy(diaBan, lunarDob, vanKhucIdx);

    // Thiên, Nguyệt Đức
    this.anThienDuc(diaBan, yyyyDiaChi);
    this.anNguyetDuc(diaBan, yyyyDiaChi);

    this.anHinhRieuY(diaBan, lunarDob);
    this.anHongHy(diaBan, yyyyDiaChi);
    this.anAnPhu(diaBan, locTonIdx);
    this.anThienDiaGiaiThan(diaBan, lunarDob, phuongCacIdx);
    this.anThaiCao(diaBan, vanKhucIdx);
    this.anTaiTho(diaBan, yyyyDiaChi);
    this.anThuongSu(diaBan);
    this.anLaVong(diaBan);
    this.anTuHoa(diaBan, yyyyThienCan);
    this.anQuanPhuc(diaBan, yyyyThienCan);
    this.anCoQua(diaBan, yyyyDiaChi);
    this.anMaCaiKiepDao(diaBan, yyyyDiaChi);
    this.anPhaToai(diaBan, yyyyDiaChi);
    this.anLuuHa(diaBan, yyyyThienCan);
    this.anThienTru(diaBan, yyyyThienCan);
    this.anLuuNienVanTinh(diaBan, yyyyThienCan);
    this.anBacSi(diaBan, locTonIdx);
    this.anDauQuan(diaBan, lunarDob, hhDiaChi, thaiTueIdx);
    this.anThienKhong(diaBan, thaiTueIdx);
    this.anTuan(diaBan, yyyyThienCan, yyyyDiaChi);
    this.anTriet(diaBan, yyyyThienCan);

    this.khoiDaiHan(diaBan, luongNghi, gender, cuc);
    this.calcLuuNienTieuHan(diaBan, yyyyDiaChi, gender);

    return {
      diaBan: diaBan.toJSON(),
      thienBan: thienBan.toJSON(),
    };
  }

  private anCungChuc(
    diaBan: DiaBan,
    lunarDob: Dob,
    hhDiaChi: DiaChi,
    banMenh: NguyenTheBanMenh
  ): number {
    const menhIdx = this.anMenh(diaBan, lunarDob, hhDiaChi, banMenh);
    this.anCungChucByMenh(diaBan, menhIdx);
    return menhIdx;
  }

  // Bắt đầu từ cung Dần là tháng Giêng,
  // đếm theo chiều thuận đến tháng sinh,
  // ngừng tại cung nào gọi là giờ Tý,
  // đếm theo chiều nghịch đến giờ sinh,
  // ngừng tại cung nào an Mệnh Viên ở cung đó
  private anMenh(
    diaBan: DiaBan,
    lunarDob: Dob,
    hhDiaChi: DiaChi,
    banMenh: NguyenTheBanMenh
  ): number {
    const monthIdx = cw(CUNG_DAN_IDX, lunarDob.mm - 1);
    const menhIdx = ccw(monthIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    diaBan.anCungChuc(menhIdx, CUNG_CHUC.MENH);
    diaBan.setSvbt(banMenh.getNguHanh());

    return menhIdx;
  }

  // Sau khi đã an Mệnh, bắt đầu theo chiều thuận, thứ tự an các cung:
  // Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Tức,
  // Thê Thiếp (hay Phu Quân nếu là số đàn bà), Huynh Đệ
  private anCungChucByMenh(diaBan: DiaBan, menhIdx: number) {
    diaBan.anCungChuc(cw(menhIdx, 1), CUNG_CHUC.PHU_MAU);
    diaBan.anCungChuc(cw(menhIdx, 2), CUNG_CHUC.PHUC_DUC);
    diaBan.anCungChuc(cw(menhIdx, 3), CUNG_CHUC.DIEN_TRACH);
    diaBan.anCungChuc(cw(menhIdx, 4), CUNG_CHUC.QUAN_LOC);
    diaBan.anCungChuc(cw(menhIdx, 5), CUNG_CHUC.NO_BOC);
    diaBan.anCungChuc(cw(menhIdx, 6), CUNG_CHUC.THIEN_DI);
    diaBan.anCungChuc(cw(menhIdx, 7), CUNG_CHUC.TAT_ACH);
    diaBan.anCungChuc(cw(menhIdx, 8), CUNG_CHUC.TAI_BACH);
    diaBan.anCungChuc(cw(menhIdx, 9), CUNG_CHUC.TU_TUC);
    diaBan.anCungChuc(cw(menhIdx, 10), CUNG_CHUC.PHU_THE);
    diaBan.anCungChuc(cw(menhIdx, 11), CUNG_CHUC.HUYNH_DE);
  }

  // Bắt đầu từ cung Dần là tháng Giêng,
  // đếm theo chiều thuận đến tháng sinh,
  // ngừng tại cung nào gọi là giờ Tý,
  // đếm theo chiều thuận đến giờ sinh ngừng tại cung nào an Thân ở cung đó
  private anThan(diaBan: DiaBan, lunarDob: Dob, hhDiaChi: DiaChi) {
    const monthIdx = cw(CUNG_DAN_IDX, lunarDob.mm - 1);
    const thanIdx = cw(monthIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    diaBan.anThan(thanIdx);
  }

  // Tử Vi tinh hệ: Tử Vi, Liêm Trinh, Thiên Đồng, Vũ Khúc, Thiên Cơ
  // Sau khi an Tử Vi, đếm theo chiều thuận bỏ qua ba cung an Liêm Trinh,
  // bỏ qua hai cung an Thiên Đồng, an Vũ Khúc, an Thái Dương,
  // bỏ qua một cung an Thiên Cơ
  private anTuViTinhHe(diaBan: DiaBan, lunarDob: Dob, cuc: NguCuc): number {
    const tuViIdx = this.anSaoTuVi(diaBan, lunarDob, cuc);

    diaBan.getCungViByIdx(cw(tuViIdx, 4)).addSao(SAO_NAME.LIEM_TRINH);
    diaBan.getCungViByIdx(cw(tuViIdx, 7)).addSao(SAO_NAME.THIEN_DONG);
    diaBan.getCungViByIdx(cw(tuViIdx, 8)).addSao(SAO_NAME.VU_KHUC);
    diaBan.getCungViByIdx(cw(tuViIdx, 9)).addSao(SAO_NAME.THAI_DUONG);
    diaBan.getCungViByIdx(cw(tuViIdx, 11)).addSao(SAO_NAME.THIEN_CO);

    return tuViIdx;
  }

  private anSaoTuVi(diaBan: DiaBan, lunarDob: Dob, cuc: NguCuc): number {
    const cucIdx = cuc.getIdx();
    const a = cucIdx - (lunarDob.dd % cucIdx);
    const b = Math.ceil(lunarDob.dd / cucIdx);

    let tuViIdx = cw(CUNG_DAN_IDX, b - 1);
    tuViIdx = a % 2 === 0 ? cw(tuViIdx, a) : ccw(tuViIdx, a);
    diaBan.getCungViByIdx(tuViIdx).addSao(SAO_NAME.TU_VI);

    return tuViIdx;
  }

  // Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân
  // Thiên Phủ luôn đối xứng với Tử Vi qua trục Dần – Thân
  private anThienPhuTinhHe(diaBan: DiaBan, tuViIdx: number) {
    const thienPhuIdx = this.findThienPhuIdx(tuViIdx);

    diaBan.getCungViByIdx(thienPhuIdx).addSao(SAO_NAME.THIEN_PHU);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 1)).addSao(SAO_NAME.THAI_AM);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 2)).addSao(SAO_NAME.THAM_LANG);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 3)).addSao(SAO_NAME.CU_MON);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 4)).addSao(SAO_NAME.THIEN_TUONG);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 5)).addSao(SAO_NAME.THIEN_LUONG);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 6)).addSao(SAO_NAME.THAT_SAT);
    diaBan.getCungViByIdx(cw(thienPhuIdx, 10)).addSao(SAO_NAME.PHA_QUAN);
  }

  private findThienPhuIdx(tuViIdx: number) {
    if (tuViIdx === CUNG_DAN_IDX || tuViIdx === CUNG_DAN_IDX + 6) {
      return tuViIdx;
    }
    return ccw(CUNG_DAN_IDX, tuViIdx - CUNG_DAN_IDX);
  }

  // Thiếu Dương, Tang Môn, Thiếu Âm, Quan Phù, Tử Phù, Tuế Phá, Long Đức, Bạch Hổ,
  // Phúc Đức, Điếu Khách, Trực Phù
  private anThaiTueTinhHe(diaBan: DiaBan, yyyyDiaChi: DiaChi): number {
    const thaiTueIdx = diaBan.getCungViByDiaChi(yyyyDiaChi.getName()).getIdx();

    diaBan.getCungViByIdx(thaiTueIdx).addSao(SAO_NAME.THAI_TUE);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 1)).addSao(SAO_NAME.THIEU_DUONG);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 2)).addSao(SAO_NAME.TANG_MON);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 3)).addSao(SAO_NAME.THIEU_AM);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 4)).addSao(SAO_NAME.QUAN_PHUF);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 5)).addSao(SAO_NAME.TU_PHU);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 6)).addSao(SAO_NAME.TUE_PHA);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 7)).addSao(SAO_NAME.LONG_DUC);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 8)).addSao(SAO_NAME.BACH_HO);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 9)).addSao(SAO_NAME.PHUC_DUC);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 10)).addSao(SAO_NAME.DIEU_KHACH);
    diaBan.getCungViByIdx(cw(thaiTueIdx, 11)).addSao(SAO_NAME.TRUC_PHU);

    return thaiTueIdx;
  }

  // Lực Sỹ, Thanh Long, Tiểu Hao, Tướng Quân, Tấu Thư, Phi Liêm, Hỷ Thần, Bệnh Phù,
  // Đại Hao, Phục Binh, Quan Phủ
  private anLocTonTinhHe(
    diaBan: DiaBan,
    yyyyThienCan: ThienCan,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ): number {
    const diaChiName = LOC_TON_MAP[yyyyThienCan.getName()];
    const locTonIdx = diaBan.getCungViByDiaChi(diaChiName).getIdx();
    diaBan.getCungViByIdx(locTonIdx).addSao(SAO_NAME.LOC_TON);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    diaBan.getCungViByIdx(moveFn(locTonIdx, 1)).addSao(SAO_NAME.LUC_SI);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 2)).addSao(SAO_NAME.THANH_LONG);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 3)).addSao(SAO_NAME.TIEU_HAO);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 4)).addSao(SAO_NAME.TUONG_QUAN);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 5)).addSao(SAO_NAME.TAU_THU);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 6)).addSao(SAO_NAME.PHI_LIEM);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 7)).addSao(SAO_NAME.HY_THAN);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 8)).addSao(SAO_NAME.BENH_PHU);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 9)).addSao(SAO_NAME.DAI_HAO);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 10)).addSao(SAO_NAME.PHUC_BINH);
    diaBan.getCungViByIdx(moveFn(locTonIdx, 11)).addSao(SAO_NAME.QUAN_PHUR);

    return locTonIdx;
  }

  // Mộc Dục, Quan Đới, Lâm Quan, Đế Vượng, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng
  private anTrangSinhTinhHe(
    diaBan: DiaBan,
    cuc: NguCuc,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const diaChiName = TRANG_SINH_MAP[cuc.getNguHanh()];
    const trangSinhIdx = diaBan.getCungViByDiaChi(diaChiName).getIdx();
    diaBan.getCungViByIdx(trangSinhIdx).addSao(SAO_NAME.TRANG_SINH);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 1)).addSao(SAO_NAME.MOC_DUC);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 2)).addSao(SAO_NAME.QUAN_DOI);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 3)).addSao(SAO_NAME.LAM_QUAN);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 4)).addSao(SAO_NAME.DE_VUONG);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 5)).addSao(SAO_NAME.SUY);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 6)).addSao(SAO_NAME.BENH);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 7)).addSao(SAO_NAME.TU);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 8)).addSao(SAO_NAME.MO);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 9)).addSao(SAO_NAME.TUYET);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 10)).addSao(SAO_NAME.THAI);
    diaBan.getCungViByIdx(moveFn(trangSinhIdx, 11)).addSao(SAO_NAME.DUONG);
  }

  // Kình Dương - Đà La ở 2 bên Lộc Tồn
  private anKinhDuongDaLa(diaBan: DiaBan, locTonIdx: number) {
    diaBan.getCungViByIdx(cw(locTonIdx, 1)).addSao(SAO_NAME.KINH_DUONG);
    diaBan.getCungViByIdx(ccw(locTonIdx, 1)).addSao(SAO_NAME.DA_LA);
  }

  // Địa Không - Địa Kiếp
  private anDiaKhongDiaKiep(diaBan: DiaBan, hhDiaChi: DiaChi) {
    const cungHoi = diaBan.getCungViByDiaChi(DIA_CHI.HOI).getIdx();
    const steps = DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName());
    diaBan.getCungViByIdx(cw(cungHoi, steps)).addSao(SAO_NAME.DIA_KIEP);
    diaBan.getCungViByIdx(ccw(cungHoi, steps)).addSao(SAO_NAME.DIA_KHONG);
  }

  // Hoả Tinh
  private anHoaTinh(
    diaBan: DiaBan,
    hhDiaChi: DiaChi,
    yyyyDiaChi: DiaChi,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const startIdx = diaBan
      .getCungViByDiaChi(HOA_TINH_BY_YYYYDIACHI[yyyyDiaChi.getName()])
      .getIdx();
    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;
    diaBan
      .getCungViByIdx(
        moveFn(startIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()))
      )
      .addSao(SAO_NAME.HOA_TINH);
  }

  // Linh Tinh
  private anLinhTinh(
    diaBan: DiaBan,
    hhDiaChi: DiaChi,
    yyyyDiaChi: DiaChi,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const startIdx = diaBan
      .getCungViByDiaChi(LINH_TINH_BY_YYYYDIACHI[yyyyDiaChi.getName()])
      .getIdx();
    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? ccw
        : cw;
    diaBan
      .getCungViByIdx(
        moveFn(startIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()))
      )
      .addSao(SAO_NAME.LINH_TINH);
  }

  // Tả Phù
  private anTaPhu(diaBan: DiaBan, lunarDob: Dob): number {
    const cungThin = diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    const idx = cw(cungThin, lunarDob.mm - 1);
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.TA_PHU);
    return idx;
  }

  // Hữu Bật
  private anHuuBat(diaBan: DiaBan, lunarDob: Dob): number {
    const cungTuat = diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, lunarDob.mm - 1);
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.HUU_BAT);
    return idx;
  }

  // Văn Xương
  private anVanXuong(diaBan: DiaBan, hhDiaChi: DiaChi): number {
    const cungTuat = diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.VAN_XUONG);
    return idx;
  }

  // Văn Khúc
  private anVanKhuc(diaBan: DiaBan, hhDiaChi: DiaChi): number {
    const cungThin = diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    const idx = cw(cungThin, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.VAN_KHUC);
    return idx;
  }

  // Long Trì
  private anLongTri(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungThin = diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    diaBan
      .getCungViByIdx(
        cw(cungThin, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.LONG_TRI);
  }

  // Phượng Các
  private anPhuongCac(diaBan: DiaBan, yyyyDiaChi: DiaChi): number {
    const cungTuat = diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()));
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.PHUONG_CAC);
    return idx;
  }

  // Khôi Việt
  private anKhoiViet(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    diaBan
      .getCungViByDiaChi(THIEN_KHOI_BY_YYYYTHIENCAN[yyyyThienCan.getName()])
      .addSao(SAO_NAME.THIEN_KHOI);
    diaBan
      .getCungViByDiaChi(THIEN_VIET_BY_YYYYTHIENCAN[yyyyThienCan.getName()])
      .addSao(SAO_NAME.THIEN_VIET);
  }

  // Khốc Hư
  // Thiên Khốc, Thiên Hư cùng với Song Hao, Tang Môn, Bạch Hổ hợp thành bộ Lục Bại
  // Thiên Hư bao giờ cũng đồng cung với Tuế Phá
  private anKhocHu(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungNgo = diaBan.getCungViByDiaChi(DIA_CHI.NGO).getIdx();
    diaBan
      .getCungViByIdx(
        ccw(cungNgo, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_KHOC);

    diaBan
      .getCungViByIdx(
        cw(cungNgo, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_HU);
  }

  // Tam Thai
  private anTamThai(diaBan: DiaBan, lunarDob: Dob, taPhuIdx: number) {
    diaBan
      .getCungViByIdx(cw(taPhuIdx, lunarDob.dd - 1))
      .addSao(SAO_NAME.TAM_THAI);
  }

  // Bát Toạ
  private anBatToa(diaBan: DiaBan, lunarDob: Dob, huuBatIdx: number) {
    diaBan
      .getCungViByIdx(ccw(huuBatIdx, lunarDob.dd - 1))
      .addSao(SAO_NAME.BAT_TOA);
  }

  // Ân Quang
  private anAnQuang(diaBan: DiaBan, lunarDob: Dob, vanXuongIdx: number) {
    diaBan
      .getCungViByIdx(ccw(cw(vanXuongIdx, lunarDob.dd - 1), 1))
      .addSao(SAO_NAME.AN_QUANG);
  }

  // Thiên Quý
  private anThienQuy(diaBan: DiaBan, lunarDob: Dob, vanKhucIdx: number) {
    diaBan
      .getCungViByIdx(cw(ccw(vanKhucIdx, lunarDob.dd - 1), 1))
      .addSao(SAO_NAME.THIEN_QUY);
  }

  // Thiên Đức
  private anThienDuc(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungDau = diaBan.getCungViByDiaChi(DIA_CHI.DAU).getIdx();
    diaBan
      .getCungViByIdx(
        cw(cungDau, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_DUC);
  }

  // Nguyệt Đức
  private anNguyetDuc(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungTy = diaBan.getCungViByDiaChi(DIA_CHI.TY).getIdx();
    diaBan
      .getCungViByIdx(
        cw(cungTy, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.NGUYET_DUC);
  }

  // Thiên Hình, Thiên Riêu, Thiên Y
  private anHinhRieuY(diaBan: DiaBan, lunarDob: Dob) {
    const cungDau = diaBan.getCungViByDiaChi(DIA_CHI.DAU).getIdx();
    diaBan
      .getCungViByIdx(cw(cungDau, lunarDob.mm - 1))
      .addSao(SAO_NAME.THIEN_HINH);

    const cungSuu = diaBan.getCungViByDiaChi(DIA_CHI.SUU).getIdx();
    const thienRieuIdx = cw(cungSuu, lunarDob.mm - 1);
    diaBan.getCungViByIdx(thienRieuIdx).addSao(SAO_NAME.THIEN_RIEU);

    diaBan.getCungViByIdx(thienRieuIdx).addSao(SAO_NAME.THIEN_Y);
  }

  // Hồng Loan, Thiên Hỷ
  // Thiên Hỷ an ở cung đối với cung an Hồng Loan
  private anHongHy(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungMao = diaBan.getCungViByDiaChi(DIA_CHI.MAO).getIdx();
    const hongLoanIdx = ccw(
      cungMao,
      DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName())
    );
    diaBan.getCungViByIdx(hongLoanIdx).addSao(SAO_NAME.HONG_LOAN);

    diaBan.getCungViByIdx(cw(hongLoanIdx, 6)).addSao(SAO_NAME.THIEN_HY);
  }

  // Quốc Ấn, Đường Phù
  private anAnPhu(diaBan: DiaBan, locTonIdx: number) {
    diaBan.getCungViByIdx(cw(locTonIdx, 8)).addSao(SAO_NAME.QUOC_AN);
    diaBan.getCungViByIdx(ccw(locTonIdx, 7)).addSao(SAO_NAME.DUONG_PHU);
  }

  // Thiên Giải, Địa Giải, Giải Thần
  private anThienDiaGiaiThan(
    diaBan: DiaBan,
    lunarDob: Dob,
    phuongCacIdx: number
  ): void {
    const cungThan = diaBan.getCungViByDiaChi(DIA_CHI.THAN).getIdx();
    diaBan
      .getCungViByIdx(cw(cungThan, lunarDob.mm - 1))
      .addSao(SAO_NAME.THIEN_GIAI);

    const cungMui = diaBan.getCungViByDiaChi(DIA_CHI.MUI).getIdx();
    diaBan
      .getCungViByIdx(cw(cungMui, lunarDob.mm - 1))
      .addSao(SAO_NAME.DIA_GIAI);

    diaBan.getCungViByIdx(phuongCacIdx).addSao(SAO_NAME.GIAI_THAN);
  }

  // Thai Phụ, Phong Cáo
  private anThaiCao(diaBan: DiaBan, vanKhucIdx: number): void {
    diaBan.getCungViByIdx(cw(vanKhucIdx, 2)).addSao(SAO_NAME.THAI_PHU);
    diaBan.getCungViByIdx(ccw(vanKhucIdx, 2)).addSao(SAO_NAME.PHONG_CAO);
  }

  // Thiên Tài, Thiên Thọ
  private anTaiTho(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const cungMenh = diaBan.getCungViByCungChuc(CUNG_CHUC.MENH).getIdx();
    diaBan
      .getCungViByIdx(
        cw(cungMenh, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_TAI);

    const cungThan = diaBan.getCungViByCungThan().getIdx();
    diaBan
      .getCungViByIdx(
        cw(cungThan, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_THO);
  }

  // Thiên Thương, Thiên Sứ
  private anThuongSu(diaBan: DiaBan) {
    const cungNoBoc = diaBan.getCungViByCungChuc(CUNG_CHUC.NO_BOC).getIdx();
    diaBan.getCungViByIdx(cungNoBoc).addSao(SAO_NAME.THIEN_THUONG);

    const cungTatAch = diaBan.getCungViByCungChuc(CUNG_CHUC.TAT_ACH).getIdx();
    diaBan.getCungViByIdx(cungTatAch).addSao(SAO_NAME.THIEN_SU);
  }

  // Thiên La, Địa Võng
  private anLaVong(diaBan: DiaBan) {
    const cungThin = diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    diaBan.getCungViByIdx(cungThin).addSao(SAO_NAME.THIEN_LA);

    const cungTuat = diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    diaBan.getCungViByIdx(cungTuat).addSao(SAO_NAME.DIA_VONG);
  }

  // Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
  private anTuHoa(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    let loc = -1,
      quyen = -1,
      khoa = -1,
      ki = -1;
    switch (yyyyThienCan.getName()) {
      case THIEN_CAN.GIAP:
        loc = diaBan.getCungViBySao(SAO_NAME.LIEM_TRINH).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.PHA_QUAN).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        break;
      case THIEN_CAN.AT:
        loc = diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.TU_VI).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        break;
      case THIEN_CAN.BINH:
        loc = diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.VAN_XUONG).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.LIEM_TRINH).getIdx();
        break;
      case THIEN_CAN.DINH:
        loc = diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        break;
      case THIEN_CAN.MAU:
        loc = diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.HUU_BAT).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        break;
      case THIEN_CAN.KY:
        loc = diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.VAN_KHUC).getIdx();
        break;
      case THIEN_CAN.CANH:
        loc = diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        break;
      case THIEN_CAN.TAN:
        loc = diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.VAN_KHUC).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.VAN_XUONG).getIdx();
        break;
      case THIEN_CAN.NHAM:
        loc = diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.TU_VI).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.THIEN_PHU).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        break;
      case THIEN_CAN.QUY:
        loc = diaBan.getCungViBySao(SAO_NAME.PHA_QUAN).getIdx();
        quyen = diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        khoa = diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        ki = diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        break;
    }

    diaBan.getCungViByIdx(loc).addSao(SAO_NAME.HOA_LOC);
    diaBan.getCungViByIdx(quyen).addSao(SAO_NAME.HOA_QUYEN);
    diaBan.getCungViByIdx(khoa).addSao(SAO_NAME.HOA_KHOA);
    diaBan.getCungViByIdx(ki).addSao(SAO_NAME.HOA_KY);
  }

  // Thiên Quan Quý Nhân, Thiên Phúc Quý Nhân
  private anQuanPhuc(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    let diaChiName = THIEN_QUAN_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_QUAN);

    diaChiName = THIEN_PHUC_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_PHUC);
  }

  // Cô Thần, Quả Tú
  private anCoQua(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const diaChiName = CO_THAN_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const coThanIdx = diaBan.getCungViByDiaChi(diaChiName).getIdx();
    diaBan.getCungViByIdx(coThanIdx).addSao(SAO_NAME.CO_THAN);
    diaBan.getCungViByIdx(ccw(coThanIdx, 4)).addSao(SAO_NAME.QUA_TU);
  }

  // Vòng Thiên Mã (niên chi)
  // Thiên Mã, Hoa Cái, Kiếp Sát, Đào Hoa
  private anMaCaiKiepDao(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const diaChiName = THIEN_MA_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const thienMaIdx = diaBan.getCungViByDiaChi(diaChiName).getIdx();
    diaBan.getCungViByIdx(thienMaIdx).addSao(SAO_NAME.THIEN_MA);
    diaBan.getCungViByIdx(cw(thienMaIdx, 2)).addSao(SAO_NAME.HOA_CAI);

    const kiepSatIdx = cw(thienMaIdx, 3);
    diaBan.getCungViByIdx(kiepSatIdx).addSao(SAO_NAME.KIEP_SAT);
    diaBan.getCungViByIdx(cw(kiepSatIdx, 4)).addSao(SAO_NAME.DAO_HOA);
  }

  // Phá Toái
  private anPhaToai(diaBan: DiaBan, yyyyDiaChi: DiaChi) {
    const diaChiName = PHA_TOAI_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.PHA_TOAI);
  }

  // Lưu Hà
  private anLuuHa(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    const diaChiName = LUU_HA_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.LUU_HA);
  }

  // Thiên Trù
  private anThienTru(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    const diaChiName = THIEN_TRU_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_TRU);
  }

  // Lưu Niên Văn Tinh
  private anLuuNienVanTinh(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    const diaChiName =
      LUU_NIEN_VAN_TINH_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.LUU_NIEN_VAN_TINH);
  }

  // Bác Sĩ
  private anBacSi(diaBan: DiaBan, locTonIdx: number) {
    diaBan.getCungViByIdx(locTonIdx).addSao(SAO_NAME.BAC_SY);
  }

  // Đẩu Quân
  private anDauQuan(
    diaBan: DiaBan,
    lunarDob: Dob,
    hhDiaChi: DiaChi,
    thaiTueIdx: number
  ) {
    let idx = ccw(thaiTueIdx, lunarDob.mm - 1);
    idx = cw(idx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    diaBan.getCungViByIdx(idx).addSao(SAO_NAME.DAU_QUAN);
  }

  // Thiên Không
  private anThienKhong(diaBan: DiaBan, thaiTueIdx: number) {
    diaBan.getCungViByIdx(cw(thaiTueIdx, 1)).addSao(SAO_NAME.THIEN_KHONG);
  }

  // Nhị Không: Tuần Trung không vong (Tuần), Triệt Lộ không vong (Triệt)
  // Khởi từ năm tuổi trên số, ta kể thuận mỗi can một cung cho đến Quý là hết tuần của ta
  // “Tuần” đóng ở 2 cung tiếp liền cung Quý
  private anTuan(diaBan: DiaBan, yyyyThienCan: ThienCan, yyyyDiaChi: DiaChi) {
    let idx = diaBan.getCungViByDiaChi(yyyyDiaChi.getName()).getIdx();
    idx = cw(idx, 9 - THIEN_CAN_IN_ORDER.indexOf(yyyyThienCan.getName()));

    diaBan.getCungViByIdx(cw(idx, 1)).addSao(SAO_NAME.TUAN);
    diaBan.getCungViByIdx(cw(idx, 2)).addSao(SAO_NAME.TUAN);
  }

  private anTriet(diaBan: DiaBan, yyyyThienCan: ThienCan) {
    const diaChiNames = TRIET_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaChiNames.forEach((diaChiName) => {
      diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.TRIET);
    });
  }

  // Khởi đại hạn
  private khoiDaiHan(
    diaBan: DiaBan,
    yyyyLuongNghi: LUONG_NGHI,
    gender: GENDER,
    cuc: NguCuc
  ) {
    const cungMenh = diaBan.getCungViByCungChuc(CUNG_CHUC.MENH).getIdx();

    // Số cục
    const soCuc = cuc.getIdx();
    diaBan.getCungViByIdx(cungMenh).setDaiHan(soCuc);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    for (let i = 1; i <= 11; i++) {
      diaBan.getCungViByIdx(moveFn(cungMenh, i)).setDaiHan(soCuc + 10 * i);
    }
  }

  // Tính lưu niên tiểu hạn
  private calcLuuNienTieuHan(
    diaBan: DiaBan,
    yyyyDiaChi: DiaChi,
    gender: GENDER
  ) {
    const first = CUNG_KHOI_LUU_NIEN_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const firstIdx = diaBan.getCungViByDiaChi(first).getIdx();

    const moveFn = gender === GENDER.MALE ? cw : ccw;
    for (let i = 0; i < DIA_CHI_IN_ORDER.length; i++) {
      diaBan
        .getCungViByIdx(moveFn(firstIdx, i))
        .setLuuNienTieuHan(DIA_CHI_IN_ORDER[i]!);
    }
  }
}

// clockwise
function cw(from: number, n: number): number {
  const res = (from + n) % 12;
  return res >= 0 ? res : res + 12;
}

// counterclockwise
function ccw(from: number, n: number): number {
  const res = (from - n) % 12;
  return res >= 0 ? res : res + 12;
}
