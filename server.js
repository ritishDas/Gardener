import express from "express";
import sharp from 'sharp';
import path from 'path';
import fs from "fs";
import fsp from "fs/promises";

const app = express();
const availableCache = {};

app.use(express.static('./'));
app.use(express.json());

app.post('/', (req, res) => {
  try {
    const { path, component } = req.body;


    const filecontent = `export default function(){
return (${component})
}`

    fs.writeFileSync(`${path}`, filecontent, 'utf8');

    res.json({ success: true });
  }
  catch (err) {
    res.json({ success: false, msg: err.message });
  }

})



app.get('/img/:name/:width/:height', async (req, res) => {
  try {
    const { name } = req.params;
    const width = Number(req.params.width);
    const height = Number(req.params.height);

    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      return res.status(400).json({ error: 'Invalid width or height' });
    }

    const inputPath = path.join(process.cwd(), 'assets', name);
    const cacheKey = `${name}_${width}x${height}`;
    const cacheDir = path.join(process.cwd(), '.cache');
    const outputPath = path.join(cacheDir, `${path.parse(name).name}_${width}x${height}.webp`);

    // If cached on disk → serve it
    try {
      await fsp.access(outputPath);
      return res.sendFile(
        path.basename(outputPath),
        { root: path.dirname(outputPath) }
      );
    } catch {
      // Not cached → generate
    }

    // Ensure input exists
    await fsp.access(inputPath);

    await generateWebP(inputPath, outputPath, width, height);

    availableCache[cacheKey] = true;
    return res.sendFile(
      path.basename(outputPath),
      { root: path.dirname(outputPath) }
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image processing failed' });
  }
});

async function generateWebP(inputPath, outputPath, width, height) {
  const cacheDir = path.dirname(outputPath);
  await fsp.mkdir(cacheDir, { recursive: true });

  console.log(`Processing image: ${inputPath}`);
  console.log(`Output path: ${outputPath}`);

  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover'
    })
    .webp({ quality: 80 })
    .toFile(outputPath);

  console.log('✅ Image successfully generated');
}

app.listen(3000, () => { console.log('server listening 🚀🚀🚀') });
