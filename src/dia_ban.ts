import { CUNG_CHUC } from "./constant";
import { CungVi } from "./cung_vi";
import { DIA_CHI, DIA_CHI_IN_ORDER } from "./dia_chi";
import { MENH_SVBT } from "./mapping";
import type { NGU_HANH } from "./ngu_hanh";
import type { SAO_NAME } from "./sao";

export const CUNG_DAN_IDX = 2;

// Địa bàn
export class DiaBan {
  private cungViByDiaChi: Record<DIA_CHI, CungVi>;
  private cungViByIdx: Record<number, CungVi>;

  constructor() {
    this.cungViByDiaChi = {
      [DIA_CHI.TI]: new CungVi(0, DIA_CHI.TI),
      [DIA_CHI.SUU]: new CungVi(1, DIA_CHI.SUU),
      [DIA_CHI.DAN]: new CungVi(CUNG_DAN_IDX, DIA_CHI.DAN),
      [DIA_CHI.MAO]: new CungVi(3, DIA_CHI.MAO),
      [DIA_CHI.THIN]: new CungVi(4, DIA_CHI.THIN),
      [DIA_CHI.TY]: new CungVi(5, DIA_CHI.TY),
      [DIA_CHI.NGO]: new CungVi(6, DIA_CHI.NGO),
      [DIA_CHI.MUI]: new CungVi(7, DIA_CHI.MUI),
      [DIA_CHI.THAN]: new CungVi(8, DIA_CHI.THAN),
      [DIA_CHI.DAU]: new CungVi(9, DIA_CHI.DAU),
      [DIA_CHI.TUAT]: new CungVi(10, DIA_CHI.TUAT),
      [DIA_CHI.HOI]: new CungVi(11, DIA_CHI.HOI),
    };

    this.cungViByIdx = {
      0: this.cungViByDiaChi[DIA_CHI.TI],
      1: this.cungViByDiaChi[DIA_CHI.SUU],
      [CUNG_DAN_IDX]: this.cungViByDiaChi[DIA_CHI.DAN],
      3: this.cungViByDiaChi[DIA_CHI.MAO],
      4: this.cungViByDiaChi[DIA_CHI.THIN],
      5: this.cungViByDiaChi[DIA_CHI.TY],
      6: this.cungViByDiaChi[DIA_CHI.NGO],
      7: this.cungViByDiaChi[DIA_CHI.MUI],
      8: this.cungViByDiaChi[DIA_CHI.THAN],
      9: this.cungViByDiaChi[DIA_CHI.DAU],
      10: this.cungViByDiaChi[DIA_CHI.TUAT],
      11: this.cungViByDiaChi[DIA_CHI.HOI],
    };
  }

  toJSON() {
    return {
      cung: DIA_CHI_IN_ORDER.map((diaChiName) =>
        this.cungViByDiaChi[diaChiName].toJSON()
      ),
    };
  }

  getCungViByDiaChi(diaChiName: DIA_CHI): CungVi {
    return this.cungViByDiaChi[diaChiName];
  }

  getCungViByIdx(idx: number): CungVi {
    const cungVi = this.cungViByIdx[idx];
    if (!cungVi) {
      throw new Error(`Invalid index: ${idx}. Index must be between 0 and 11`);
    }
    return cungVi;
  }

  getCungViByCungChuc(cungChucName: CUNG_CHUC): CungVi {
    for (const diaChiName of DIA_CHI_IN_ORDER) {
      const cungVi = this.cungViByDiaChi[diaChiName];
      if (cungVi.getCungChuc() === cungChucName) {
        return cungVi;
      }
    }

    throw new Error(`Invalid cung chuc: ${cungChucName}`);
  }

  getCungViByCungThan(): CungVi {
    for (const diaChiName of DIA_CHI_IN_ORDER) {
      const cungVi = this.cungViByDiaChi[diaChiName];
      if (cungVi.isCungThan()) {
        return cungVi;
      }
    }

    throw new Error("No cung than found");
  }

  getCungViBySao(saoName: SAO_NAME): CungVi {
    for (const diaChiName of DIA_CHI_IN_ORDER) {
      const cungVi = this.cungViByDiaChi[diaChiName];
      if (cungVi.hasSao(saoName)) {
        return cungVi;
      }
    }

    throw new Error(`No cung vi has sao: ${saoName}`);
  }

  anCungChuc(cungViIdx: number, cungChucName: CUNG_CHUC) {
    this.getCungViByIdx(cungViIdx).anCungChuc(cungChucName);
  }

  setSvbt(banMenh: NGU_HANH) {
    const cungMenh = this.getCungViByCungChuc(CUNG_CHUC.MENH);
    const svbt =
      MENH_SVBT[banMenh][
        DIA_CHI_IN_ORDER.indexOf(cungMenh.getDiaChi().getName())
      ];
    if (svbt) {
      cungMenh.setSvbt(svbt);
    }
  }

  anThan(cungViIdx: number) {
    this.getCungViByIdx(cungViIdx).anThan();
  }
}
