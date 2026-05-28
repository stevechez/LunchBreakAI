// src/app/dashboard/intake-script/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function getCurrentBusinessId() {
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

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateIntakeScriptAction(formData: FormData) {
  const businessId = await getCurrentBusinessId();
  const supabase = await createClient();

  const scriptId = getString(formData, "script_id");
  const name = getString(formData, "name");
  const industry = getString(formData, "industry");
  const prompt = getString(formData, "prompt");
  const requiredFieldsRaw = getString(formData, "required_fields");
  const customQuestionsRaw = getString(formData, "custom_questions");

  if (!scriptId) {
    redirect("/dashboard/intake-script?error=Missing script id");
  }

  if (!name || !prompt) {
    redirect("/dashboard/intake-script?error=Name and prompt are required");
  }

  const requiredFields = parseLines(requiredFieldsRaw);
  const customQuestions = parseLines(customQuestionsRaw);

  const { error } = await supabase
    .from("intake_scripts")
    .update({
      name,
      industry: industry || null,
      prompt,
      required_fields: requiredFields,
      custom_questions: customQuestions,
      is_active: true,
    })
    .eq("id", scriptId)
    .eq("business_id", businessId);

  if (error) {
    redirect(`/dashboard/intake-script?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard/intake-script");

  redirect("/dashboard/intake-script?saved=true");
}
