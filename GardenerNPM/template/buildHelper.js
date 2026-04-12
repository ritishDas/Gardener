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

  await fs.writeFile(
    path.join(dest, 'static', 'gardenerConfig.js'),
    "export const mode = 'prod';",
    'utf8'
  );

  await fs.rm(path.join(dest, 'template'), { recursive: true });

  // 👇 bundle all files inside bundle folder

  const bundleDir = path.join(dest, 'static', 'bundle');


  await fs.mkdir(bundleDir, { recursive: true });
  const files = await fs.readdir(path.join(dest, 'bundle'));

  for (const file of files) {

    // const stat = await fs.stat(fullPath);
    // sf (!stat.isFile()) continue;
    const destBundleFile = path.join(bundleDir, file); // overwrite same file
    // await fs.writeFile(destBundleFile, '', 'utf8');

    await build({
      entryPoints: [path.join(dest, 'bundle', file)],
      bundle: true,
      minify: true,
      format: 'esm',
      outfile: destBundleFile
    });
  }


  await fs.rm(path.join(dest, 'bundle'), { recursive: true });

}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildHelper();
}
