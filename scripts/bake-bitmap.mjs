import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const BITMAP_PRESETS = {
  racing: ["#2C2625", "#DB293C", "#F6F1E8"],
  flag: ["#2C2625", "#A1110B", "#DB293C", "#EEBF4F", "#F6F1E8"],
  stark: ["#DB293C", "#F6F1E8"],
};

const MAX_WIDTH = 2560;
const HISTOGRAM_BINS = 256;

function parseHexColour(hex) {
  const normalised = hex.replace("#", "");
  return {
    r: parseInt(normalised.slice(0, 2), 16),
    g: parseInt(normalised.slice(2, 4), 16),
    b: parseInt(normalised.slice(4, 6), 16),
  };
}

function toLuminance(red, green, blue) {
  return Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue);
}

function buildLuminanceHistogram(pixelBytes, channelCount) {
  const histogram = new Array(HISTOGRAM_BINS).fill(0);
  for (let byteIndex = 0; byteIndex < pixelBytes.length; byteIndex += channelCount) {
    histogram[toLuminance(pixelBytes[byteIndex], pixelBytes[byteIndex + 1], pixelBytes[byteIndex + 2])] += 1;
  }
  return histogram;
}

// Even distribution (not even range): cut points fall where the cumulative pixel
// count crosses each k/bandCount share, so every colour gets a similar number of
// pixels regardless of how bright or dark the source image happens to be.
function computeEvenDistributionCutoffs(histogram, bandCount) {
  const totalPixels = histogram.reduce((runningTotal, binCount) => runningTotal + binCount, 0);
  const cutoffs = [];
  let cumulative = 0;
  let nextBand = 1;
  for (let bin = 0; bin < HISTOGRAM_BINS && nextBand < bandCount; bin += 1) {
    cumulative += histogram[bin];
    if (cumulative >= (nextBand / bandCount) * totalPixels) {
      cutoffs.push(bin);
      nextBand += 1;
    }
  }
  return cutoffs;
}

function bandIndexForLuminance(luminance, cutoffs) {
  let band = 0;
  for (const cutoff of cutoffs) {
    if (luminance >= cutoff) band += 1;
  }
  return band;
}

function mapPixelsToBands(pixelBytes, channelCount, cutoffs, bandColours) {
  const pixelCount = pixelBytes.length / channelCount;
  const flatColourBytes = Buffer.alloc(pixelCount * 3);
  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
    const sourceOffset = pixelIndex * channelCount;
    const luminance = toLuminance(pixelBytes[sourceOffset], pixelBytes[sourceOffset + 1], pixelBytes[sourceOffset + 2]);
    const colour = bandColours[bandIndexForLuminance(luminance, cutoffs)];
    const targetOffset = pixelIndex * 3;
    flatColourBytes[targetOffset] = colour.r;
    flatColourBytes[targetOffset + 1] = colour.g;
    flatColourBytes[targetOffset + 2] = colour.b;
  }
  return flatColourBytes;
}

async function bakeBitmap(sourcePath, outputPath, presetName) {
  const presetHexColours = BITMAP_PRESETS[presetName];
  if (!presetHexColours) {
    throw new Error(`Unknown preset "${presetName}". Available: ${Object.keys(BITMAP_PRESETS).join(", ")}`);
  }
  const bandColours = presetHexColours.map(parseHexColour);
  const { data: pixelBytes, info: rawImageInfo } = await sharp(sourcePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const histogram = buildLuminanceHistogram(pixelBytes, rawImageInfo.channels);
  const cutoffs = computeEvenDistributionCutoffs(histogram, bandColours.length);
  const flatColourBytes = mapPixelsToBands(pixelBytes, rawImageInfo.channels, cutoffs, bandColours);
  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(flatColourBytes, { raw: { width: rawImageInfo.width, height: rawImageInfo.height, channels: 3 } })
    .webp({ lossless: true })
    .toFile(outputPath);
  console.log(`Baked ${outputPath} with preset "${presetName}" (${bandColours.length} colours)`);
}

const [sourcePath, outputPath, presetName] = process.argv.slice(2);
if (!sourcePath || !outputPath || !presetName) {
  console.error("Usage: node scripts/bake-bitmap.mjs <source> <output> <preset>");
  process.exitCode = 1;
} else {
  bakeBitmap(sourcePath, outputPath, presetName).catch((bakeError) => {
    console.error("Bitmap bake failed:", bakeError instanceof Error ? bakeError.message : bakeError);
    process.exitCode = 1;
  });
}
