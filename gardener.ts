interface DomNode {
  t: string;
  cn?: string[];
  txt?: string;
  attr?: Record<string, string | boolean>;
  events?: Record<string, (event: Event) => void>;
  children?: DomNode[];
  nodeType?: number; // For direct DOM node passthrough
}

interface Config {
  mode: 'dev' | 'prod';
  componentdir: string;
  hotreload: boolean;
}

const config: Config = {
  mode: 'dev',
  componentdir: 'components/',
  hotreload: true,
};

let hotReloadTimeout: ReturnType<typeof setTimeout> | null = null;
const body = document.body;
let hotReload: boolean = config.hotreload;

const storedHotReload = localStorage.getItem('hotreload');
if (storedHotReload === null) {
  hotReload = config.hotreload;
} else {
  hotReload = storedHotReload === 'true';
}

if (config.mode === 'dev') {
  appendElement(
    body,
    gardener({
      t: 'p',
      cn: ['bg-gray-200', 'fixed', 'bottom-0', 'z-100', 'right-0', 'border-b-1', 'p-2', 'rounded-md'],
      children: [
        { t: 'span', txt: 'Press ' },
        { t: 'span', cn: ['text-green-500', 'font-bold'], txt: 'Ctrl+h' },
        { t: 'span', txt: ' to toggle Hot Reload' },
        {
          t: 'form',
          attr: { id: 'hrcheckbox' },
          events: { click: () => toggleHotReload() },
          cn: ['p-2', 'bg-red-300'],
          children: [
            { t: 'label', txt: 'Hot Reload ' },
            {
              t: 'input',
              cn: ['hrcheckbox'],
              attr: { type: 'checkbox' },
            },
          ],
        },
      ],
    })
  );
}

if (config.mode === 'dev') {
  toggleHotReload(); // Initial sync with checkbox

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();
      toggleHotReload();
    }
  });
}

function toggleHotReload(): void {
  const previousState = hotReload;
  const hrForm = fetchElement('#hrcheckbox') as HTMLElement | null;
  const checkbox = fetchElement('.hrcheckbox') as HTMLInputElement | null;

  hotReload = !hotReload;

  if (hotReload) {
    if (hrForm) hrForm.style.background = '#66e666';
    if (checkbox) checkbox.checked = true;
    localStorage.setItem('hotreload', 'true');

    hotReloadTimeout = setTimeout(() => window.location.reload(), 1000);
  } else {
    if (hrForm) hrForm.style.background = 'red';
    if (checkbox) checkbox.checked = false;
    localStorage.setItem('hotreload', 'false');

    if (hotReloadTimeout) clearTimeout(hotReloadTimeout);
  }
}

export function parserWindow(text: string): void {
  if (config.mode !== 'dev') return;

  // Optional: Press 'Y' to copy (only once per window)
  const keyListener = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === 'y') {
      copyTxt();
      body.removeEventListener('keydown', keyListener);
    }
  };
  body.addEventListener('keydown', keyListener);

  const result = gardener({
    t: 'div',
    cn: [
      'fixed',
      'border-2',
      'border-black',
      'bg-gray-500',
      'text-white',
      'rounded-lg',
      'z-90',
      'w-2/4',
      'h-2/4',
      'left-1/4',
      'flex',
      'flex-col',
      'justify-between',
      'top-1/4',
    ],
    children: [
      {
        t: 'div',
        cn: ['bg-gray-200', 'h-15', 'text-black', 'rounded-t-lg', 'flex', 'items-center', 'justify-around'],
        children: [
          { t: 'h3', cn: ['font-bold'], txt: 'Parser Window' },
          {
            t: 'button',
            cn: ['p-2', 'bg-red-300', 'rounded-lg', 'cursor-pointer'],
            txt: 'Add Component',
            attr: { id: 'copybtn' },
            events: { click: copyTxt },
          },
        ],
      },
      { t: 'p', cn: ['p-5', 'overflow-scroll'], txt: text },
      {
        t: 'div',
        cn: ['bg-white', 'text-black', 'rounded-b-lg', 'p-1'],
        children: [
          { t: 'span', txt: 'Press ' },
          { t: 'span', cn: ['text-green-500', 'font-bold'], txt: 'Y' },
          { t: 'span', txt: ' to add this component' },
        ],
      },
    ],
  });

  function copyTxt(): void {
    result.remove();

    const compForm = gardener({
      t: 'form',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const input = fetchElement('.componentInp') as HTMLInputElement | null;
          const filename = input?.value.trim();
          if (filename) {
            copyText(text, `${filename}.js`);
          }
          compForm.remove();
        },
      },
      cn: ['fixed', 'left-2/5', 'bg-gray-500', 'rounded-lg', 'block', 'top-2/5', 'p-2'],
      children: [
        {
          t: 'input',
          cn: ['bg-white', 'componentInp'],
          attr: {
            type: 'text',
            placeholder: 'Component Name',
          },
        },
      ],
    });

    appendElement(body, compForm);
    (fetchElement('.componentInp') as HTMLInputElement | null)?.focus();
  }

  appendElement(body, result);
}

async function copyText(txt: string, path: string): Promise<void> {
  try {
    const res = await fetch('/addcomponent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        component: txt,
        path: `${config.componentdir}${path}`,
      }),
    });

    if (!res.ok) {
      console.error('Failed to add component:', res.status);
      return;
    }

    const data = await res.json();
    console.log('Component added:', data);
  } catch (err) {
    console.error('Error adding component:', err);
  }
}

export function fetchElement<T extends Element = Element>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

export function appendElement(parent: HTMLElement, child: HTMLElement): void {
  parent.appendChild(child);
}

export function createElement(type: string, classNames?: string[]): HTMLElement {
  const element = document.createElement(type);
  if (classNames) element.classList.add(...classNames);
  return element;
}

export function insertText(element: HTMLElement, text: string): void {
  element.innerText = text;
}

export function replaceElement(original: HTMLElement, replacement: HTMLElement): void {
  original.replaceWith(replacement);
}

export function gardener(dom: DomNode | HTMLElement): HTMLElement {
  if ('nodeType' in dom && dom.nodeType === 1) {
    return dom as HTMLElement;
  }

  const domNode = dom as DomNode;
  const isSVG = [
    'svg',
    'path',
    'circle',
    'rect',
    'line',
    'polygon',
    'polyline',
    'g',
    'defs',
    'clipPath',
    'use',
  ].includes(domNode.t);

  let element: HTMLElement | SVGElement;

  if (isSVG) {
    element = document.createElementNS('http://www.w3.org/2000/svg', domNode.t) as SVGElement;
    if (domNode.cn) element.classList.add(...domNode.cn);
  } else {
    element = createElement(domNode.t, domNode.cn);
  }

  if (domNode.txt) {
    insertText(element as HTMLElement, domNode.txt);
  }

  if (domNode.attr) {
    for (const [key, value] of Object.entries(domNode.attr)) {
      if (typeof value === 'boolean') {
        if (value) {
          element.setAttribute(key, '');
        }
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (domNode.events) {
    Object.entries(domNode.events).forEach(([eventName, handler]) => {
      element.addEventListener(eventName, handler);
    });
  }

  if (domNode.children) {
    domNode.children.forEach((child) => appendElement(element as HTMLElement, gardener(child)));
  }

  return element as HTMLElement;
}

export function parser(element: HTMLElement | string, isParent: boolean = false): DomNode {
  let el: HTMLElement;

  if (typeof element === 'string') {
    const temp = document.createElement('div');
    temp.innerHTML = element.trim();
    el = temp.firstElementChild as HTMLElement;
    if (!el) throw new Error('Invalid HTML string');
  } else {
    el = element;
  }

  const obj: DomNode = {
    t: el.tagName.toLowerCase(),
  };

  if (el.classList.length > 0) {
    obj.cn = Array.from(el.classList);
  }

  const attrs: Record<string, string> = {};
  for (const attr of el.attributes) {
    if (attr.name !== 'class') {
      attrs[attr.name] = attr.value;
    }
  }
  if (Object.keys(attrs).length > 0) {
    obj.attr = attrs;
  }

  if (
    el.childNodes.length === 1 &&
    el.firstChild?.nodeType === Node.TEXT_NODE
  ) {
    obj.txt = el.textContent?.trim() || '';

    if (isParent) {
      parserWindow(JSON.stringify(obj, null, 2));
    }

    return obj;
  }

  const children: DomNode[] = [];
  for (const child of el.children) {
    children.push(parser(child as HTMLElement, false));
  }

  if (children.length > 0) {
    obj.children = children;
  }

  if (isParent) {
    parserWindow(JSON.stringify(obj, null, 2));
  }

  return obj;
}

export function imagePreloader(images: string[]): void {
  images.forEach((src) => {
    appendElement(
      body,
      gardener({
        t: 'img',
        cn: ['preloaderimage'],
        attr: {
          src,
          alt: src,
        },
      })
    );
  });

  // Hide immediately after appending (forces preload)
  setTimeout(() => {
    document.querySelectorAll('.preloaderimage').forEach((img) => {
      (img as HTMLElement).style.display = 'none';
    });
  }, 0);
}

what do you think of this migration to ts
