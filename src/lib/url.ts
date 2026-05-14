// Helper: erzeugt URLs, die das in astro.config gesetzte `base` respektieren.
// Astro prepended `base` NICHT automatisch in href/src, deshalb hier zentralisiert.

const base = import.meta.env.BASE_URL; // endet immer mit "/"

export function withBase(path: string): string {
  if (!path) return base;
  if (/^(https?:)?\/\//.test(path)) return path; // externe URL durchreichen
  const cleaned = path.replace(/^\/+/, "");
  return base + cleaned;
}
