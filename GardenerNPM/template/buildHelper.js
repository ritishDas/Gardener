import fs from 'fs/promises';
import path from 'path';

async function buildHelper() {
  const src = path.resolve('src', 'frontend');
  const dest = path.resolve('build', 'frontend');

  await fs.cp(src, dest, { recursive: true });
}

buildHelper();// const path = require('path');
