"use client";

import { useState } from "react";
import Link from "next/link";

type DashboardCardProps = {
  title: string;
  rounds: number;
  baseHref: string;
};

export function DashboardCard({ title, rounds, baseHref }: DashboardCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-28 px-6 py-4 flex items-start justify-between text-3xl font-bold hover:bg-surface transition"
      >
        <div className="flex flex-col items-start">
          <h1>{title}</h1>
          <p className="pt-4 text-sm text-gray-500">{rounds} rounds</p>
        </div>

        <span className="text-xl">{open ? "▲" : "▼"}</span>
      </button>

      {/* CONTENT */}
      <div
        className="overflow-hidden transition-[max-height] duration-300"
        style={{ maxHeight: open ? "1000px" : "0px" }} // sesuaikan tinggi
      >
        <div className="px-6 py-4 flex flex-col">
          {Array.from({ length: rounds }).map((_, i) => (
            <Link
              key={i}
              href={`${baseHref}/${i + 1}`}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
            >
              <span>Round {i + 1}</span>
              <span>{">"}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
