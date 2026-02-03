"use client";

import DesktopOnlyGame from "@/components/DesktopOnlyGame";
import MemoryGame from "@/components/MemoryGame";
import { getRoundData } from "@/lib/getRoundData";
import { useParams } from "next/navigation";

export default function HiraganaPage() {
  const params = useParams();
  const round = Number(params.round ?? 1);

  const roundData = getRoundData(round);

  return (
    <DesktopOnlyGame>
      <MemoryGame title="Hiragana" round={round} roundData={roundData} />
    </DesktopOnlyGame>
  );
}
