import './figure.css';

type Part = { kind: 'text' | 'call' | 'reply'; text: string };
type Step = { name: string; person: string; agent: Part[]; note: string };

const steps: Step[] = [
  {
    name: 'Find out what’s possible',
    person: 'Sees a Schedule tab and a drag handle on each job.',
    agent: [
      { kind: 'text', text: 'Reads three tool descriptions:' },
      { kind: 'call', text: 'find_jobs · reschedule_job · notify_customer' },
    ],
    note: 'Controls on a screen become descriptions in text.',
  },
  {
    name: 'Find the job',
    person: 'Types “Garcia” and picks the right card by its address.',
    agent: [
      { kind: 'call', text: 'find_jobs(customer: "Garcia")' },
      { kind: 'reply', text: 'Panel upgrade · Garcia · Tue Nov 3, 9–11 a.m. · job_8812' },
    ],
    note: 'A name and a time, not only an ID.',
  },
  {
    name: 'Try the change',
    person: 'Drags the card to Thursday at 2 p.m. The slot turns red.',
    agent: [
      { kind: 'call', text: 'reschedule_job(job_8812, "Thu 2–4 p.m.")' },
      { kind: 'reply', text: 'Overlaps another job until 3 p.m. Open Thursday windows: 10 a.m.–noon, 3–5 p.m.' },
    ],
    note: 'The error says what to try next.',
  },
  {
    name: 'Decide',
    person: 'Drops it at 3 p.m. instead.',
    agent: [
      { kind: 'call', text: 'reschedule_job(job_8812, "Thu 3–5 p.m.")' },
      { kind: 'reply', text: 'Rescheduled.' },
    ],
    note: 'Still inside what the owner asked for: Thursday afternoon.',
  },
  {
    name: 'Tell the customer',
    person: 'Opens the customer’s thread and types a note.',
    agent: [
      { kind: 'call', text: 'notify_customer(job_8812, template: "rescheduled")' },
      { kind: 'reply', text: 'Sent from the business number. Free-form messages go to the owner first.' },
    ],
    note: 'The handoff: words in the owner’s name wait for the owner.',
  },
  {
    name: 'Leave a record',
    person: 'History: “Moved by the owner.”',
    agent: [
      { kind: 'text', text: 'History: “Moved by Assistant, an agent, for the owner,” with an undo.' },
      { kind: 'text', text: 'The owner gets a one-line summary.' },
    ],
    note: 'The person stays accountable, so the person stays informed.',
  },
];

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderPart(part: Part) {
  const text = escapeHtml(part.text);
  if (part.kind === 'call') return `<code class="ot-call">${text}</code>`;
  if (part.kind === 'reply') return `<p class="ot-reply"><span aria-hidden="true">←</span> ${text}</p>`;
  return `<p>${text}</p>`;
}

function renderStep(step: Step, index: number) {
  const number = String(index + 1).padStart(2, '0');
  return `
    <li class="ot-step">
      <div class="ot-step__label">
        <span class="ot-step__number" aria-hidden="true">${number}</span>
        <h4>${escapeHtml(step.name)}</h4>
        <p class="ot-step__note">${escapeHtml(step.note)}</p>
      </div>
      <div class="ot-card ot-card--person">
        <span class="ot-card__lane">Owner, in the app</span>
        <p>${escapeHtml(step.person)}</p>
      </div>
      <div class="ot-card ot-card--agent">
        <span class="ot-card__lane">Agent, through the tools</span>
        ${step.agent.map(renderPart).join('')}
      </div>
    </li>`;
}

export function enhance(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-figure-stage]');
  if (!stage) return;

  const table = stage.querySelector('table');
  root.classList.add('ot-figure');

  stage.innerHTML = `
    <div class="ot-app">
      <div class="ot-lanes" aria-hidden="true">
        <span></span>
        <span class="ot-lane ot-lane--person"><i></i>The owner, at the screen</span>
        <span class="ot-lane ot-lane--agent"><i></i>The owner’s agent, through the app’s tools</span>
      </div>
      <ol class="ot-steps">${steps.map(renderStep).join('')}</ol>
      <details class="ot-table">
        <summary>Show as a table</summary>
      </details>
    </div>`;

  if (table) stage.querySelector('details')!.append(table);
}
