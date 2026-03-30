import { jest } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';

jest.mock('fs/promises');

describe('buildHelper', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fs.cp = jest.fn().mockResolvedValue(undefined);
    fs.writeFile = jest.fn().mockResolvedValue(undefined);
    fs.rm = jest.fn().mockResolvedValue(undefined);
  });

  test('copies frontend directory', async () => {
    const { default: buildHelper } = await import('./buildHelper.js');
    await buildHelper();

    expect(fs.cp).toHaveBeenCalledWith(
      path.resolve('src', 'frontend'),
      path.resolve('build', 'frontend'),
      { recursive: true }
    );
  });

  test('writes gardenerConfig.js', async () => {
    const { default: buildHelper } = await import('./buildHelper.js');
    await buildHelper();

    expect(fs.writeFile).toHaveBeenCalledWith(
      path.join(path.resolve('build', 'frontend'), 'static', 'gardenerConfig.js'),
      "export const mode = 'prod'; ",
      'utf8'
    );
  });

  test('removes template directory', async () => {
    const { default: buildHelper } = await import('./buildHelper.js');
    await buildHelper();

    expect(fs.rm).toHaveBeenCalledWith(
      path.join(path.resolve('build', 'frontend'), 'template'),
      { recursive: true }
    );
  });

  test('runs operations in correct order', async () => {
    const operations = [];

    fs.cp.mockImplementation(async () => operations.push('cp'));
    fs.writeFile.mockImplementation(async () => operations.push('writeFile'));
    fs.rm.mockImplementation(async () => operations.push('rm'));

    const { default: buildHelper } = await import('./buildHelper.js');
    await buildHelper();

    expect(operations).toEqual(['cp', 'writeFile', 'rm']);
  });

  test('fails early if copy fails', async () => {
    fs.cp.mockRejectedValue(new Error('Copy failed'));

    const { default: buildHelper } = await import('./buildHelper.js');

    await expect(buildHelper()).rejects.toThrow('Copy failed');
    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  test('fails if write fails and skips rm', async () => {
    fs.writeFile.mockRejectedValue(new Error('Write failed'));

    const { default: buildHelper } = await import('./buildHelper.js');

    await expect(buildHelper()).rejects.toThrow('Write failed');
    expect(fs.rm).not.toHaveBeenCalled();
  });
});
