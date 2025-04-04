import { writeFileSync } from "fs";

import { PopularCalc } from "./src/calc";
import { GENDER } from "./src/constant";

const calc = new PopularCalc();
const laSo = calc.calc(
  "Hello World",
  GENDER.MALE,
  {
    dd: 2,
    mm: 2,
    yy: 2002,
  },
  12,
  34
);

writeFileSync("output.json", JSON.stringify(laSo, null, 2));
