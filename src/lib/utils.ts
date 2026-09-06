import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// Register the custom font sizes from global.css so tailwind-merge does not
// mistake `text-display` / `text-section` / `text-md` for text colours and
// drop them when a colour class like `text-ink` is also present.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['md', 'section', 'display'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
