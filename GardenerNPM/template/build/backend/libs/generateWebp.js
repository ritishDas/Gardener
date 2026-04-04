import path from "path";
import fsp from "fs/promises";
import sharp from "sharp";
export default async function generateWebP(inputPath, outputPath, width, height) {
    const cacheDir = path.dirname(outputPath);
    await fsp.mkdir(cacheDir, { recursive: true });
    console.log(`Processing image: ${inputPath}`);
    console.log(`Output path: ${outputPath}`);
    await sharp(inputPath)
        .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
    })
        .webp({ quality: 100 })
        .toFile(outputPath);
    console.log("✅ Image successfully generated");
}
//# sourceMappingURL=generateWebp.js.map