"use client";

import FlipCard from "./FlipCard";
import { useState, useEffect } from "react";

type CardType = { type: "hira" | "roma"; value: string };
type MemoryGameProps = {
  title: string;
  round: number;
  roundData: { hira: string; roma: string }[];
};

function shuffleArray<T>(array: T[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MemoryGame({ title, round, roundData }: MemoryGameProps) {
  const [leftCards, setLeftCards] = useState(shuffleArray(roundData));
  const [rightCards, setRightCards] = useState(shuffleArray(roundData));
  const [selected, setSelected] = useState<CardType[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [gameDone, setGameDone] = useState(false);
  const total = roundData.length;

  useEffect(() => {
    setLeftCards(shuffleArray(roundData));
    setRightCards(shuffleArray(roundData));
    setSelected([]);
    setMatched([]);
    setGameDone(false);
  }, [roundData]);

  useEffect(() => {
    if (matched.length === total && total > 0) setGameDone(true);
  }, [matched, total]);

  function handleSelect(card: CardType) {
    if (selected.length === 2) return;
    setSelected((prev) => [...prev, card]);
    if (selected.length === 1) {
      const first = selected[0];
      const correct = roundData.find(
        (d) =>
          (d.hira === first.value && d.roma === card.value) ||
          (d.roma === first.value && d.hira === card.value)
      );
      if (correct) {
        setTimeout(() => {
          setMatched((prev) => [...prev, correct.hira]);
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  }

  return (
    <main className="h-screen relative overflow-hidden">
      {/* header, panels, hint, etc sama persis */}
      <header className="h-16 px-6 flex items-center justify-between bg-surface outline-2 outline-accent">
        <h1 className="text-xl font-bold">
          PikaPika - {title} round {round}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-accent">
            {matched.length}/{total}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-primary rounded-lg font-bold text-on-primary outline-on-primary outline-2"
          >
            Hint
          </button>
        </div>
      </header>


      {/* MAIN */}
      <section className="h-[calc(100vh-4rem)] flex gap-4 p-4">
        {/* LEFT */}
        <div className="w-1/2 bg-left-panel outline-2 outline-accent rounded-xl p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="grid grid-cols-6 gap-4">
            {leftCards.map((item, idx) => (
              <FlipCard
                key={`left-${item.hira}-${idx}`}
                value={item.hira}
                flipped={selected.some((s) => s.value === item.hira)}
                matched={matched.includes(item.hira)}
                onClick={() => handleSelect({ type: "hira", value: item.hira })}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-1/2 outline-2 outline-accent bg-right-panel rounded-xl p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Romaji</h2>
          <div className="grid grid-cols-6 gap-4">
            {rightCards.map((item, idx) => (
              <FlipCard
                key={`right-${item.roma}-${idx}`}
                value={item.roma}
                flipped={selected.some((s) => s.value === item.roma)}
                matched={matched.includes(item.hira)}
                onClick={() => handleSelect({ type: "roma", value: item.roma })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HINT PANEL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-background z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-lg font-bold mb-4">{title} Hint</h2>
          <p className="text-sm text-white/70 mb-4">{title} : Romaji</p>
          <div className="flex-1 overflow-y-auto space-y-2">
            {roundData.map((item, idx) => (
              <div key={`hint-${item.hira}-${idx}`} className="flex items-center justify-between bg-surface rounded-lg px-4 py-2">
                <span className="text-2xl font-bold">{item.hira}</span>
                <span className="text-2xl text-accent">{item.roma}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="mt-6 px-4 py-2 bg-primary rounded-lg font-bold text-on-primary outline-2 outline-on-primary"
          >
            Close
          </button>
        </div>
      </aside>

      {/* GAME COMPLETE */}
      {gameDone && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl animate-scale-in">
              <h2 className="text-2xl font-bold mb-2">🎉 Great Job!</h2>
              <p className="text-on-primary mb-6">You completed all cards ({total}/{total})</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setMatched([]);
                    setSelected([]);
                    setGameDone(false);
                    setLeftCards(shuffleArray(roundData));
                    setRightCards(shuffleArray(roundData));
                  }}
                  className="px-4 py-2 bg-primary rounded-lg hover:outline-1"
                >
                  Restart
                </button>
                <a
                  href="/dashboard"
                  className="px-4 py-2 bg-secondary rounded-lg hover:outline-1"
                >
                  Back Home
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
