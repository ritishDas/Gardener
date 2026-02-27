import fs from 'fs/promises';
import path from 'path';

async function buildHelper() {
  const src = path.resolve('src', 'frontend');
  const dest = path.resolve('build', 'frontend');

  await fs.cp(src, dest, { recursive: true });

  await fs.writeFile(path.join(dest, 'static', 'gardenerConfig.js'), "export const mode = 'prod';", 'utf8');

}

buildHelper();// const path = require('path');
