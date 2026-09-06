/** Generate the Nano Banana 2 half of the illustration comparison.
 * node scripts/generate-illustration-comparison-gemini.mjs --dry-run
 * node scripts/generate-illustration-comparison-gemini.mjs [--style flat-vector]
 * Reads GEMINI_API_KEY from the environment or the repo's ignored .env file.
 * Keeps the first successful output; never overwrites or retries automatically.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifestPath = path.join(root, 'docs/illustration-styles-revisited/prompts.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const config = manifest.models.gemini;
const args = process.argv.slice(2);
let dryRun = false;
let selectedStyle;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dry-run') dryRun = true;
  else if (args[i] === '--style' && args[i + 1]) selectedStyle = args[++i];
  else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
}
const styles = manifest.styles.filter(style => !selectedStyle || style.slug === selectedStyle);
if (!styles.length) throw new Error('Unknown style; use a slug from prompts.json.');
const outputDir = path.join(root, 'output/imagegen/illustration-styles-revisited');
const recordsDir = path.join(root, 'docs/illustration-styles-revisited/runs');
if (!dryRun) {
  if (fs.existsSync(path.join(root, '.env'))) process.loadEnvFile(path.join(root, '.env'));
  if (!process.env.GEMINI_API_KEY) throw new Error('Set GEMINI_API_KEY in the ignored .env file.');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(recordsDir, { recursive: true });
}
for (const style of styles) {
  const outputPath = path.join(outputDir, `${style.slug}-nano-banana-2.png`);
  const request = {
    contents: [{ role: 'user', parts: [{ text: style.prompt }] }],
    generationConfig: config.generationConfig,
  };
  if (dryRun) {
    console.log(JSON.stringify({ style: style.slug, model: config.model, outputPath, request }));
    continue;
  }
  if (fs.existsSync(outputPath)) {
    console.log(`Keeping existing output: ${style.slug}`);
    continue;
  }
  const startedAt = new Date().toISOString();
  const record = { style: style.slug, requestedModel: config.model, startedAt, request };
  const recordPath = path.join(recordsDir, `${style.slug}-nano-banana-2-${Date.now()}.json`);
  const saveRecord = () => fs.writeFileSync(recordPath, JSON.stringify(record, null, 2) + '\n', { flag: 'wx' });
  console.log(`Generating ${style.slug} with ${config.model}`);
  let response;
  try {
    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(240000),
    });
  } catch {
    record.status = 'transport_error';
    saveRecord();
    throw new Error(`Request failed for ${style.slug}; no automatic retry. See run record.`);
  }
  record.completedAt = new Date().toISOString();
  record.httpStatus = response.status;
  if (!response.ok) {
    record.status = 'http_error';
    saveRecord();
    throw new Error(`Gemini returned HTTP ${response.status}; stopped without retrying.`);
  }
  const data = await response.json();
  record.returnedModel = data.modelVersion ?? null;
  record.responseId = data.responseId ?? null;
  record.usage = data.usageMetadata ?? null;
  record.finishReasons = (data.candidates ?? []).map(candidate => candidate.finishReason);
  const images = (data.candidates ?? []).flatMap(candidate => candidate.content?.parts ?? [])
    .filter(part => !part.thought && part.inlineData?.data);
  const image = images[0]?.inlineData;
  if (images.length !== 1 || image.mimeType !== 'image/png') {
    record.status = 'unexpected_image_response';
    record.imageCount = images.length;
    record.mimeType = image?.mimeType ?? null;
    saveRecord();
    throw new Error(`Expected exactly one PNG for ${style.slug}; inspect the run record.`);
  }
  const buffer = Buffer.from(image.data, 'base64');
  if (!buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    record.status = 'invalid_png';
    saveRecord();
    throw new Error('Image response is not a PNG.');
  }
  record.status = 'success';
  record.output = path.relative(root, outputPath);
  record.sha256 = createHash('sha256').update(buffer).digest('hex');
  fs.writeFileSync(outputPath, buffer, { flag: 'wx' });
  saveRecord();
  console.log(`Saved ${record.output}`);
}
