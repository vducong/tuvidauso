import { CUNG_CHUC } from "./constant";
import { DIA_CHI_MAP, type DIA_CHI, DiaChi } from "./dia_chi";
import type { SVBT } from "./ngu_hanh";
import { saoManager, type Sao, type SAO_NAME } from "./sao";

// Cung vị
export class CungVi {
  private idx: number;
  private diaChi: DiaChi;

  // Cung Chức
  private cungChuc?: CUNG_CHUC;

  // Thân
  private cungThan: boolean = false;

  // Mệnh: sinh, vượng, bại, tuyệt
  private menhSvbt?: SVBT;

  private saoList: Sao[];

  // Đại hạn
  private daiHan?: number;
  private luuNienTieuHan?: DiaChi;

  constructor(idx: number, diaChiName: DIA_CHI) {
    this.idx = idx;
    this.diaChi = DIA_CHI_MAP[diaChiName];
    this.saoList = [];
  }

  toJSON() {
    return {
      idx: this.idx,
      diaChi: this.diaChi.toJSON(),
      cungChuc: this.cungChuc,
      cungThan: this.cungThan,
      menhSvbt: this.menhSvbt,
      saoList: this.saoList.map((sao) => sao.toJSON()),
      daiHan: this.daiHan,
      luuNienTieuHan: this.luuNienTieuHan?.getName(),
    };
  }

  getIdx(): number {
    return this.idx;
  }

  getDiaChi(): DiaChi {
    return this.diaChi;
  }

  getCungChuc(): CUNG_CHUC | undefined {
    return this.cungChuc;
  }

  anCungChuc(cungChucName: CUNG_CHUC) {
    this.cungChuc = cungChucName;
  }

  isCungThan(): boolean {
    return this.cungThan;
  }

  anThan() {
    this.cungThan = true;
  }

  addSao(saoName: SAO_NAME) {
    const sao = saoManager.getSao(saoName);
    sao.setTinhLi(this.diaChi.getName());
    this.saoList.push(sao);
  }

  hasSao(saoName: SAO_NAME): boolean {
    return this.saoList.some((sao) => sao.getName() === saoName);
  }

  setDaiHan(daiHan: number) {
    this.daiHan = daiHan;
  }

  setLuuNienTieuHan(luuNienTieuHan: DIA_CHI) {
    this.luuNienTieuHan = DIA_CHI_MAP[luuNienTieuHan];
  }

  setSvbt(menhSvbt: SVBT) {
    this.menhSvbt = menhSvbt;
  }
}
