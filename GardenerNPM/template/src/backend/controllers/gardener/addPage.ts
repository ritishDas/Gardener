import type { Request, Response } from "express";
import fsp from "fs/promises";
import { access } from "fs/promises";
import path from 'path';

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..', '..', '..', 'frontend');
const templateDir = path.join(frontendDir, 'template');



async function findTemplate(fileName: string) {
  try {
    while (fileName.length !== 0) {

      console.log(fileName)
      const searchFile = `template.${fileName}.ejs`;
      console.log(searchFile)
      const searchPath = path.join(templateDir, searchFile);

      console.log(searchPath)
      try {
        await access(searchPath); // ✅ checks if file exists
        return searchPath;        // return full path immediately
      } catch {
        // file does not exist → continue
      }

      let lastUnderscore = fileName.lastIndexOf('_');
      if (lastUnderscore === -1) break;

      if (lastUnderscore === 0) lastUnderscore += 1;

      fileName = fileName.substring(0, lastUnderscore);
      console.log(fileName);
    }
  }
  catch (error) {
    throw new Error("Template not found");
  }
  // ❗ explicit failure instead of silent bug
}

export async function addPage(req: Request, res: Response) {
  try {
    const pagename: string = req.body.page;
    const name = pagename.replaceAll('/', '_');



    const templatePath = await findTemplate(name);//path.join(frontendDir, findTemplate(name)); //path.join(frontendDir, 'frontendtemplate.ejs');

    if (!templatePath) throw new Error('no template found');



    const viewPath = path.join(frontendDir, `views`, `${name}.ejs`);
    const routePath = path.resolve(__dirname, '..', '..', 'routes', 'gardener.route.ts');
    const jsDir = path.join(frontendDir, 'static/pages');
    const jsFilePath = path.join(jsDir, `pages.${name}.js`);

    const templateContent = await fsp.readFile(templatePath, 'utf8');
    await fsp.writeFile(viewPath, templateContent, "utf8");

    await replaceLastOccurrence(viewPath, '<script', `<script src="/static/pages/pages.${name}.js" type='module'></script>`);

    const routeEntry = `router.route("${pagename}").get((req: Request, res: Response) => res.render("${name}",{fileName:"${name}"}));\n`;
    await fsp.appendFile(routePath, routeEntry, "utf8");

    await fsp.mkdir(jsDir, { recursive: true });
    const jsContent = 'import { gardener, fetchElement, replaceElement, appendElement } from "/static/gardener.js";\n import {log, parser, addEl, State} from "/static/gardenerDev.js"';
    await fsp.writeFile(jsFilePath, jsContent, "utf8");

    res.json({ success: true });
  } catch (err) {
    const error = err as Error;
    res.json({ success: false, msg: error.message });
  }
}

async function replaceLastOccurrence(filePath: string, searchPattern: string, replacementLine: string) {
  const content = await fsp.readFile(filePath, 'utf8');
  const lines = content.split('\n');
  let found = false;

  for (let i = lines.length - 1; i >= 0; i--) {

    if (lines[i]!.includes(searchPattern)) {
      lines[i] = `${replacementLine}\n${lines[i]}`;
      found = true;
      break;
    }
  }

  if (found) {
    await fsp.writeFile(filePath, lines.join('\n'), 'utf8');
  } else {
    console.warn(`Pattern "${searchPattern}" not found in ${filePath}`);
  }
}
