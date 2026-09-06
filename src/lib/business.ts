export const services = [
    { number: '01', symbol: '↗', title: 'Find the right opportunity.', description: 'Make a clear decision about where AI belongs in your business. Assess your workflows, data, and constraints, then prioritize what is worth building.', deliverables: ['Workflow & opportunity assessment', 'Prioritized implementation roadmap', 'Success measures & risk review'], tag: 'AI STRATEGY' },
    { number: '02', symbol: '⌘', title: 'Build it into the business.', description: 'Connect AI to the tools and information your team uses. Create dependable agents, automations, and products around the way your operation runs.', deliverables: ['Custom agents & workflow automation', 'Knowledge systems & integrations', 'Interfaces built for your team'], tag: 'SYSTEMS & ENGINEERING' },
    { number: '03', symbol: '◎', title: 'Make the change stick.', description: 'Get the system into daily use. Work through adoption, define human oversight, and improve performance as the team learns what is possible.', deliverables: ['Team training & practical playbooks', 'Evaluation, monitoring & safeguards', 'Ongoing iteration & support'], tag: 'ADOPTION & GROWTH' },
];
export const workflows = [
    { number: '01', title: 'Documents that move work forward.', category: 'OPERATIONS', before: 'People copy information between documents, spreadsheets, and business systems.', after: 'Extract and validate the key information, flag exceptions for review, and route it to the next step.', measure: 'Processing time · Rework · Exception rate' },
    { number: '02', title: 'Answers with the context behind them.', category: 'KNOWLEDGE', before: 'Teams search scattered files or wait for the one person who knows the answer.', after: 'Find answers across approved sources, with references and access controls that follow the user.', measure: 'Search time · Answer quality · Adoption' },
    { number: '03', title: 'Workflows with fewer loose ends.', category: 'ORCHESTRATION', before: 'Routine follow-ups and handoffs rely on someone remembering the next action.', after: 'Connect the steps, prepare the next action, and bring people in when a decision needs their judgment.', measure: 'Cycle time · Missed handoffs · Manual touches' },
];
export const steps = [
    { title: 'Understand', text: 'Map the work with the people doing it. Identify the bottleneck, the available data, and what a better outcome would look like.', output: 'A focused opportunity' },
    { title: 'Prove', text: 'Build a small, useful version. Test it with representative work and compare the result against a baseline.', output: 'Evidence to move forward' },
    { title: 'Integrate', text: 'Connect the system, handle exceptions, and give the team the controls and training they need to use it confidently.', output: 'A working capability' },
    { title: 'Improve', text: 'Track quality and usage, learn from the edge cases, and expand where the results justify the next investment.', output: 'A stronger operation' },
];
export const faqs = [
    { question: 'We know AI matters. Where do we start?', answer: 'Start with a recurring bottleneck: a slow process, repeated manual work, or information that is hard to use. Our first conversation is about that business problem. From there, we can scope an assessment or a focused pilot.' },
    { question: 'Do we need to replace our existing tools?', answer: 'Often, the useful work is connecting and extending what you already have. We assess your current systems first, then choose whether configuration, integration, or custom development makes the most sense.' },
    { question: 'How do you handle sensitive data and AI mistakes?', answer: 'We define data access, appropriate model use, evaluation criteria, and human review as part of the design. Higher-risk actions need stronger controls. The scope and safeguards depend on your information, systems, and operating requirements.' },
    { question: 'What does an engagement look like?', answer: 'We agree on a defined problem, deliverables, and success measures before starting. Work can begin with an assessment or a focused build, then continue into rollout and ongoing improvement. Timing and fees are scoped to the actual work.' },
];
