# Editorial brief: AI safety without locking in the leaders

Source: https://chatgpt.com/s/t_6aa5973ff95c8191857fe4d937848531, retrieved September 12, 2026. The public page's embedded message contains one assistant response developing the user's counter-thesis; the original user prompt is not included. Three follow-up suggestions are metadata, not user instructions. Do not invent firsthand experience.

Source idea: “the institutional mechanism proposed to achieve safety may structurally favor today's incumbents.” Preserve the concern that pacing could protect current leaders, international experimentation could continue, and changing costs could erode compute chokepoints.

Thesis: AI safety rules should constrain dangerous capabilities while keeping a credible path for new entrants; concentrating oversight at today's frontier labs may entrench them and lose effectiveness as capabilities diffuse.

Reader: builders and technically engaged readers assessing AI governance. Help them distinguish frontier leadership from control over a given capability, and judge policy by both safety effects and barriers to entry.

Voice: candid, concrete, first-person judgment without invented memories. Reference posts read: `the-uneven-days-of-agentic-building.md`, `building-products-for-agents.md`, and `design-ai-workflows-like-access-can-break.md`. Follow the argument rather than imposing a template. No personal allegations of corruption or claims that Amodei ignores efficiency/international competition.

Manuscript v3 (final precision edit): `src/content/blog/ai-safety-without-locking-in-the-leaders.md`. Stored as a draft; no publication or deployment requested.

## Evidence ledger

| Claim | Source | Limits |
| --- | --- | --- |
| Embedded evaluators, democratic coordination, global coordination; preference for capability checks; possible input restrictions | https://darioamodei.com/post/we-must-pace-the-frontier (September 2026), read in full | Proposal, not enacted law. Attribute accurately. Keep source-derived summary within 200 words across article. |
| Same essay explicitly addresses geopolitical lead, chips, weight theft, unauthorized distillation, and difficulty of global agreement | Same primary essay | Do not imply he ignores foreign competition or advocates a blanket licensing cartel. |
| Efficiency can fuel larger runs while lowering cost at a given capability | https://darioamodei.com/post/on-deepseek-and-export-controls (January 2025) | His argument; no claim that efficiency eliminates frontier capital intensity. |
| V3 official training figures (researched, removed from v2) | https://arxiv.org/html/2412.19437v1, introduction and table 1 | A single run did not establish changing costs. Cut the numerical detour rather than add an unnecessary comparison. |
| R1 outputs used to train smaller Qwen/Llama-derived models, 1.5B–70B parameters | https://github.com/deepseek-ai/DeepSeek-R1, sections 2–3 | Demonstrates transfer of some behavior, not full capability equivalence or release of a particular dangerous capability. |
| Fixed compliance costs may deter entrants; feedback through revenue and regulator familiarity | Source excerpt plus essay's explicitly hypothetical mechanism | Conditional analysis, no measured estimate or accusation of intent. |
| Restrictions may delay work or relocate it, depending on substitutes and enforcement | Source idea, author analysis | No universal historical claim, no quantified international advantage. |
| Relative risk compounding cannot be given a single demonstrated ranking here | Author judgment | No unsupported doubling times or probability estimates. |
| Shared evaluation infrastructure, independent oversight, appeals, review deadlines, capability triggers | Author proposals | Not descriptions of current law, proven safeguards, or loopholes exempting small dangerous systems. |

## Review contract

Read only; publisher alone edits. Each judge reads the same brief, ledger, manuscript and voice notes, plus only their assigned profile. Return: thesis and drift; strongest contribution/passage to retain; up to three passage-specific problems with concrete fixes, separating factual/fidelity blockers from craft suggestions; scores 1–5 for fidelity, distinctiveness, clarity, evidence/calibration, and specialist lens with brief reasons; ready/revise/blocked verdict. After revision, provide a concise final check against the same brief.

## Publisher decisions

- Replaced the excerpt's implication that Amodei overlooks international incentives with a challenge to the durability of his proposed controls, after reading his actual September essay.
- Omitted the unsourced $50–100B cluster premise and allegations of an incumbent cartel.
- Used a hypothetical entrant to explain fixed costs without manufacturing a personal experience or measured compliance burden.
- Kept policy prescriptions as proposals and separated useful capability diffusion from evidence of dangerous capability diffusion.
- First reviews: all three judges scored fidelity 5/5 and recommended revision. Idea and technical editors identified that one V3 run did not establish a cost trend; removed that paragraph. Voice editor favored its qualifications, but those did not resolve its evidentiary role.
- Added an explicitly hypothetical compute-trigger failure and connected falling technical costs to a rising compliance share of entry costs, following the idea and technical editors.
- Removed the redundant explanation that the opening is hypothetical, compressed the relative-risk discussion, and gave the policy section a clearer applicant perspective, following the voice editor and unslop-writing pass.
- Retained a short international proposal because international competition is central to the supplied idea; cut its broader agenda. Renamed the risk heading to match what the section actually establishes.
- Final v2 checks: idea and voice editors judged ready, fidelity 5/5. Technical editor found no factual/fidelity blockers and requested one precision edit: increasing compliance's share does not establish increasing absolute deterrence, and sub-threshold projects may owe no approval costs. Adopted that correction in v3 by specifying that approval costs remain a barrier where requirements still apply; removed “entry problem could get worse.”
- Technical editor confirmed v3 ready, fidelity 5/5, with no unresolved factual or fidelity blockers. All three editorial perspectives have cleared the manuscript.
- Validation: `bun run build`, `bun run check:seo`, and `git diff --check` passed. SEO audit confirms the draft has no public route, RSS entry, or sitemap entry. No deployment performed.

## Supporting visual

Removed the mid-post compute-threshold diagram and its dedicated CSS at the author’s request. The prose explanation and generated hero illustration remain.
