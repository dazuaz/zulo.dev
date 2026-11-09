import './figure.css';

// Builds the lane view from the fallback table in the post, so the copy lives in one place.
const laneKeys = ['password', 'builtin', 'grant'] as const;

function text(node: Element | null | undefined) {
  return node?.textContent?.trim() ?? '';
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, content?: string) {
  const node = document.createElement(tag);
  node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

export function enhance(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('[data-figure-stage]');
  const table = stage?.querySelector('table');
  if (!stage || !table) return;

  const lanes = Array.from(table.querySelectorAll('thead th')).slice(1).map(text);
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  if (lanes.length !== laneKeys.length || rows.length === 0) return;

  const app = el('div', 'td-app');

  const header = el('div', 'td-lanes');
  header.setAttribute('aria-hidden', 'true');
  header.append(el('span', ''));
  lanes.forEach((lane, index) => {
    const label = el('span', `td-lane td-lane--${laneKeys[index]}`);
    label.append(el('i', ''), document.createTextNode(lane));
    header.append(label);
  });

  const list = el('ol', 'td-rows');
  rows.forEach((row, rowIndex) => {
    const item = el('li', 'td-row');
    const label = el('div', 'td-row__label');
    label.append(
      el('span', 'td-row__number', String(rowIndex + 1).padStart(2, '0')),
      el('h4', '', text(row.querySelector('th'))),
    );
    label.firstElementChild?.setAttribute('aria-hidden', 'true');
    item.append(label);

    Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
      const card = el('div', `td-card td-card--${laneKeys[index]}`);
      card.append(el('span', 'td-card__lane', lanes[index]), el('p', '', text(cell)));
      item.append(card);
    });
    list.append(item);
  });

  const details = el('details', 'td-table');
  details.append(el('summary', '', 'Show as a table'), table);

  app.append(header, list, details);
  root.classList.add('td-figure');
  stage.replaceChildren(app);
}
