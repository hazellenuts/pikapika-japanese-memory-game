import { hiraganaData } from "./hiragana";

export const hiraganaRounds = {
  1: ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko"],

  2: ["sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to"],

  3: ["na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho"],

  4: ["ma", "mi", "mu", "me", "mo", "ya", "yu", "yo"],

  5: ["ra", "ri", "ru", "re", "ro", "wa", "o(penanda objek)", "n"],

  6: [
    "ga", "gi", "gu", "ge", "go",
    "da", "di", "du", "de", "do",
    "pa", "pi", "pu", "pe", "po",
    "za", "ji", "zu", "ze", "zo",
    "ba", "bi", "bu", "be", "bo",
  ],

  7: [
  "kya", "kyu", "kyo",
  "gya", "gyu", "gyo",
  "sha", "shu", "sho",
  "ja", "ju", "jo",
  "cha", "chu", "cho",
  "nya", "nyu", "nyo",
  "hya", "hyu", "hyo",
  "mya", "myu", "myo",
  "rya", "ryu", "ryo",
  "bya", "byu", "byo",
  "pya", "pyu", "pyo",
  ],

  8: "ALL",
} as const;
