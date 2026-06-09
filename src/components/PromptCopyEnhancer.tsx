import { useEffect, useMemo, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type Props = {
  slug: string;
};

const TARGET_SLUG = 'ai-illustration-styles-for-ai-prompts';

const BASE_SCENE_PROMPT =
  'Draw a red bicycle courier crossing a stone bridge over a calm river at sunrise, small city skyline in the background, trees on both sides, soft morning mist, centered composition, full scene, no text or logos.';

const STYLE_TREATMENTS: Record<string, string> = {
  'flat-vector': 'flat vector editorial illustration, clean geometric shapes, crisp edges, minimal shading, limited palette of teal coral cream, subtle grain texture.',
  isometric: 'isometric technical illustration, axonometric perspective, precise geometry, long soft shadows, muted cyan and warm orange palette.',
  'ink-line-art': 'black and white ink line art, varied line weight, cross-hatching for shadows, hand-drawn texture on off-white paper.',
  watercolor: 'watercolor illustration on cold-press paper, transparent washes, soft edges, pigment blooms, light granulation.',
  'storybook-gouache': 'storybook gouache painting, matte opaque brush strokes, rich warm palette, layered painted texture.',
  'paper-cut': 'paper-cut collage illustration, layered cut-paper shapes, tactile paper fibers, soft depth shadows between layers.',
  risograph: 'risograph print aesthetic, two-color spot inks (fluorescent pink and teal), halftone dots, slight misregistration, vintage poster feel.',
  'clay-3d': '3D claymation miniature style, rounded handcrafted forms, soft studio lighting, tactile clay texture, shallow depth of field.',
  'synthetic-cubism': 'bright colored Synthetic Cubism illustration, angular fractured planes, overlapping geometric forms, bold contrasting color blocks, subtle painted texture.',
  linocut: 'linocut print illustration, carved line textures, high contrast two-tone ink, rough hand-carved edges, handmade press texture.',
  'art-nouveau': 'Art Nouveau poster illustration, flowing organic lines, ornamental botanical motifs, flat decorative color fields, vintage print texture, elegant composition, no typography.',
};

const MAIN_IMAGE_PROMPT = `Create a striking blog hero illustration of a solitary artist searching for inspiration inside an infinite canvas world.
Show the artist in the foreground with sketchbook and brush, standing on layered paper forms while an endless canvas
pathway extends into the distance with floating cut-paper sketches, abstract symbols, and soft sunrise light.
Convey curiosity, momentum, and creative discovery. Wide cinematic composition (16:9), clear focal point,
strong depth, no text, no logos.
Style treatment: paper-cut collage illustration, layered cut-paper shapes, tactile paper fibers,
soft depth shadows between layers.`;

function buildPromptMap() {
  const map: Record<string, string> = {
    '/blog/ai-illustration-styles/main-image-gemini-paper-cut.webp': MAIN_IMAGE_PROMPT,
  };

  for (const [slug, styleTreatment] of Object.entries(STYLE_TREATMENTS)) {
    const fullPrompt = `${BASE_SCENE_PROMPT} Style treatment: ${styleTreatment} Keep the same subject and composition as described.`;
    map[`/blog/ai-illustration-styles/${slug}.webp`] = fullPrompt;
    map[`/blog/ai-illustration-styles/${slug}-gemini.webp`] = fullPrompt;
  }

  return map;
}

function PromptCopyButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    } catch {
      setCopied(false);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="prompt-copy-btn focus-ring"
            onClick={handleCopy}
            aria-label="Copy image prompt"
          >
            {copied ? 'Copied' : 'Copy prompt'}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="start">
          <div className="prompt-copy-tooltip">{prompt}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function PromptCopyEnhancer({ slug }: Props) {
  const promptMap = useMemo(buildPromptMap, []);

  useEffect(() => {
    if (slug !== TARGET_SLUG) return;

    const roots: Root[] = [];
    const mounts: HTMLElement[] = [];
    const containerClass = 'prompt-overlay-container';

    const images = Array.from(document.querySelectorAll('article img'));
    for (const image of images) {
      const path = new URL(image.src, window.location.origin).pathname;
      const prompt = promptMap[path];
      if (!prompt) continue;

      const host =
        image.closest('figure') ??
        image.parentElement ??
        image;

      if (!(host instanceof HTMLElement)) continue;
      if (host.querySelector('.prompt-copy-mount')) continue;

      host.classList.add(containerClass);

      const mount = document.createElement('div');
      mount.className = 'prompt-copy-mount';
      host.appendChild(mount);

      const root = createRoot(mount);
      root.render(<PromptCopyButton prompt={prompt} />);

      roots.push(root);
      mounts.push(mount);
    }

    return () => {
      for (const root of roots) root.unmount();
      for (const mount of mounts) mount.remove();
    };
  }, [promptMap, slug]);

  return null;
}
