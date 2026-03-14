export type Category = "creation" | "production" | "supplies" | "defense" | "commerce";

export interface NpcWithRejections {
  userId: number;
  name: string;
  gender: Gender;
  hairColor: string;
  skinColor: string;
  hairOption: HairOption;
  npcRejections: { reason: string; rejectedAt: Date }[];
}

export enum SkinColor {
  CLARO = "#FDDCB5",
  PESSEGO = "#F5C5A3",
  BEGE = "#E8B48A",
  MORENO = "#C68C5B",
  CASTANHO = "#A0673C",
  ESCURO = "#6B3F23",
  EBANO = "#3B2212",
}

export enum HairOption {
  none = "none",
  bald = "bald",
  buzzCut = "buzzCut",
  quiff = "quiff",
  bobCut = "bobCut",
  shortStraight = "shortStraight",
  longStraight = "longStraight",
  shortWavy = "shortWavy",
  longWavy = "longWavy",
  shortCurly = "shortCurly",
  longCurly = "longCurly",
  afro = "afro",
  ponytail = "ponytail",
  braids = "braids",
  dreadlocks = "dreadlocks",
  mohawk = "mohawk",
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
