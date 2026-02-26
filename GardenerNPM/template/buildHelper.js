import fs from 'fs/promises';
import path from 'path';

async function buildHelper() {
  const src = path.resolve('src', 'frontend');
  const dest = path.resolve('build', 'src', 'frontend');

  await fs.cp(src, dest, { recursive: true });
  await fs.cp('./package.json', '');
}

buildHelper();// const path = require('path');
