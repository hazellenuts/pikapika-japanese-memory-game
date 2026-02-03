"use client";

import DesktopOnlyGame from "@/components/DesktopOnlyGame";
import MemoryGame from "@/components/MemoryGame";
import { katakanaData } from "@/lib/katakana";
import { useParams } from "next/navigation";

function getKatakanaRoundData(round: number) {
  const data = round === 8 ? katakanaData : katakanaData.slice(0, round * 5);
  return data.map(item => ({ hira: item.kata, roma: item.roma }));
}

export default function KatakanaPage() {
  const params = useParams(); // ambil params dari hook
  const round = Number(params.round ?? 1);

  const roundData = getKatakanaRoundData(round); // siap langsung untuk MemoryGame

  return (
    <DesktopOnlyGame>
      <MemoryGame title="Katakana" round={round} roundData={roundData} />
    </DesktopOnlyGame>
  );
}
