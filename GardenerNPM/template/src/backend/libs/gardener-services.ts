import fsp from "fs/promises";
import { access } from "fs/promises";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..', '..', 'frontend');
const templateDir = path.join(frontendDir, 'template');
const backendDir = path.resolve(__dirname, '..');

async function findTemplate(fileName: string) {
    try {
        let currentName = fileName;
        while (currentName.length !== 0) {
            const searchFile = `template.${currentName}.ejs`;
            const searchPath = path.join(templateDir, searchFile);
            try {
                await access(searchPath);
                return searchPath;
            } catch {
                // file does not exist → continue
            }
            let lastUnderscore = currentName.lastIndexOf('_');
            if (lastUnderscore === -1) break;
            if (lastUnderscore === 0) lastUnderscore += 1;
            currentName = currentName.substring(0, lastUnderscore);
        }
        // Final fallback to the default template
        const defaultTemplate = path.join(templateDir, 'template._.ejs');
        try {
            await access(defaultTemplate);
            return defaultTemplate;
        } catch {
            throw new Error("Template not found");
        }
    } catch (error) {
        throw new Error("Template not found");
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

export async function createPage(pagename: string) {
    // Normalize pagename to ensure it starts with /
    if (!pagename.startsWith('/')) {
        pagename = '/' + pagename;
    }

    // Generate name for filenames
    // / -> _
    // /hello -> hello
    // /admin/dashboard -> admin_dashboard
    const name = pagename === '/' ? '_' : pagename.substring(1).replaceAll('/', '_');
    const templatePath = await findTemplate(name);
    if (!templatePath) throw new Error('no template found');

    const viewPath = path.join(frontendDir, `views`, `${name}.ejs`);
    const routePath = path.join(backendDir, 'routes', 'gardener.route.ts');
    const jsDir = path.join(frontendDir, 'static/pages');
    const jsFilePath = path.join(jsDir, `pages.${name}.js`);
    const bundleDir = path.join(frontendDir, 'bundle');

    const templateContent = await fsp.readFile(templatePath, 'utf8');
    await fsp.writeFile(viewPath, templateContent, "utf8");

    await replaceLastOccurrence(viewPath, '<script', `<script src="/static/pages/pages.${name}.js" type='module'></script>`);

    const routeEntry = `router.route("${pagename}").get((req: Request, res: Response) => res.render("${name}",{fileName:"${name}"}));\n`;
    await fsp.appendFile(routePath, routeEntry, "utf8");

    await fsp.mkdir(jsDir, { recursive: true });
    const jsContent = 'import { gardener, fetchElement, replaceElement, appendElement } from "../gardener.js";\n import {log, parser, addEl, State} from "../gardenerDev.js"';
    await fsp.writeFile(jsFilePath, jsContent, "utf8");

    await fsp.mkdir(bundleDir, { recursive: true });
    const bundleContent = `import '../static/global.js';import '../static/pages/pages.${name}.js'; `;
    await fsp.writeFile(path.join(bundleDir, `bundle.${name}.js`), bundleContent, "utf8");

    return { success: true };
}

export async function createComponent(filePath: string, component: string) {
    await fsp.mkdir(path.join(frontendDir, 'static', 'components'), { recursive: true });
    await fsp.writeFile(path.join(frontendDir, filePath), component, "utf8");
    return { success: true };
}
