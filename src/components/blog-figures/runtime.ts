import './figure-base.css';

type FigureModule = {
  enhance: (root: HTMLElement) => void | (() => void);
};

const figureModules = import.meta.glob<FigureModule>('./*/enhance.ts');
const cleanups = new Map<HTMLElement, () => void>();

async function loadFigure(root: HTMLElement) {
  if (cleanups.has(root)) return;

  const figureId = root.dataset.blogFigure;
  if (!figureId) return;

  const load = figureModules[`./${figureId}/enhance.ts`];
  if (!load) {
    console.warn(`No enhancer found for blog figure: ${figureId}`);
    return;
  }

  const module = await load();
  if (!root.isConnected || cleanups.has(root)) return;

  const cleanup = module.enhance(root);
  cleanups.set(root, cleanup ?? (() => {}));
}

const figures = Array.from(document.querySelectorAll<HTMLElement>('[data-blog-figure]'));
const pending = new Set(figures);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const root = entry.target as HTMLElement;
      pending.delete(root);
      observer.unobserve(root);
      void loadFigure(root);
    });
  },
  { rootMargin: '400px 0px', threshold: 0 },
);

figures.forEach((figure) => observer.observe(figure));

window.addEventListener(
  'pagehide',
  () => {
    observer.disconnect();
    pending.clear();
    cleanups.forEach((cleanup) => cleanup());
    cleanups.clear();
  },
  { once: true },
);
