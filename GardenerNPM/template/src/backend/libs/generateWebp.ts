import path from "path";
import fsp from "fs/promises";
import sharp from "sharp";

export default async function generateWebP(
  inputPath: string,
  outputPath: string,
  width: number,
  height: number
): Promise<void> {
  const cacheDir = path.dirname(outputPath);
  await fsp.mkdir(cacheDir, { recursive: true });


  await sharp(inputPath)
    .resize(width, height, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 100 })
    .toFile(outputPath);

  console.log("✅ Image successfully generated");
}

