import './figure.css';

type Rule = 'compute' | 'capability';

const YEARS = [0, 1, 2, 3, 4, 5, 6];
const TRIGGER = 50;
const APPROVAL = 60;
const frontier = YEARS.map((year) => Math.round(100 * 1.5 ** year));
const capability = YEARS.map((year) => Math.round(100 * 0.6 ** year));
// Year at which the compute needed for Capability X drops below the trigger.
const CROSSING = Math.log(TRIGGER / 100) / Math.log(0.6);

const reviewed = (rule: Rule, index: number) => rule === 'capability' || capability[index] >= TRIGGER;
const approvalCost = (rule: Rule, index: number) => (reviewed(rule, index) ? APPROVAL : 0);

const rules: Record<Rule, { label: string; summary: string }> = {
  compute: {
    label: 'Compute trigger',
    summary:
      'Only training runs above 50 units are reviewed. The frontier always is. But from year 2, Capability X can be reproduced below the trigger, and a new lab can field it with no review at all.',
  },
  capability: {
    label: 'Capability trigger',
    summary:
      'Every system with Capability X is reviewed, however cheap. But approval stays at 60 while compute falls to 5, so by year 6 approval is 92% of what a new lab pays to enter.',
  },
};

const fmt = (value: number) => value.toLocaleString('en-US');

function niceHeight(width: number) {
  return width < 420 ? 230 : 270;
}

function chartA(width: number, rule: Rule, active: number | null) {
  const height = niceHeight(width);
  const wide = width >= 420;
  const m = { top: 14, right: wide ? 112 : 16, bottom: 34, left: 40 };
  const w = width - m.left - m.right;
  const h = height - m.top - m.bottom;
  const x = (year: number) => m.left + (year / 6) * w;
  const [lo, hi] = [3, 2000];
  const y = (value: number) => m.top + h - ((Math.log10(value) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * h;
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');

  const grid = [10, 100, 1000]
    .map(
      (tick) => `
      <line class="cc-grid" x1="${m.left}" x2="${m.left + w}" y1="${y(tick)}" y2="${y(tick)}" />
      <text class="cc-tick" x="${m.left - 8}" y="${y(tick)}" text-anchor="end" dominant-baseline="middle">${fmt(tick)}</text>`,
    )
    .join('');

  const xTicks = YEARS.map(
    (year) => `<text class="cc-tick" x="${x(year)}" y="${m.top + h + 20}" text-anchor="middle">${year}</text>`,
  ).join('');

  const blindSpot =
    rule === 'compute'
      ? `<rect class="cc-blind" x="${x(CROSSING)}" y="${y(TRIGGER)}" width="${x(6) - x(CROSSING)}" height="${m.top + h - y(TRIGGER)}" />
         <text class="cc-blind-label" x="${x(CROSSING) + 8}" y="${m.top + h - 10}">${wide ? 'Blind spot: Capability X, no review' : 'Blind spot: no review'}</text>`
      : '';

  const trigger = `
    <g class="cc-trigger${rule === 'capability' ? ' is-muted' : ''}">
      <line x1="${m.left}" x2="${m.left + w}" y1="${y(TRIGGER)}" y2="${y(TRIGGER)}" />
      <text x="${m.left + w - 4}" y="${y(TRIGGER) - 6}" text-anchor="end">${rule === 'compute' ? 'Review trigger · 50' : 'Compute can still flag projects · 50'}</text>
    </g>`;

  const guide =
    active === null
      ? ''
      : `<line class="cc-guide" x1="${x(active)}" x2="${x(active)}" y1="${m.top}" y2="${m.top + h}" />`;

  const dots = capability
    .map((value, i) => {
      const isReviewed = reviewed(rule, i);
      const r = active === i ? 5.5 : 4;
      return `<circle class="cc-dot ${isReviewed ? 'is-reviewed' : 'is-unreviewed'}" cx="${x(i)}" cy="${y(value)}" r="${r}" />`;
    })
    .join('');

  const frontierDots = active === null ? '' : `<circle class="cc-dot cc-dot--frontier" cx="${x(active)}" cy="${y(frontier[active])}" r="5" />`;

  const endLabels = wide
    ? `<text class="cc-end" x="${x(6) + 10}" y="${y(frontier[6])}" dominant-baseline="middle">Frontier run</text>
       <text class="cc-end" x="${x(6) + 10}" y="${y(capability[6])}" dominant-baseline="middle">Capability X</text>`
    : '';

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${grid}
      ${blindSpot}
      <line class="cc-axis" x1="${m.left}" x2="${m.left + w}" y1="${m.top + h}" y2="${m.top + h}" />
      ${xTicks}
      ${trigger}
      ${guide}
      <path class="cc-line cc-line--frontier" d="${path(frontier)}" />
      <path class="cc-line cc-line--capability" d="${path(capability)}" />
      ${frontierDots}
      ${dots}
      ${endLabels}
    </svg>`;
}

function chartB(width: number, rule: Rule, active: number | null) {
  const height = niceHeight(width);
  const m = { top: 30, right: 16, bottom: 34, left: 40 };
  const w = width - m.left - m.right;
  const h = height - m.top - m.bottom;
  const band = w / YEARS.length;
  const barWidth = Math.min(24, band * 0.55);
  const max = 180;
  const y = (value: number) => m.top + h - (value / max) * h;
  const cx = (i: number) => m.left + band * (i + 0.5);

  const grid = [0, 50, 100, 150]
    .map(
      (tick) => `
      <line class="${tick === 0 ? 'cc-axis' : 'cc-grid'}" x1="${m.left}" x2="${m.left + w}" y1="${y(tick)}" y2="${y(tick)}" />
      <text class="cc-tick" x="${m.left - 8}" y="${y(tick)}" text-anchor="end" dominant-baseline="middle">${tick}</text>`,
    )
    .join('');

  const columns = YEARS.map((year, i) => {
    const compute = capability[i];
    const approval = approvalCost(rule, i);
    const left = cx(i) - barWidth / 2;
    const computeTop = y(compute);
    const gap = approval ? 2 : 0;
    const approvalTop = y(compute + approval);
    const dim = active !== null && active !== i ? ' is-dim' : '';
    const radius = 4;
    const roundedTop = (top: number, bottom: number, cls: string) => {
      const r = Math.min(radius, (bottom - top) / 2);
      return `<path class="${cls}${dim}" d="M${left},${bottom} V${top + r} Q${left},${top} ${left + r},${top} H${left + barWidth - r} Q${left + barWidth},${top} ${left + barWidth},${top + r} V${bottom} Z" />`;
    };
    const computeBar = approval
      ? `<rect class="cc-bar cc-bar--compute${dim}" x="${left}" y="${computeTop}" width="${barWidth}" height="${y(0) - computeTop}" />`
      : roundedTop(computeTop, y(0), 'cc-bar cc-bar--compute');
    const approvalBar = approval ? roundedTop(approvalTop, computeTop - gap, 'cc-bar cc-bar--approval') : '';
    return `<g>${computeBar}${approvalBar}
      <text class="cc-tick" x="${cx(i)}" y="${m.top + h + 20}" text-anchor="middle">${year}</text></g>`;
  }).join('');

  let annotation = '';
  if (rule === 'compute') {
    const x1 = cx(2) - barWidth / 2;
    const x2 = cx(6) + barWidth / 2;
    const yb = y(60);
    annotation = `
      <path class="cc-bracket" d="M${x1},${yb + 6} V${yb} H${x2} V${yb + 6}" />
      <text class="cc-note" x="${(x1 + x2) / 2}" y="${yb - 8}" text-anchor="middle">No review required</text>`;
  } else {
    const share = (i: number) => Math.round((APPROVAL / (APPROVAL + capability[i])) * 100);
    annotation = [0, 6]
      .map(
        (i) =>
          `<text class="cc-note" x="${cx(i)}" y="${y(capability[i] + APPROVAL) - 8}" text-anchor="middle">${share(i)}%</text>`,
      )
      .join('');
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${grid}
      ${columns}
      ${annotation}
    </svg>`;
}

function tooltipA(rule: Rule, i: number) {
  const status = reviewed(rule, i) ? 'reviewed' : 'not reviewed';
  return `<strong>Year ${i}</strong>
    <span><i class="cc-key cc-key--frontier"></i>Frontier run ${fmt(frontier[i])}</span>
    <span><i class="cc-key cc-key--capability"></i>Capability X ${capability[i]} · ${status}</span>`;
}

function tooltipB(rule: Rule, i: number) {
  const approval = approvalCost(rule, i);
  const total = capability[i] + approval;
  return `<strong>Year ${i} · total ${total}</strong>
    <span><i class="cc-key cc-key--compute"></i>Compute ${capability[i]}</span>
    <span><i class="cc-key cc-key--approval"></i>Approval ${approval}${approval ? ` (${Math.round((approval / total) * 100)}%)` : ' · no review'}</span>`;
}

export function enhance(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-figure-stage]');
  if (!stage) return;

  const table = stage.querySelector('table');
  root.classList.add('cc-figure');

  stage.innerHTML = `
    <div class="cc-app">
      <div class="cc-header">
        <div class="cc-toggle" role="group" aria-label="Review rule">
          ${(Object.keys(rules) as Rule[])
            .map((key) => `<button type="button" data-rule="${key}" aria-pressed="false">${rules[key].label}</button>`)
            .join('')}
        </div>
        <p class="cc-summary" data-summary aria-live="polite"></p>
      </div>
      <div class="cc-panels">
        <section class="cc-panel" aria-labelledby="cc-a-title">
          <h4 id="cc-a-title">Compute needed, by year</h4>
          <p class="cc-sub">Log scale</p>
          <ul class="cc-legend">
            <li><i class="cc-key cc-key--frontier"></i>Frontier training run</li>
            <li><i class="cc-key cc-key--capability"></i>Cheapest way to get Capability X</li>
            <li><i class="cc-key cc-key--hollow"></i>Not reviewed</li>
          </ul>
          <div class="cc-chart" data-chart="a" tabindex="0" role="img"></div>
          <p class="cc-axis-title">Years after Capability X first appears</p>
        </section>
        <section class="cc-panel" aria-labelledby="cc-b-title">
          <h4 id="cc-b-title">What a new lab pays to field Capability X</h4>
          <p class="cc-sub" data-sub-b>Same units</p>
          <ul class="cc-legend">
            <li><i class="cc-key cc-key--compute"></i>Compute</li>
            <li><i class="cc-key cc-key--approval"></i>Approval</li>
          </ul>
          <div class="cc-chart" data-chart="b" tabindex="0" role="img"></div>
          <p class="cc-axis-title">Years after Capability X first appears</p>
        </section>
      </div>
      <details class="cc-table">
        <summary>Show the numbers</summary>
      </details>
    </div>`;

  if (table) stage.querySelector('details')!.append(table);

  const summary = stage.querySelector<HTMLElement>('[data-summary]')!;
  const subB = stage.querySelector<HTMLElement>('[data-sub-b]')!;
  const buttons = Array.from(stage.querySelectorAll<HTMLButtonElement>('[data-rule]'));
  const charts = {
    a: stage.querySelector<HTMLElement>('[data-chart="a"]')!,
    b: stage.querySelector<HTMLElement>('[data-chart="b"]')!,
  };
  const app = stage.querySelector<HTMLElement>('.cc-app')!;
  const tooltip = document.createElement('div');
  tooltip.className = 'cc-tooltip';
  tooltip.hidden = true;
  app.append(tooltip);

  const controller = new AbortController();
  const { signal } = controller;
  let rule: Rule = 'compute';
  let active: number | null = null;
  let activeChart: 'a' | 'b' | null = null;

  function render() {
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.rule === rule)));
    summary.textContent = rules[rule].summary;
    subB.textContent = rule === 'capability' ? 'Same units · % is approval’s share of the total' : 'Same units';
    charts.a.innerHTML = chartA(charts.a.clientWidth, rule, active);
    charts.b.innerHTML = chartB(charts.b.clientWidth, rule, active);
    charts.a.setAttribute(
      'aria-label',
      rule === 'compute'
        ? 'Frontier compute rises from 100 to 1,139 over six years. Compute for Capability X falls from 100 to 5 and drops below the 50-unit trigger after year 1, so it is not reviewed from year 2 on.'
        : 'Frontier compute rises from 100 to 1,139 over six years. Compute for Capability X falls from 100 to 5, and every year is reviewed because the rule follows the capability.',
    );
    charts.b.setAttribute(
      'aria-label',
      rule === 'compute'
        ? 'Entrant cost is compute plus 60 approval in years 0 and 1, then compute alone, falling to 5, with no review from year 2.'
        : 'Entrant cost is compute plus a fixed 60 approval every year, falling from 160 to 65. Approval rises from 38% to 92% of the total.',
    );
    renderTooltip();
  }

  function renderTooltip() {
    if (active === null || !activeChart) {
      tooltip.hidden = true;
      return;
    }
    const chart = charts[activeChart];
    tooltip.innerHTML = activeChart === 'a' ? tooltipA(rule, active) : tooltipB(rule, active);
    tooltip.hidden = false;
    const appBox = app.getBoundingClientRect();
    const box = chart.getBoundingClientRect();
    const plotLeft = 40;
    const plotRight = activeChart === 'a' && chart.clientWidth >= 420 ? 112 : 16;
    const plotWidth = chart.clientWidth - plotLeft - plotRight;
    const px =
      activeChart === 'a'
        ? plotLeft + (active / 6) * plotWidth
        : plotLeft + (plotWidth / YEARS.length) * (active + 0.5);
    const left = box.left - appBox.left + px;
    const tipWidth = tooltip.offsetWidth;
    const clamped = Math.max(8, Math.min(appBox.width - tipWidth - 8, left - tipWidth / 2));
    tooltip.style.left = `${clamped}px`;
    tooltip.style.top = `${box.top - appBox.top - tooltip.offsetHeight + 8}px`;
  }

  function setActive(chart: 'a' | 'b' | null, index: number | null) {
    if (chart === activeChart && index === active) return;
    activeChart = chart;
    active = index;
    render();
  }

  function indexFromPointer(key: 'a' | 'b', event: PointerEvent) {
    const chart = charts[key];
    const box = chart.getBoundingClientRect();
    const plotLeft = 40;
    const plotRight = key === 'a' && chart.clientWidth >= 420 ? 112 : 16;
    const plotWidth = box.width - plotLeft - plotRight;
    const offset = event.clientX - box.left - plotLeft;
    const index = key === 'a' ? Math.round((offset / plotWidth) * 6) : Math.floor(offset / (plotWidth / YEARS.length));
    return Math.max(0, Math.min(6, index));
  }

  (['a', 'b'] as const).forEach((key) => {
    const chart = charts[key];
    chart.addEventListener('pointermove', (event) => setActive(key, indexFromPointer(key, event)), { signal });
    chart.addEventListener('pointerleave', () => setActive(null, null), { signal });
    chart.addEventListener('focus', () => setActive(key, active ?? 0), { signal });
    chart.addEventListener('blur', () => setActive(null, null), { signal });
    chart.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const step = event.key === 'ArrowRight' ? 1 : -1;
        setActive(key, Math.max(0, Math.min(6, (active ?? 0) + step)));
      },
      { signal },
    );
  });

  buttons.forEach((button) =>
    button.addEventListener(
      'click',
      () => {
        rule = button.dataset.rule as Rule;
        render();
      },
      { signal },
    ),
  );

  const resize = new ResizeObserver(() => render());
  resize.observe(charts.a);
  resize.observe(charts.b);

  render();

  return () => {
    controller.abort();
    resize.disconnect();
  };
}
