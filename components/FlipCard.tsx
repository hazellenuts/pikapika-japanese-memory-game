"use client";


export default function FlipCard({
  value,
  flipped,
  matched,
  onClick,
}: {
  value: string;
  flipped: boolean;
  matched: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={matched}
      className={`
        w-24 h-32 perspective
        ${matched ? "pointer-events-none" : ""}
      `}
    >
      <div
        className={`
          relative w-full h-full
          transition-all duration-500
          transform-style-preserve-3d
          ${flipped ? "rotate-y-180" : ""}
          ${matched ? "opacity-0 scale-75" : ""}
        `}
      >
        {/* FRONT */}
        <div
          className="
            absolute inset-0
            bg-white
            rounded-xl shadow-lg
            flex items-center justify-center
            text-3xl font-bold
            backface-hidden
          "
        >
          <img
            src="/images/snoopy1.png"
            alt="Snoopy"
            className="w-18 object-contain"
            />

        </div>

        {/* BACK */}
        <div
          className={`
            absolute inset-0
            bg-white
            rounded-xl shadow-lg
            flex items-center justify-center
            text-3xl font-bold
            rotate-y-180
            backface-hidden
            ${matched ? "ring-4 ring-yellow-400" : ""}
          `}
        >
          {value}
        </div>
      </div>
    </button>
  );
}
