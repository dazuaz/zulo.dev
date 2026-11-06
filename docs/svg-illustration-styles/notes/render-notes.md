# Rendering status — provisional PNGs

Every round was first submitted to the required, unmodified `lab/render.sh`: nocturne-r1, nocturne-r2, cyanotype-r1, cyanotype-r2 and cyanotype-r3.

All five attempts aborted in installed Google Chrome 156.0.8078.81 before any PNG was created. The shell reported `Abort trap: 6`. macOS diagnostics showed `SIGABRT` during `_RegisterApplication` / `TransformProcessType`. A separate installed Chromium headless shell also failed at initialization with `bootstrap_check_in ... Permission denied (1100)`. No permission escalation was available. No renderer script or system settings were changed.

The supplied script echoes a PNG filename even when Chrome fails. Its printed filename was not accepted as render evidence.

## Fallback and inspection

Used local CPU rasterizer **@resvg/resvg-js 2.6.2** to obtain reviewable images. This is a renderer, not an image/model service. No external image or model API was called. Every SVG was hand-authored. The delivered PNGs are named for their rounds but are **resvg renders, not Chrome screenshots**.

`render-fallback.cjs` resolves declared CSS palette variables in memory, then renders at 1120 × 672 without changing the SVGs. Browser fidelity, particularly filters and blends, remains unverified. All five fallback PNGs were opened and visually inspected before critique. Final selections are provisional on that basis.

The local renderer dependencies and cache remain in hidden subdirectories inside this output folder. To reproduce from the lab directory:

```sh
node codex-masks/render-fallback.cjs codex-masks/nocturne-r2.svg codex-masks/cyanotype-r3.svg
```

If dependencies are unavailable, install the pinned renderer inside the output folder:

```sh
npm install --prefix "$PWD/codex-masks/.renderer" --cache "$PWD/codex-masks/.npm-cache" --no-audit --no-fund --ignore-scripts @resvg/resvg-js@2.6.2
```

For browser acceptance where headless Chrome launches, run `./render.sh` on each SVG and inspect its resulting PNG. This overwrites the provisional PNG with Chrome output.

## Validation

All five SVGs passed `xmllint --noout`. All five PNGs were confirmed 1120 × 672. SVG sizes range from 7,219 to 9,001 bytes. They use the required namespace and viewBox and omit root width/height, text elements, raster images, external references, scripts and animation. Prompt snapshots preserve each round's instructions. Only files inside `codex-masks/` were deliberately created or changed.
