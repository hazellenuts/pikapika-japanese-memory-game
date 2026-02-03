import { DashboardCard } from "@/components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
        <img src="images/snoopy-home.png" alt="" className="h-40"/>
      <DashboardCard title="Hiragana" rounds={8} baseHref="/hiragana/play" />
      <DashboardCard title="Katakana" rounds={8} baseHref="/katakana/play" />
    </main>
  );
}
