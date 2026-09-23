import './figure.css';

type Status = 'running' | 'queued' | 'backlog' | 'stopped' | 'idle';
type Design = 'single' | 'people' | 'roles';

const statusLabel: Record<Status, string> = {
  running: 'Running',
  queued: 'Queued',
  backlog: 'Backlogged',
  stopped: 'Stopped',
  idle: 'Idle',
};

const statusIcon: Record<Status, string> = {
  running: '✓',
  queued: '❚❚',
  backlog: '❚❚',
  stopped: '✕',
  idle: '–',
};

type Step = { name: string; runner: Record<Design, string> };

const steps: Step[] = [
  { name: 'Read and classify', runner: { single: 'Frontier model', people: 'Frontier model', roles: 'Private model' } },
  { name: 'Extract fields', runner: { single: 'Frontier model', people: 'Frontier model', roles: 'Private model' } },
  { name: 'Check against policy', runner: { single: 'Frontier model', people: 'Frontier model', roles: 'Rules engine' } },
  { name: 'Resolve hard exceptions', runner: { single: 'Frontier model', people: 'Frontier model', roles: 'Frontier model' } },
  { name: 'Decide policy calls', runner: { single: 'Person', people: 'Person', roles: 'Person' } },
];

type StepState = { status: Status; detail: string; runner?: string };
type Scenario = { steps: StepState[]; finished: number; queued: number; stuck: number; queuedLabel?: string };

const available: StepState[] = [
  { status: 'running', detail: '100 invoices' },
  { status: 'running', detail: '100 invoices' },
  { status: 'running', detail: '12 flagged as exceptions' },
  { status: 'running', detail: '12 exceptions' },
  { status: 'running', detail: '3 need a person' },
];

const scenarios: Record<'up' | 'down', Record<Design, Scenario>> = {
  up: {
    single: { steps: available, finished: 100, queued: 0, stuck: 0 },
    people: { steps: available, finished: 100, queued: 0, stuck: 0 },
    roles: {
      steps: available.map((step, index) => (index === 3 ? { ...step, detail: '12 exceptions, redacted' } : step)),
      finished: 100,
      queued: 0,
      stuck: 0,
    },
  },
  down: {
    single: {
      steps: [
        { status: 'stopped', detail: '100 invoices waiting' },
        { status: 'stopped', detail: 'Nothing arrives' },
        { status: 'stopped', detail: 'Nothing arrives' },
        { status: 'stopped', detail: 'Nothing arrives' },
        { status: 'idle', detail: 'Nothing arrives' },
      ],
      finished: 0,
      queued: 0,
      stuck: 100,
    },
    people: {
      steps: [
        { status: 'backlog', runner: 'Operations team', detail: '100 to read by hand' },
        { status: 'backlog', runner: 'Operations team', detail: 'Typed in by hand' },
        { status: 'backlog', runner: 'Operations team', detail: 'Checked by hand' },
        { status: 'backlog', runner: 'Operations team', detail: '12 exceptions' },
        { status: 'backlog', runner: 'Operations team', detail: 'Same team, now behind' },
      ],
      finished: 20,
      queued: 80,
      stuck: 0,
      queuedLabel: 'backlogged',
    },
    roles: {
      steps: [
        { status: 'running', detail: '100 invoices' },
        { status: 'running', detail: '100 invoices' },
        { status: 'running', detail: '12 flagged as exceptions' },
        { status: 'queued', detail: '12 wait for the provider' },
        { status: 'idle', detail: 'Waits on the queue' },
      ],
      finished: 88,
      queued: 12,
      stuck: 0,
    },
  },
};

const designs: { id: Design; title: string }[] = [
  { id: 'single', title: 'One provider for everything' },
  { id: 'people', title: 'Send everything to people' },
  { id: 'roles', title: 'A model for each job' },
];

const summaries = {
  up: 'With every provider up, all three designs finish all 100 invoices, so a normal day won’t tell you which one you have.',
  down: 'With one provider, nothing moves and all 100 invoices wait for the vendor. Sending everything to people keeps work moving, but a team that normally decides 3 invoices a day gets 100 and finishes about 20. With a model for each job, the 88 routine invoices finish and only the 12 hard exceptions wait for the frontier model.',
};

function outcomeText({ finished, queued, stuck, queuedLabel = 'queued' }: Scenario) {
  const parts = [`<strong>${finished} of 100 finished</strong>`];
  if (queued) parts.push(`${queued} ${queuedLabel}`);
  if (stuck) parts.push(`${stuck} stuck`);
  return parts.join(' · ');
}

function renderDesign(design: (typeof designs)[number], scenario: Scenario) {
  const segments = (
    [
      ['finished', scenario.finished],
      ['queued', scenario.queued],
      ['stuck', scenario.stuck],
    ] as const
  )
    .map(([kind, value]) => `<span class="mo-segment mo-segment--${kind}" style="flex-grow: ${value}"></span>`)
    .join('');

  return `
    <section class="mo-design" aria-labelledby="mo-${design.id}-title">
      <header class="mo-design__header">
        <h4 id="mo-${design.id}-title">${design.title}</h4>
        <p class="mo-outcome-text">${outcomeText(scenario)}</p>
      </header>
      <ol class="mo-steps">
        ${steps
          .map((step, index) => {
            const state = scenario.steps[index];
            return `
            <li class="mo-step is-${state.status}">
              <span class="mo-step__runner">${state.runner ?? step.runner[design.id]}</span>
              <span class="mo-step__name">${step.name}</span>
              <span class="mo-step__status"><span class="mo-icon" aria-hidden="true">${statusIcon[state.status]}</span>${statusLabel[state.status]}<span class="mo-step__detail">${state.detail}</span></span>
            </li>`;
          })
          .join('')}
      </ol>
      <div class="mo-bar" aria-hidden="true">${segments}</div>
    </section>`;
}

export function enhance(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-figure-stage]');
  if (!stage) return;

  const table = stage.querySelector('table');
  root.classList.add('mo-figure');

  stage.innerHTML = `
    <div class="mo-app">
      <div class="mo-header">
        <div class="mo-control">
          <span class="mo-control__label" id="mo-control-label">Frontier model</span>
          <div class="mo-toggle" role="group" aria-labelledby="mo-control-label">
            <button type="button" data-state="up" aria-pressed="false">Available</button>
            <button type="button" data-state="down" aria-pressed="false">Down</button>
          </div>
        </div>
        <ul class="mo-legend" aria-label="Legend">
          <li><i class="mo-key mo-key--finished"></i>Running / finished</li>
          <li><i class="mo-key mo-key--queued"></i>Queued / backlogged</li>
          <li><i class="mo-key mo-key--stuck"></i>Stopped / stuck</li>
        </ul>
      </div>
      <p class="mo-summary" data-summary aria-live="polite"></p>
      <div class="mo-designs" data-designs></div>
      <details class="mo-table">
        <summary>Show as a table</summary>
      </details>
    </div>`;

  if (table) stage.querySelector('details')!.append(table);

  const summary = stage.querySelector<HTMLElement>('[data-summary]')!;
  const container = stage.querySelector<HTMLElement>('[data-designs]')!;
  const buttons = Array.from(stage.querySelectorAll<HTMLButtonElement>('[data-state]'));
  const controller = new AbortController();
  let state: 'up' | 'down' = 'down';

  function render() {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.state === state)));
    summary.textContent = summaries[state];
    container.innerHTML = designs.map((design) => renderDesign(design, scenarios[state][design.id])).join('');
  }

  buttons.forEach((button) =>
    button.addEventListener(
      'click',
      () => {
        state = button.dataset.state as 'up' | 'down';
        render();
      },
      { signal: controller.signal },
    ),
  );

  render();

  return () => controller.abort();
}
