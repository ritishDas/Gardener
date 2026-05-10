import fs from 'fs/promises';
import path from 'path';
import { build } from 'esbuild';

export default async function buildHelper() {
  const src = path.resolve('src', 'frontend');
  const dest = path.resolve('build', 'frontend');

  try {
    await fs.rm(dest, { recursive: true, force: true });
  } catch (err) {
    console.log(err);
  }

  await fs.cp(src, dest, { recursive: true });


  await fs.rm(path.join(dest, 'template'), { recursive: true });

  // 👇 bundle all files inside bundle folder

  const bundleDir = path.join(dest, 'static', 'bundle');


  await fs.mkdir(bundleDir, { recursive: true });
  const files = await fs.readdir(path.join(dest, 'bundle'));

  const allBundleFiles = files.map(file => path.join(dest, 'bundle', file));

  await build({
    entryPoints: allBundleFiles,
    bundle: true,
    splitting: true,
    chunkNames: 'chunks/[hash]',
    format: 'esm',
    outdir: bundleDir,
    minify: true,
  });


  await fs.rm(path.join(dest, 'bundle'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'components'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'pages'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'gardener.js'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'gardenerConfig.js'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'gardenerDev.js'), { recursive: true });
  await fs.rm(path.join(dest, 'static', 'global.js'), { recursive: true });


}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildHelper();
}
