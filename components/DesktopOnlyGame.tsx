"use client";

import { useEffect, useState, ReactNode } from "react";

type Props = {
  children: ReactNode; // komponen game (MemoryGame)
};

export default function DesktopOnlyGame({ children }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center h-screen text-center p-6 text-2xl font-bold">
        Sorry, this website can only be accessed on Desktop
      </div>
    );
  }

  return <>{children}</>; // desktop: render game
}
