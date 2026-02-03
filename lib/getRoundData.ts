import { hiraganaData } from "./hiragana";
import { hiraganaRounds } from "./hiraganaRounds";
import { katakanaData } from "./katakana";
import { katakanaRounds } from "./katakanaRounds";

export function getRoundData(round: number) {
  if (round === 8) return hiraganaData;

  const romas = hiraganaRounds[round as keyof typeof hiraganaRounds] as readonly string[];
  if (!Array.isArray(romas)) return []; // safety check

  return hiraganaData.filter(item => romas.includes(item.roma));
}

export function getKatakanaRoundData(round: number) {
  if (round === 8) return katakanaData.map(item => ({ hira: item.kata, roma: item.roma }));

  const romas = katakanaRounds[round as keyof typeof katakanaRounds] as readonly string[];
  return katakanaData
    .filter(item => romas.includes(item.roma))
    .map(item => ({ hira: item.kata, roma: item.roma }));
}
