/**
 * Tử Vi Đẩu Số Calculator
 * A library to build Vietnamese astrological charts based on birth information
 */

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

export class TuViCalculator {
  private diaBan: DiaBan;
  private thienBan: ThienBan;

  constructor(
    name: string,
    gender: GENDER,
    solarDob: Dob,
    solarHh: number,
    solarMm: number
  ) {
    this.diaBan = new DiaBan();
    this.thienBan = new ThienBan(name, gender, solarDob, solarHh, solarMm);
  }

  toJSON() {
    return {
      diaBan: this.diaBan.toJSON(),
      thienBan: this.thienBan.toJSON(),
    };
  }

  build() {
    const lunarDob = this.thienBan.getLunarDob();
    const hhDiaChi = this.thienBan.getHhDiaChi();
    const yyyyThienCan = this.thienBan.getYyyyThienCan();
    const yyyyDiaChi = this.thienBan.getYyyyDiaChi();
    const gender = this.thienBan.getGender();
    const luongNghi = this.thienBan.getYyyyLuongNghi();

    const menhIdx = this.anCungChuc(
      lunarDob,
      hhDiaChi,
      this.thienBan.getBanMenh()
    );
    this.anThan(lunarDob, hhDiaChi);

    this.thienBan.findCuc(
      yyyyThienCan,
      this.diaBan.getCungViByIdx(menhIdx).getDiaChi()
    );
    const cuc = this.thienBan.getCuc();

    const tuViIdx = this.anTuViTinhHe(lunarDob, cuc);
    this.anThienPhuTinhHe(tuViIdx);
    const thaiTueIdx = this.anThaiTueTinhHe(yyyyDiaChi);

    const locTonIdx = this.anLocTonTinhHe(yyyyThienCan, gender, luongNghi);
    this.anTrangSinhTinhHe(cuc, gender, luongNghi);

    this.anKinhDuongDaLa(locTonIdx);
    this.anDiaKhongDiaKiep(hhDiaChi);

    // Hoả Tinh - Linh Tinh
    this.anHoaTinh(hhDiaChi, yyyyDiaChi, gender, luongNghi);
    this.anLinhTinh(hhDiaChi, yyyyDiaChi, gender, luongNghi);

    // Tả Hữu
    const taPhuIdx = this.anTaPhu(lunarDob);
    const huuBatIdx = this.anHuuBat(lunarDob);

    // Xương Khúc
    const vanXuongIdx = this.anVanXuong(hhDiaChi);
    const vanKhucIdx = this.anVanKhuc(hhDiaChi);

    // Long Phượng
    this.anLongTri(yyyyDiaChi);
    const phuongCacIdx = this.anPhuongCac(yyyyDiaChi);

    this.anKhoiViet(yyyyThienCan);
    this.anKhocHu(yyyyDiaChi);

    // Thai Toạ
    this.anTamThai(lunarDob, taPhuIdx);
    this.anBatToa(lunarDob, huuBatIdx);

    // Quang Quý
    this.anAnQuang(lunarDob, vanXuongIdx);
    this.anThienQuy(lunarDob, vanKhucIdx);

    // Thiên, Nguyệt Đức
    this.anThienDuc(yyyyDiaChi);
    this.anNguyetDuc(yyyyDiaChi);

    this.anHinhRieuY(lunarDob);
    this.anHongHy(yyyyDiaChi);
    this.anAnPhu(locTonIdx);
    this.anThienDiaGiaiThan(lunarDob, phuongCacIdx);
    this.anThaiCao(vanKhucIdx);
    this.anTaiTho(yyyyDiaChi);
    this.anThuongSu();
    this.anLaVong();
    this.anTuHoa(yyyyThienCan);
    this.anQuanPhuc(yyyyThienCan);
    this.anCoQua(yyyyDiaChi);
    this.anMaCaiKiepDao(yyyyDiaChi);
    this.anPhaToai(yyyyDiaChi);
    this.anLuuHa(yyyyThienCan);
    this.anThienTru(yyyyThienCan);
    this.anLuuNienVanTinh(yyyyThienCan);
    this.anBacSi(locTonIdx);
    this.anDauQuan(lunarDob, hhDiaChi, thaiTueIdx);
    this.anThienKhong(thaiTueIdx);
    this.anTuan(yyyyThienCan, yyyyDiaChi);
    this.anTriet(yyyyThienCan);

    this.khoiDaiHan(luongNghi, gender, cuc);
    this.calcLuuNienTieuHan(yyyyDiaChi, gender);
  }

  private anCungChuc(
    lunarDob: Dob,
    hhDiaChi: DiaChi,
    banMenh: NguyenTheBanMenh
  ): number {
    const menhIndex = this.anMenh(lunarDob, hhDiaChi, banMenh);
    this.anCungChucByMenh(menhIndex);
    return menhIndex;
  }

  // Bắt đầu từ cung Dần là tháng Giêng,
  // đếm theo chiều thuận đến tháng sinh,
  // ngừng tại cung nào gọi là giờ Tý,
  // đếm theo chiều nghịch đến giờ sinh,
  // ngừng tại cung nào an Mệnh Viên ở cung đó
  private anMenh(
    lunarDob: Dob,
    hhDiaChi: DiaChi,
    banMenh: NguyenTheBanMenh
  ): number {
    const monthIndex = cw(CUNG_DAN_IDX, lunarDob.mm - 1);
    const menhIndex = ccw(
      monthIndex,
      DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName())
    );
    this.diaBan.anCungChuc(menhIndex, CUNG_CHUC.MENH);
    this.diaBan.setSvbt(banMenh.getNguHanh());

    return menhIndex;
  }

  // Sau khi đã an Mệnh, bắt đầu theo chiều thuận, thứ tự an các cung:
  // Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tật Ách, Tài Bạch, Tử Tức,
  // Thê Thiếp (hay Phu Quân nếu là số đàn bà), Huynh Đệ
  private anCungChucByMenh(menhIndex: number) {
    this.diaBan.anCungChuc(cw(menhIndex, 1), CUNG_CHUC.PHU_MAU);
    this.diaBan.anCungChuc(cw(menhIndex, 2), CUNG_CHUC.PHUC_DUC);
    this.diaBan.anCungChuc(cw(menhIndex, 3), CUNG_CHUC.DIEN_TRACH);
    this.diaBan.anCungChuc(cw(menhIndex, 4), CUNG_CHUC.QUAN_LOC);
    this.diaBan.anCungChuc(cw(menhIndex, 5), CUNG_CHUC.NO_BOC);
    this.diaBan.anCungChuc(cw(menhIndex, 6), CUNG_CHUC.THIEN_DI);
    this.diaBan.anCungChuc(cw(menhIndex, 7), CUNG_CHUC.TAT_ACH);
    this.diaBan.anCungChuc(cw(menhIndex, 8), CUNG_CHUC.TAI_BACH);
    this.diaBan.anCungChuc(cw(menhIndex, 9), CUNG_CHUC.TU_TUC);
    this.diaBan.anCungChuc(cw(menhIndex, 10), CUNG_CHUC.PHU_THE);
    this.diaBan.anCungChuc(cw(menhIndex, 11), CUNG_CHUC.HUYNH_DE);
  }

  // Bắt đầu từ cung Dần là tháng Giêng,
  // đếm theo chiều thuận đến tháng sinh,
  // ngừng tại cung nào gọi là giờ Tý,
  // đếm theo chiều thuận đến giờ sinh ngừng tại cung nào an Thân ở cung đó
  private anThan(lunarDob: Dob, hhDiaChi: DiaChi) {
    const monthIndex = cw(CUNG_DAN_IDX, lunarDob.mm - 1);
    const thanIndex = cw(
      monthIndex,
      DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName())
    );
    this.diaBan.anThan(thanIndex);
  }

  // Tử Vi tinh hệ: Tử Vi, Liêm Trinh, Thiên Đồng, Vũ Khúc, Thiên Cơ
  // Sau khi an Tử Vi, đếm theo chiều thuận bỏ qua ba cung an Liêm Trinh,
  // bỏ qua hai cung an Thiên Đồng, an Vũ Khúc, an Thái Dương,
  // bỏ qua một cung an Thiên Cơ
  private anTuViTinhHe(lunarDob: Dob, cuc: NguCuc): number {
    const tuViIdx = this.anSaoTuVi(lunarDob, cuc);

    this.diaBan.getCungViByIdx(cw(tuViIdx, 4)).addSao(SAO_NAME.LIEM_TRINH);
    this.diaBan.getCungViByIdx(cw(tuViIdx, 7)).addSao(SAO_NAME.THIEN_DONG);
    this.diaBan.getCungViByIdx(cw(tuViIdx, 8)).addSao(SAO_NAME.VU_KHUC);
    this.diaBan.getCungViByIdx(cw(tuViIdx, 9)).addSao(SAO_NAME.THAI_DUONG);
    this.diaBan.getCungViByIdx(cw(tuViIdx, 11)).addSao(SAO_NAME.THIEN_CO);

    return tuViIdx;
  }

  private anSaoTuVi(lunarDob: Dob, cuc: NguCuc): number {
    const cucIdx = cuc.getIdx();
    const a = cucIdx - (lunarDob.dd % cucIdx);
    const b = Math.ceil(lunarDob.dd / cucIdx);

    let tuViIdx = cw(CUNG_DAN_IDX, b - 1);
    tuViIdx = a % 2 === 0 ? cw(tuViIdx, a) : ccw(tuViIdx, a);
    this.diaBan.getCungViByIdx(tuViIdx).addSao(SAO_NAME.TU_VI);

    return tuViIdx;
  }

  // Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân
  // Thiên Phủ luôn đối xứng với Tử Vi qua trục Dần – Thân
  private anThienPhuTinhHe(tuViIdx: number) {
    const thienPhuIdx = this.findThienPhuIdx(tuViIdx);

    this.diaBan.getCungViByIdx(thienPhuIdx).addSao(SAO_NAME.THIEN_PHU);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 1)).addSao(SAO_NAME.THAI_AM);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 2)).addSao(SAO_NAME.THAM_LANG);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 3)).addSao(SAO_NAME.CU_MON);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 4)).addSao(SAO_NAME.THIEN_TUONG);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 5)).addSao(SAO_NAME.THIEN_LUONG);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 6)).addSao(SAO_NAME.THAT_SAT);
    this.diaBan.getCungViByIdx(cw(thienPhuIdx, 10)).addSao(SAO_NAME.PHA_QUAN);
  }

  private findThienPhuIdx(tuViIdx: number) {
    if (tuViIdx === CUNG_DAN_IDX || tuViIdx === CUNG_DAN_IDX + 6) {
      return tuViIdx;
    }
    return ccw(CUNG_DAN_IDX, tuViIdx - CUNG_DAN_IDX);
  }

  // Thiếu Dương, Tang Môn, Thiếu Âm, Quan Phù, Tử Phù, Tuế Phá, Long Đức, Bạch Hổ,
  // Phúc Đức, Điếu Khách, Trực Phù
  private anThaiTueTinhHe(yyyyDiaChi: DiaChi): number {
    const thaiTueIdx = this.diaBan
      .getCungViByDiaChi(yyyyDiaChi.getName())
      .getIdx();

    this.diaBan.getCungViByIdx(thaiTueIdx).addSao(SAO_NAME.THAI_TUE);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 1)).addSao(SAO_NAME.THIEU_DUONG);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 2)).addSao(SAO_NAME.TANG_MON);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 3)).addSao(SAO_NAME.THIEU_AM);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 4)).addSao(SAO_NAME.QUAN_PHUF);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 5)).addSao(SAO_NAME.TU_PHU);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 6)).addSao(SAO_NAME.TUE_PHA);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 7)).addSao(SAO_NAME.LONG_DUC);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 8)).addSao(SAO_NAME.BACH_HO);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 9)).addSao(SAO_NAME.PHUC_DUC);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 10)).addSao(SAO_NAME.DIEU_KHACH);
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 11)).addSao(SAO_NAME.TRUC_PHU);

    return thaiTueIdx;
  }

  // Lực Sỹ, Thanh Long, Tiểu Hao, Tướng Quân, Tấu Thư, Phi Liêm, Hỷ Thần, Bệnh Phù,
  // Đại Hao, Phục Binh, Quan Phủ
  private anLocTonTinhHe(
    yyyyThienCan: ThienCan,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ): number {
    const diaChiName = LOC_TON_MAP[yyyyThienCan.getName()];
    const locTonIdx = this.diaBan.getCungViByDiaChi(diaChiName).getIdx();
    this.diaBan.getCungViByIdx(locTonIdx).addSao(SAO_NAME.LOC_TON);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 1)).addSao(SAO_NAME.LUC_SI);
    this.diaBan
      .getCungViByIdx(moveFn(locTonIdx, 2))
      .addSao(SAO_NAME.THANH_LONG);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 3)).addSao(SAO_NAME.TIEU_HAO);
    this.diaBan
      .getCungViByIdx(moveFn(locTonIdx, 4))
      .addSao(SAO_NAME.TUONG_QUAN);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 5)).addSao(SAO_NAME.TAU_THU);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 6)).addSao(SAO_NAME.PHI_LIEM);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 7)).addSao(SAO_NAME.HY_THAN);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 8)).addSao(SAO_NAME.BENH_PHU);
    this.diaBan.getCungViByIdx(moveFn(locTonIdx, 9)).addSao(SAO_NAME.DAI_HAO);
    this.diaBan
      .getCungViByIdx(moveFn(locTonIdx, 10))
      .addSao(SAO_NAME.PHUC_BINH);
    this.diaBan
      .getCungViByIdx(moveFn(locTonIdx, 11))
      .addSao(SAO_NAME.QUAN_PHUR);

    return locTonIdx;
  }

  // Mộc Dục, Quan Đới, Lâm Quan, Đế Vượng, Suy, Bệnh, Tử, Mộ, Tuyệt, Thai, Dưỡng
  private anTrangSinhTinhHe(
    cuc: NguCuc,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const diaChiName = TRANG_SINH_MAP[cuc.getNguHanh()];
    const trangSinhIdx = this.diaBan.getCungViByDiaChi(diaChiName).getIdx();
    this.diaBan.getCungViByIdx(trangSinhIdx).addSao(SAO_NAME.TRANG_SINH);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    this.diaBan
      .getCungViByIdx(moveFn(trangSinhIdx, 1))
      .addSao(SAO_NAME.MOC_DUC);
    this.diaBan
      .getCungViByIdx(moveFn(trangSinhIdx, 2))
      .addSao(SAO_NAME.QUAN_DOI);
    this.diaBan
      .getCungViByIdx(moveFn(trangSinhIdx, 3))
      .addSao(SAO_NAME.LAM_QUAN);
    this.diaBan
      .getCungViByIdx(moveFn(trangSinhIdx, 4))
      .addSao(SAO_NAME.DE_VUONG);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 5)).addSao(SAO_NAME.SUY);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 6)).addSao(SAO_NAME.BENH);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 7)).addSao(SAO_NAME.TU);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 8)).addSao(SAO_NAME.MO);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 9)).addSao(SAO_NAME.TUYET);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 10)).addSao(SAO_NAME.THAI);
    this.diaBan.getCungViByIdx(moveFn(trangSinhIdx, 11)).addSao(SAO_NAME.DUONG);
  }

  // Kình Dương - Đà La ở 2 bên Lộc Tồn
  private anKinhDuongDaLa(locTonIdx: number) {
    this.diaBan.getCungViByIdx(cw(locTonIdx, 1)).addSao(SAO_NAME.KINH_DUONG);
    this.diaBan.getCungViByIdx(ccw(locTonIdx, 1)).addSao(SAO_NAME.DA_LA);
  }

  // Địa Không - Địa Kiếp
  private anDiaKhongDiaKiep(hhDiaChi: DiaChi) {
    const cungHoi = this.diaBan.getCungViByDiaChi(DIA_CHI.HOI).getIdx();
    const steps = DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName());
    this.diaBan.getCungViByIdx(cw(cungHoi, steps)).addSao(SAO_NAME.DIA_KIEP);
    this.diaBan.getCungViByIdx(ccw(cungHoi, steps)).addSao(SAO_NAME.DIA_KHONG);
  }

  // Hoả Tinh
  private anHoaTinh(
    hhDiaChi: DiaChi,
    yyyyDiaChi: DiaChi,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const startIdx = this.diaBan
      .getCungViByDiaChi(HOA_TINH_BY_YYYYDIACHI[yyyyDiaChi.getName()])
      .getIdx();
    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;
    this.diaBan
      .getCungViByIdx(
        moveFn(startIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()))
      )
      .addSao(SAO_NAME.HOA_TINH);
  }

  // Linh Tinh
  private anLinhTinh(
    hhDiaChi: DiaChi,
    yyyyDiaChi: DiaChi,
    gender: GENDER,
    yyyyLuongNghi: LUONG_NGHI
  ) {
    const startIdx = this.diaBan
      .getCungViByDiaChi(LINH_TINH_BY_YYYYDIACHI[yyyyDiaChi.getName()])
      .getIdx();
    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? ccw
        : cw;
    this.diaBan
      .getCungViByIdx(
        moveFn(startIdx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()))
      )
      .addSao(SAO_NAME.LINH_TINH);
  }

  // Tả Phù
  private anTaPhu(lunarDob: Dob): number {
    const cungThin = this.diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    const idx = cw(cungThin, lunarDob.mm - 1);
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.TA_PHU);
    return idx;
  }

  // Hữu Bật
  private anHuuBat(lunarDob: Dob): number {
    const cungTuat = this.diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, lunarDob.mm - 1);
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.HUU_BAT);
    return idx;
  }

  // Văn Xương
  private anVanXuong(hhDiaChi: DiaChi): number {
    const cungTuat = this.diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.VAN_XUONG);
    return idx;
  }

  // Văn Khúc
  private anVanKhuc(hhDiaChi: DiaChi): number {
    const cungThin = this.diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    const idx = cw(cungThin, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.VAN_KHUC);
    return idx;
  }

  // Long Trì
  private anLongTri(yyyyDiaChi: DiaChi) {
    const cungThin = this.diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    this.diaBan
      .getCungViByIdx(
        cw(cungThin, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.LONG_TRI);
  }

  // Phượng Các
  private anPhuongCac(yyyyDiaChi: DiaChi): number {
    const cungTuat = this.diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    const idx = ccw(cungTuat, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()));
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.PHUONG_CAC);
    return idx;
  }

  // Khôi Việt
  private anKhoiViet(yyyyThienCan: ThienCan) {
    this.diaBan
      .getCungViByDiaChi(THIEN_KHOI_BY_YYYYTHIENCAN[yyyyThienCan.getName()])
      .addSao(SAO_NAME.THIEN_KHOI);
    this.diaBan
      .getCungViByDiaChi(THIEN_VIET_BY_YYYYTHIENCAN[yyyyThienCan.getName()])
      .addSao(SAO_NAME.THIEN_VIET);
  }

  // Khốc Hư
  // Thiên Khốc, Thiên Hư cùng với Song Hao, Tang Môn, Bạch Hổ hợp thành bộ Lục Bại
  // Thiên Hư bao giờ cũng đồng cung với Tuế Phá
  private anKhocHu(yyyyDiaChi: DiaChi) {
    const cungNgo = this.diaBan.getCungViByDiaChi(DIA_CHI.NGO).getIdx();
    this.diaBan
      .getCungViByIdx(
        ccw(cungNgo, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_KHOC);

    this.diaBan
      .getCungViByIdx(
        cw(cungNgo, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_HU);
  }

  // Tam Thai
  private anTamThai(lunarDob: Dob, taPhuIdx: number) {
    this.diaBan
      .getCungViByIdx(cw(taPhuIdx, lunarDob.dd - 1))
      .addSao(SAO_NAME.TAM_THAI);
  }

  // Bát Toạ
  private anBatToa(lunarDob: Dob, huuBatIdx: number) {
    this.diaBan
      .getCungViByIdx(ccw(huuBatIdx, lunarDob.dd - 1))
      .addSao(SAO_NAME.BAT_TOA);
  }

  // Ân Quang
  private anAnQuang(lunarDob: Dob, vanXuongIdx: number) {
    this.diaBan
      .getCungViByIdx(ccw(cw(vanXuongIdx, lunarDob.dd - 1), 1))
      .addSao(SAO_NAME.AN_QUANG);
  }

  // Thiên Quý
  private anThienQuy(lunarDob: Dob, vanKhucIdx: number) {
    this.diaBan
      .getCungViByIdx(cw(ccw(vanKhucIdx, lunarDob.dd - 1), 1))
      .addSao(SAO_NAME.THIEN_QUY);
  }

  // Thiên Đức
  private anThienDuc(yyyyDiaChi: DiaChi) {
    const cungDau = this.diaBan.getCungViByDiaChi(DIA_CHI.DAU).getIdx();
    this.diaBan
      .getCungViByIdx(
        cw(cungDau, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_DUC);
  }

  // Nguyệt Đức
  private anNguyetDuc(yyyyDiaChi: DiaChi) {
    const cungTy = this.diaBan.getCungViByDiaChi(DIA_CHI.TY).getIdx();
    this.diaBan
      .getCungViByIdx(
        cw(cungTy, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.NGUYET_DUC);
  }

  // Thiên Hình, Thiên Riêu, Thiên Y
  private anHinhRieuY(lunarDob: Dob) {
    const cungDau = this.diaBan.getCungViByDiaChi(DIA_CHI.DAU).getIdx();
    this.diaBan
      .getCungViByIdx(cw(cungDau, lunarDob.mm - 1))
      .addSao(SAO_NAME.THIEN_HINH);

    const cungSuu = this.diaBan.getCungViByDiaChi(DIA_CHI.SUU).getIdx();
    const thienRieuIdx = cw(cungSuu, lunarDob.mm - 1);
    this.diaBan.getCungViByIdx(thienRieuIdx).addSao(SAO_NAME.THIEN_RIEU);

    this.diaBan.getCungViByIdx(thienRieuIdx).addSao(SAO_NAME.THIEN_Y);
  }

  // Hồng Loan, Thiên Hỷ
  // Thiên Hỷ an ở cung đối với cung an Hồng Loan
  private anHongHy(yyyyDiaChi: DiaChi) {
    const cungMao = this.diaBan.getCungViByDiaChi(DIA_CHI.MAO).getIdx();
    const hongLoanIdx = ccw(
      cungMao,
      DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName())
    );
    this.diaBan.getCungViByIdx(hongLoanIdx).addSao(SAO_NAME.HONG_LOAN);

    this.diaBan.getCungViByIdx(cw(hongLoanIdx, 6)).addSao(SAO_NAME.THIEN_HY);
  }

  // Quốc Ấn, Đường Phù
  private anAnPhu(locTonIdx: number) {
    this.diaBan.getCungViByIdx(cw(locTonIdx, 8)).addSao(SAO_NAME.QUOC_AN);

    this.diaBan.getCungViByIdx(ccw(locTonIdx, 7)).addSao(SAO_NAME.DUONG_PHU);
  }

  // Thiên Giải, Địa Giải, Giải Thần
  private anThienDiaGiaiThan(lunarDob: Dob, phuongCacIdx: number): void {
    const cungThan = this.diaBan.getCungViByDiaChi(DIA_CHI.THAN).getIdx();
    this.diaBan
      .getCungViByIdx(cw(cungThan, lunarDob.mm - 1))
      .addSao(SAO_NAME.THIEN_GIAI);

    const cungMui = this.diaBan.getCungViByDiaChi(DIA_CHI.MUI).getIdx();
    this.diaBan
      .getCungViByIdx(cw(cungMui, lunarDob.mm - 1))
      .addSao(SAO_NAME.DIA_GIAI);

    this.diaBan.getCungViByIdx(phuongCacIdx).addSao(SAO_NAME.GIAI_THAN);
  }

  // Thai Phụ, Phong Cáo
  private anThaiCao(vanKhucIdx: number): void {
    this.diaBan.getCungViByIdx(cw(vanKhucIdx, 2)).addSao(SAO_NAME.THAI_PHU);
    this.diaBan.getCungViByIdx(ccw(vanKhucIdx, 2)).addSao(SAO_NAME.PHONG_CAO);
  }

  // Thiên Tài, Thiên Thọ
  private anTaiTho(yyyyDiaChi: DiaChi) {
    const cungMenh = this.diaBan.getCungViByCungChuc(CUNG_CHUC.MENH).getIdx();
    this.diaBan
      .getCungViByIdx(
        cw(cungMenh, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_TAI);

    const cungThan = this.diaBan.getCungViByCungThan().getIdx();
    this.diaBan
      .getCungViByIdx(
        cw(cungThan, DIA_CHI_IN_ORDER.indexOf(yyyyDiaChi.getName()))
      )
      .addSao(SAO_NAME.THIEN_THO);
  }

  // Thiên Thương, Thiên Sứ
  private anThuongSu() {
    const cungNoBoc = this.diaBan
      .getCungViByCungChuc(CUNG_CHUC.NO_BOC)
      .getIdx();
    this.diaBan.getCungViByIdx(cungNoBoc).addSao(SAO_NAME.THIEN_THUONG);

    const cungTatAch = this.diaBan
      .getCungViByCungChuc(CUNG_CHUC.TAT_ACH)
      .getIdx();
    this.diaBan.getCungViByIdx(cungTatAch).addSao(SAO_NAME.THIEN_SU);
  }

  // Thiên La, Địa Võng
  private anLaVong() {
    const cungThin = this.diaBan.getCungViByDiaChi(DIA_CHI.THIN).getIdx();
    this.diaBan.getCungViByIdx(cungThin).addSao(SAO_NAME.THIEN_LA);

    const cungTuat = this.diaBan.getCungViByDiaChi(DIA_CHI.TUAT).getIdx();
    this.diaBan.getCungViByIdx(cungTuat).addSao(SAO_NAME.DIA_VONG);
  }

  // Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
  private anTuHoa(yyyyThienCan: ThienCan) {
    let loc = -1,
      quyen = -1,
      khoa = -1,
      ki = -1;
    switch (yyyyThienCan.getName()) {
      case THIEN_CAN.GIAP:
        loc = this.diaBan.getCungViBySao(SAO_NAME.LIEM_TRINH).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.PHA_QUAN).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        break;
      case THIEN_CAN.AT:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.TU_VI).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        break;
      case THIEN_CAN.BINH:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.VAN_XUONG).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.LIEM_TRINH).getIdx();
        break;
      case THIEN_CAN.DINH:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        break;
      case THIEN_CAN.MAU:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.HUU_BAT).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.THIEN_CO).getIdx();
        break;
      case THIEN_CAN.KY:
        loc = this.diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.VAN_KHUC).getIdx();
        break;
      case THIEN_CAN.CANH:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.THIEN_DONG).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        break;
      case THIEN_CAN.TAN:
        loc = this.diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.THAI_DUONG).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.VAN_KHUC).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.VAN_XUONG).getIdx();
        break;
      case THIEN_CAN.NHAM:
        loc = this.diaBan.getCungViBySao(SAO_NAME.THIEN_LUONG).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.TU_VI).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.THIEN_PHU).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.VU_KHUC).getIdx();
        break;
      case THIEN_CAN.QUY:
        loc = this.diaBan.getCungViBySao(SAO_NAME.PHA_QUAN).getIdx();
        quyen = this.diaBan.getCungViBySao(SAO_NAME.CU_MON).getIdx();
        khoa = this.diaBan.getCungViBySao(SAO_NAME.THAI_AM).getIdx();
        ki = this.diaBan.getCungViBySao(SAO_NAME.THAM_LANG).getIdx();
        break;
    }

    this.diaBan.getCungViByIdx(loc).addSao(SAO_NAME.HOA_LOC);
    this.diaBan.getCungViByIdx(quyen).addSao(SAO_NAME.HOA_QUYEN);
    this.diaBan.getCungViByIdx(khoa).addSao(SAO_NAME.HOA_KHOA);
    this.diaBan.getCungViByIdx(ki).addSao(SAO_NAME.HOA_KY);
  }

  // Thiên Quan Quý Nhân, Thiên Phúc Quý Nhân
  private anQuanPhuc(yyyyThienCan: ThienCan) {
    let diaChiName = THIEN_QUAN_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_QUAN);

    diaChiName = THIEN_PHUC_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_PHUC);
  }

  // Cô Thần, Quả Tú
  private anCoQua(yyyyDiaChi: DiaChi) {
    const diaChiName = CO_THAN_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const coThanIdx = this.diaBan.getCungViByDiaChi(diaChiName).getIdx();
    this.diaBan.getCungViByIdx(coThanIdx).addSao(SAO_NAME.CO_THAN);
    this.diaBan.getCungViByIdx(ccw(coThanIdx, 4)).addSao(SAO_NAME.QUA_TU);
  }

  // Vòng Thiên Mã (niên chi)
  // Thiên Mã, Hoa Cái, Kiếp Sát, Đào Hoa
  private anMaCaiKiepDao(yyyyDiaChi: DiaChi) {
    const diaChiName = THIEN_MA_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const thienMaIdx = this.diaBan.getCungViByDiaChi(diaChiName).getIdx();
    this.diaBan.getCungViByIdx(thienMaIdx).addSao(SAO_NAME.THIEN_MA);
    this.diaBan.getCungViByIdx(cw(thienMaIdx, 2)).addSao(SAO_NAME.HOA_CAI);

    const kiepSatIdx = cw(thienMaIdx, 3);
    this.diaBan.getCungViByIdx(kiepSatIdx).addSao(SAO_NAME.KIEP_SAT);
    this.diaBan.getCungViByIdx(cw(kiepSatIdx, 4)).addSao(SAO_NAME.DAO_HOA);
  }

  // Phá Toái
  private anPhaToai(yyyyDiaChi: DiaChi) {
    const diaChiName = PHA_TOAI_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.PHA_TOAI);
  }

  // Lưu Hà
  private anLuuHa(yyyyThienCan: ThienCan) {
    const diaChiName = LUU_HA_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.LUU_HA);
  }

  // Thiên Trù
  private anThienTru(yyyyThienCan: ThienCan) {
    const diaChiName = THIEN_TRU_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.THIEN_TRU);
  }

  // Lưu Niên Văn Tinh
  private anLuuNienVanTinh(yyyyThienCan: ThienCan) {
    const diaChiName =
      LUU_NIEN_VAN_TINH_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    this.diaBan
      .getCungViByDiaChi(diaChiName)
      .addSao(SAO_NAME.LUU_NIEN_VAN_TINH);
  }

  // Bác Sĩ
  private anBacSi(locTonIdx: number) {
    this.diaBan.getCungViByIdx(locTonIdx).addSao(SAO_NAME.BAC_SY);
  }

  // Đẩu Quân
  private anDauQuan(lunarDob: Dob, hhDiaChi: DiaChi, thaiTueIdx: number) {
    let idx = ccw(thaiTueIdx, lunarDob.mm - 1);
    idx = cw(idx, DIA_CHI_IN_ORDER.indexOf(hhDiaChi.getName()));
    this.diaBan.getCungViByIdx(idx).addSao(SAO_NAME.DAU_QUAN);
  }

  // Thiên Không
  private anThienKhong(thaiTueIdx: number) {
    this.diaBan.getCungViByIdx(cw(thaiTueIdx, 1)).addSao(SAO_NAME.THIEN_KHONG);
  }

  // Nhị Không: Tuần Trung không vong (Tuần), Triệt Lộ không vong (Triệt)
  // Khởi từ năm tuổi trên số, ta kể thuận mỗi can một cung cho đến Quý là hết tuần của ta
  // “Tuần” đóng ở 2 cung tiếp liền cung Quý
  private anTuan(yyyyThienCan: ThienCan, yyyyDiaChi: DiaChi) {
    let idx = this.diaBan.getCungViByDiaChi(yyyyDiaChi.getName()).getIdx();
    idx = cw(idx, 9 - THIEN_CAN_IN_ORDER.indexOf(yyyyThienCan.getName()));

    this.diaBan.getCungViByIdx(cw(idx, 1)).addSao(SAO_NAME.TUAN);
    this.diaBan.getCungViByIdx(cw(idx, 2)).addSao(SAO_NAME.TUAN);
  }

  private anTriet(yyyyThienCan: ThienCan) {
    const diaChiNames = TRIET_BY_YYYYTHIENCAN[yyyyThienCan.getName()];
    diaChiNames.forEach((diaChiName) => {
      this.diaBan.getCungViByDiaChi(diaChiName).addSao(SAO_NAME.TRIET);
    });
  }

  // Khởi đại hạn
  private khoiDaiHan(yyyyLuongNghi: LUONG_NGHI, gender: GENDER, cuc: NguCuc) {
    const cungMenh = this.diaBan.getCungViByCungChuc(CUNG_CHUC.MENH).getIdx();

    // Số cục
    const soCuc = cuc.getIdx();
    this.diaBan.getCungViByIdx(cungMenh).setDaiHan(soCuc);

    const moveFn =
      (yyyyLuongNghi === LUONG_NGHI.DUONG && gender === GENDER.MALE) ||
      (yyyyLuongNghi === LUONG_NGHI.AM && gender === GENDER.FEMALE)
        ? cw
        : ccw;

    for (let i = 1; i <= 11; i++) {
      this.diaBan.getCungViByIdx(moveFn(cungMenh, i)).setDaiHan(soCuc + 10 * i);
    }
  }

  // Tính lưu niên tiểu hạn
  private calcLuuNienTieuHan(yyyyDiaChi: DiaChi, gender: GENDER) {
    const first = CUNG_KHOI_LUU_NIEN_BY_YYYYDIACHI[yyyyDiaChi.getName()];
    const firstIdx = this.diaBan.getCungViByDiaChi(first).getIdx();

    const moveFn = gender === GENDER.MALE ? cw : ccw;
    for (let i = 0; i < DIA_CHI_IN_ORDER.length; i++) {
      this.diaBan
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
