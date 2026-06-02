// src/components/dashboard/setup-checklist.tsx
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SetupChecklistProps = {
  hasBusinessProfile: boolean;
  hasNotificationEmail: boolean;
  hasNotificationPhone: boolean;
  hasIntakeScript: boolean;
  hasAssignedPhoneNumber: boolean;
  hasSubscription: boolean;
  hasTestLead: boolean;
};

export function SetupChecklist({
  hasBusinessProfile,
  hasNotificationEmail,
  hasNotificationPhone,
  hasIntakeScript,
  hasAssignedPhoneNumber,
  hasSubscription,
  hasTestLead,
}: SetupChecklistProps) {
  const items = [
    {
      label: "Business profile created",
      done: hasBusinessProfile,
    },
    {
      label: "Notification email added",
      done: hasNotificationEmail,
    },
    {
      label: "Notification phone added",
      done: hasNotificationPhone,
    },
    {
      label: "Intake script selected",
      done: hasIntakeScript,
    },
    {
      label: "Subscription active",
      done: hasSubscription,
    },
    {
      label: "Phone number connected",
      done: hasAssignedPhoneNumber,
    },
    {
      label: "Test lead completed",
      done: hasTestLead,
    },
  ];

  const completed = items.filter((item) => item.done).length;
  const total = items.length;
  const isReady = completed === total;

  return (
    <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <CardTitle className="text-slate-950">
              {isReady
                ? "LunchBreak AI is ready"
                : "LunchBreak AI is almost ready"}
            </CardTitle>
            <p className="mt-2 text-sm text-slate-600">
              Complete these steps before sending real callers to your AI
              receptionist.
            </p>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            {completed} of {total} complete
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3"
            >
              {item.done ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300" />
              )}

              <span
                className={
                  item.done
                    ? "text-sm font-medium text-slate-950"
                    : "text-sm text-slate-500"
                }
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {!isReady ? (
          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-none" />
            <p>
              Stay in test mode until your phone number is connected and a test
              lead has been captured.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
