// src/components/dashboard/ai-guardrails-card.tsx
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AiGuardrailsCard() {
  const guardrails = [
    "Will not quote exact prices",
    "Will not promise availability",
    "Will not claim to be human",
    "Will not book jobs without approval",
    "Will collect caller details one question at a time",
    "Will send the lead to your team for follow-up",
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <CardTitle>Your AI receptionist has guardrails</CardTitle>
            <p className="mt-2 text-sm text-slate-600">
              LunchBreak AI is designed as a missed-call safety net, not an
              uncontrolled robot.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {guardrails.map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
