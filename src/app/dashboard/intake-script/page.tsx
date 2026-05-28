// src/app/dashboard/intake-script/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateIntakeScriptAction } from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type IntakeScriptPageProps = {
  searchParams: Promise<{
    error?: string;
    saved?: string;
  }>;
};

async function getBusinessId() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/onboarding");
  }

  return membership.business_id;
}

export default async function IntakeScriptPage({
  searchParams,
}: IntakeScriptPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const businessId = await getBusinessId();

  const { data: script } = await supabase
    .from("intake_scripts")
    .select(
      "id, name, industry, prompt, required_fields, custom_questions, is_active"
    )
    .eq("business_id", businessId)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (!script) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Intake script
        </h1>
        <p className="mt-2 text-slate-600">
          No intake script found. Complete onboarding again or create a script
          from the database for now.
        </p>
      </div>
    );
  }

  const requiredFields = Array.isArray(script.required_fields)
    ? script.required_fields.join("\n")
    : "";

  const customQuestions = Array.isArray(script.custom_questions)
    ? script.custom_questions.join("\n")
    : "";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
          Intake script
        </h1>
        <p className="mt-2 text-slate-600">
          Control what your AI receptionist asks callers and how it qualifies
          leads.
        </p>
      </div>

      {params.error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {params.error}
        </div>
      ) : null}

      {params.saved ? (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Intake script saved.
        </div>
      ) : null}

      <form action={updateIntakeScriptAction} className="space-y-8">
        <input type="hidden" name="script_id" value={script.id} />

        <Card>
          <CardHeader>
            <CardTitle>Script identity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Script name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={script.name ?? "Default Intake Script"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                defaultValue={script.industry ?? ""}
                placeholder="movers, plumbers, HVAC, roofers"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI instructions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <Label htmlFor="prompt">Receptionist prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              defaultValue={script.prompt}
              required
              className="min-h-72 font-mono text-sm"
            />
            <p className="text-sm text-slate-500">
              This is the core behavior for the AI receptionist. Keep it clear,
              specific, and tied to the business.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Required fields</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Label htmlFor="required_fields">One field per line</Label>
              <Textarea
                id="required_fields"
                name="required_fields"
                defaultValue={requiredFields}
                className="min-h-64 font-mono text-sm"
                placeholder={`caller_name\ncaller_phone\nservice_needed\nurgency\njob_location\npreferred_timing`}
              />
              <p className="text-sm text-slate-500">
                These become the structured fields the AI should try to capture.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom questions</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <Label htmlFor="custom_questions">One question per line</Label>
              <Textarea
                id="custom_questions"
                name="custom_questions"
                defaultValue={customQuestions}
                className="min-h-64 text-sm"
                placeholder={`What date are you looking to move?\nAre there stairs or elevator access?\nDo you need help packing?`}
              />
              <p className="text-sm text-slate-500">
                Great for vertical-specific questions like movers, HVAC, roofing,
                plumbing, or dental offices.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button className="rounded-xl">Save intake script</Button>
        </div>
      </form>
    </div>
  );
}
