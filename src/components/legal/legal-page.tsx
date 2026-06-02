// src/components/legal/legal-page.tsx
import Link from "next/link";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-blue-300 hover:text-blue-200">
          ← Back to LunchBreak AI
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white p-8 text-slate-950 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            LunchBreak AI
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>

          <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>

          <div className="prose prose-slate mt-8 max-w-none">{children}</div>
        </div>
      </div>
    </main>
  );
}
