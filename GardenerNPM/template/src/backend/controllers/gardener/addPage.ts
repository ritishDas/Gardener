import type { Request, Response } from "express";
import fsp from "fs/promises";
import path from 'path';

export async function addPage(req: Request, res: Response) {
  try {
    const pagename: string = req.body.page;
    const name = pagename.replaceAll('/', '_');

    // Define Relative Paths
    const templatePath = path.join(process.cwd(), 'src/frontend/frontendtemplate.ejs');
    const viewPath = path.join(process.cwd(), `src/frontend/views/${name}.ejs`);
    const routePath = path.join(process.cwd(), 'src/backend/routes/gardener.route.ts');
    const jsDir = path.join(process.cwd(), 'src/frontend/static/pages');
    const jsFilePath = path.join(jsDir, `${name}.js`);

    // 1. Copy template to new view
    const templateContent = await fsp.readFile(templatePath, 'utf8');
    await fsp.writeFile(viewPath, templateContent, "utf8");

    // 2. Inject script tag into the new EJS file
    await replaceLastOccurrence(viewPath, '<script', `<script src="/static/pages/${name}.js"></script>`);

    // 3. Append route to backend (ensure the 'router' variable exists in that file)
    const routeEntry = `\nrouter.route("${pagename}").get((req: Request, res: Response) => res.render("${name}"));\n`;
    await fsp.appendFile(routePath, routeEntry, "utf8");

    // 4. Create static JS file
    await fsp.mkdir(jsDir, { recursive: true });
    const jsContent = 'import { gardener, log, parser, fetchElement, replaceElement, appendElement, State, addEL } from "/static/gardener.js";';
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

    if (lines[i].includes(searchPattern)) {
      // Logic: Prepend the new script tag before the existing script tag or replace the line
      // Based on your original code, we are replacing the line containing the pattern
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
