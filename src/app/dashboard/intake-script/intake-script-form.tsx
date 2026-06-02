// src/app/dashboard/intake-script/intake-script-form.tsx
'use client';

import { useMemo, useState } from 'react';
import { Wand2, ShieldCheck } from 'lucide-react';
import { updateIntakeScriptAction } from './actions';
import {
	getIntakeTemplateByIndustry,
	intakeTemplates,
	type IntakeTemplate,
} from '@/lib/intake-templates';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type IntakeScriptFormProps = {
	script: {
		id: string;
		name: string | null;
		industry: string | null;
		prompt: string | null;
		required_fields: unknown;
		custom_questions: unknown;
		is_active: boolean | null;
	};
};

function stringifyLines(value: unknown) {
	return Array.isArray(value) ? value.join('\n') : '';
}

export function IntakeScriptForm({ script }: IntakeScriptFormProps) {
	const defaultTemplate = useMemo(
		() => getIntakeTemplateByIndustry(script.industry),
		[script.industry],
	);

	const [name, setName] = useState(script.name || defaultTemplate.scriptName);
	const [industry, setIndustry] = useState(
		script.industry || defaultTemplate.industry,
	);
	const [prompt, setPrompt] = useState(script.prompt || defaultTemplate.prompt);
	const [requiredFields, setRequiredFields] = useState(
		stringifyLines(script.required_fields) ||
			defaultTemplate.requiredFields.join('\n'),
	);
	const [customQuestions, setCustomQuestions] = useState(
		stringifyLines(script.custom_questions) ||
			defaultTemplate.customQuestions.join('\n'),
	);
	const [selectedTemplateKey, setSelectedTemplateKey] = useState(
		defaultTemplate.key,
	);

	function applyTemplate(template: IntakeTemplate) {
		setSelectedTemplateKey(template.key);
		setName(template.scriptName);
		setIndustry(template.industry);
		setPrompt(template.prompt);
		setRequiredFields(template.requiredFields.join('\n'));
		setCustomQuestions(template.customQuestions.join('\n'));
	}

	return (
		<form action={updateIntakeScriptAction} className="space-y-8">
			<input type="hidden" name="script_id" value={script.id} />

			<Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
				<CardHeader>
					<div className="flex items-start gap-3">
						<div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/20">
							<Wand2 className="h-5 w-5" />
						</div>

						<div>
							<CardTitle>Industry templates</CardTitle>
							<p className="mt-2 text-sm text-slate-600">
								Start with a proven intake flow, then customize it for the
								business. This makes setup feel safe, fast, and specific.
							</p>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
						{intakeTemplates.map(template => {
							const isSelected = selectedTemplateKey === template.key;

							return (
								<button
									key={template.key}
									type="button"
									onClick={() => applyTemplate(template)}
									className={
										isSelected
											? 'rounded-2xl border border-blue-500 bg-white p-4 text-left shadow-md ring-2 ring-blue-100'
											: 'rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md'
									}
								>
									<p className="font-semibold text-slate-950">
										{template.label}
									</p>
									<p className="mt-2 text-sm leading-5 text-slate-600">
										{template.description}
									</p>
								</button>
							);
						})}
					</div>
				</CardContent>
			</Card>

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
							value={name}
							onChange={event => setName(event.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="industry">Industry</Label>
						<Input
							id="industry"
							name="industry"
							value={industry}
							onChange={event => setIndustry(event.target.value)}
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
						value={prompt}
						onChange={event => setPrompt(event.target.value)}
						required
						className="min-h-80 font-mono text-sm"
					/>
					<p className="text-sm text-slate-500">
						This is the core behavior for the AI receptionist. Keep it clear,
						specific, and bounded. The AI should capture information, not quote
						pricing or promise availability.
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
							value={requiredFields}
							onChange={event => setRequiredFields(event.target.value)}
							className="min-h-64 font-mono text-sm"
						/>
						<p className="text-sm text-slate-500">
							These become the structured fields the AI should try to capture
							before creating the lead summary.
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
							value={customQuestions}
							onChange={event => setCustomQuestions(event.target.value)}
							className="min-h-64 text-sm"
						/>
						<p className="text-sm text-slate-500">
							These are the vertical-specific questions that make the
							receptionist feel trained for the business.
						</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-start gap-3">
						<div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
							<ShieldCheck className="h-5 w-5" />
						</div>

						<div>
							<CardTitle>Trust guardrails</CardTitle>
							<p className="mt-2 text-sm text-slate-600">
								These rules make the receptionist feel controlled, reviewed, and
								safe for real callers.
							</p>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div className="grid gap-3 md:grid-cols-2">
						{[
							'Does not quote exact prices',
							'Does not promise availability',
							'Does not claim to be human',
							'Does not book jobs without approval',
							'Asks one question at a time',
							'Confirms the team will follow up',
						].map(guardrail => (
							<div
								key={guardrail}
								className="rounded-2xl border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700"
							>
								{guardrail}
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button className="rounded-xl">Save intake script</Button>
			</div>
		</form>
	);
}
