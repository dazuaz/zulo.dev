import './figure.css';

type Actor = 'system' | 'agent' | 'person';
type Tone = 'plain' | 'ok' | 'fail' | 'add' | 'del' | 'note';
type Line = { tone: Tone; key?: string; text: string };

type Stage = {
  name: string;
  title: string;
  actors: { kind: Actor; label: string }[];
  explanation: string;
  artifact: { title: string; lines: Line[] };
};

const actorNames: Record<Actor, string> = { system: 'System', agent: 'Agent', person: 'Person' };

const stages: Stage[] = [
  {
    name: 'Capture',
    title: 'Record the failure',
    actors: [{ kind: 'system', label: 'System' }],
    explanation:
      'The failed transfer is saved with enough detail to reproduce it: the field, the raw value, the source, and what was already written. Not a ticket that says “the import broke.”',
    artifact: {
      title: 'Failure record · LN-20418',
      lines: [
        { tone: 'fail', text: 'Transfer failed writing closing_date' },
        { tone: 'plain', key: 'Source', text: 'Legacy LOS API v2' },
        { tone: 'plain', key: 'Value', text: '"03/04/26"' },
        { tone: 'plain', key: 'Expected', text: 'ISO 8601 date (2026-03-04)' },
        { tone: 'plain', key: 'Documents', text: '0 of 6 written' },
      ],
    },
  },
  {
    name: 'Reproduce',
    title: 'Make it fail on purpose',
    actors: [{ kind: 'agent', label: 'Agent' }],
    explanation:
      'The agent turns the record into a redacted fixture and a test that fails the same way. If it can’t reproduce the failure, it stops and says so instead of guessing at a fix.',
    artifact: {
      title: 'tests/transfers/ln-20418.test.ts',
      lines: [
        { tone: 'plain', key: 'Fixture', text: 'fixtures/ln-20418.json (borrower data redacted)' },
        { tone: 'fail', text: 'parses closing_date "03/04/26"' },
        { tone: 'note', text: 'InvalidDateError: expected yyyy-MM-dd' },
      ],
    },
  },
  {
    name: 'Fix',
    title: 'Change the parser',
    actors: [{ kind: 'agent', label: 'Agent' }],
    explanation:
      'The agent changes the date parser to accept the legacy format, then runs the new test with every existing case so the fix can’t quietly break another source.',
    artifact: {
      title: 'src/parse/dates.ts',
      lines: [
        { tone: 'del', text: 'return parseISO(value)' },
        { tone: 'add', text: "return parseLoanDate(value, ['yyyy-MM-dd', 'MM/dd/yy'])" },
        { tone: 'ok', text: 'ln-20418 passes' },
        { tone: 'ok', text: '214 existing cases pass' },
      ],
    },
  },
  {
    name: 'Review',
    title: 'Two people, two questions',
    actors: [
      { kind: 'person', label: 'Engineer' },
      { kind: 'person', label: 'Operations owner' },
    ],
    explanation:
      'The engineer reviews the code with the error and test results beside it. But the agent had to guess the date order, and only the operations owner knows what the legacy system means.',
    artifact: {
      title: 'Review · LN-20418',
      lines: [
        { tone: 'note', key: 'Agent', text: '"03/04/26" could be March 4 or April 3. Assumed MM/dd/yy.' },
        { tone: 'ok', key: 'Operations', text: 'Confirmed: March 4, 2026' },
        { tone: 'ok', key: 'Engineer', text: 'Change approved' },
      ],
    },
  },
  {
    name: 'Verify',
    title: 'Retry and check the result',
    actors: [{ kind: 'system', label: 'System' }],
    explanation:
      'The transfer is retried with checks for duplicates, and the destination is compared field by field with the source. The loan officer hears what changed and that the record is complete.',
    artifact: {
      title: 'Retry · LN-20418',
      lines: [
        { tone: 'ok', text: 'No duplicate loan record' },
        { tone: 'ok', text: '6 of 6 documents, no duplicates' },
        { tone: 'ok', text: 'Destination matches source (42 fields)' },
        { tone: 'plain', key: 'Loan officer', text: 'Notified: record complete' },
      ],
    },
  },
];

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const marks: Record<Tone, string> = { plain: '', ok: '✓', fail: '✕', add: '+', del: '−', note: '›' };

function renderLine(line: Line) {
  const key = line.key ? `<span class="fl-line__key">${escape(line.key)}</span>` : '';
  return `<li class="fl-line fl-line--${line.tone}">
    <span class="fl-line__mark" aria-hidden="true">${marks[line.tone]}</span>
    ${key}<span class="fl-line__text">${escape(line.text)}</span>
  </li>`;
}

function renderPanel(stage: Stage, index: number) {
  return `
    <div class="fl-panel__copy">
      <p class="fl-panel__count">Stage ${index + 1} of ${stages.length}</p>
      <h4>${stage.title}</h4>
      <ul class="fl-actors" aria-label="Who acts">
        ${stage.actors.map((actor) => `<li class="fl-actor fl-actor--${actor.kind}"><i aria-hidden="true"></i>${actor.label}</li>`).join('')}
      </ul>
      <p class="fl-panel__text">${stage.explanation}</p>
    </div>
    <div class="fl-artifact">
      <p class="fl-artifact__title">${escape(stage.artifact.title)}</p>
      <ul class="fl-artifact__lines">${stage.artifact.lines.map(renderLine).join('')}</ul>
    </div>`;
}

export function enhance(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-figure-stage]');
  if (!stage) return;

  const fallback = stage.querySelector('ol');
  root.classList.add('fl-figure');
  const id = root.id || 'failure-loop';

  stage.innerHTML = `
    <div class="fl-app">
      <div class="fl-rail-wrap">
        <div class="fl-rail" role="tablist" aria-label="Stages">
          ${stages
            .map(
              (item, index) => `
            <button type="button" role="tab" class="fl-tab" id="${id}-tab-${index}" aria-controls="${id}-panel" aria-selected="false" tabindex="-1">
              <span class="fl-tab__node fl-tab__node--${item.actors[0].kind}">${index + 1}</span>
              <span class="fl-tab__name">${item.name}</span>
              <span class="fl-tab__actor">${[...new Set(item.actors.map((actor) => actorNames[actor.kind]))].join(' + ')}</span>
            </button>`,
            )
            .join('')}
        </div>
        <div class="fl-return" aria-hidden="true"><span>Test kept · the next transfer in this format passes</span></div>
      </div>
      <div class="fl-panel" id="${id}-panel" role="tabpanel" tabindex="0"></div>
      <div class="fl-nav">
        <button type="button" data-step="-1">← Previous</button>
        <button type="button" data-step="1">Next →</button>
      </div>
    </div>`;

  if (fallback) fallback.remove();

  const tabs = Array.from(stage.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panel = stage.querySelector<HTMLElement>('[role="tabpanel"]')!;
  const [prev, next] = Array.from(stage.querySelectorAll<HTMLButtonElement>('[data-step]'));
  const controller = new AbortController();
  const { signal } = controller;
  let current = 0;

  function select(index: number, focus = false) {
    current = Math.max(0, Math.min(stages.length - 1, index));
    tabs.forEach((tab, i) => {
      const selected = i === current;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('is-done', i < current);
    });
    panel.setAttribute('aria-labelledby', tabs[current].id);
    panel.innerHTML = renderPanel(stages[current], current);
    prev.disabled = current === 0;
    next.disabled = current === stages.length - 1;
    if (focus) tabs[current].focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index), { signal });
    tab.addEventListener(
      'keydown',
      (event) => {
        const keys: Record<string, number> = {
          ArrowRight: current + 1,
          ArrowLeft: current - 1,
          Home: 0,
          End: stages.length - 1,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key], true);
      },
      { signal },
    );
  });

  [prev, next].forEach((button) =>
    button.addEventListener('click', () => select(current + Number(button.dataset.step)), { signal }),
  );

  select(0);

  return () => controller.abort();
}
