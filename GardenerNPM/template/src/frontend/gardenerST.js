//Standalone gardener version for no backend environment

const config = {
  mode: 'dev',
  hotreload: false
}

let hotReloadtimeout;
const body = fetchElement('body');


function applyHotReloadState() {
  const hrcheck = fetchElement('#hrcheckbox');
  const checkbox = fetchElement('.hrcheckbox');

  if (hotReload) {
    hrcheck.style.background = '#66e666';
    checkbox.checked = true;
    hotReloadtimeout = setTimeout(() => window.location.reload(), 1000);
  } else {
    hrcheck.style.background = 'red';
    checkbox.checked = false;
    clearTimeout(hotReloadtimeout);
  }
}

let hotReload = localStorage.getItem('hotreload');
if (hotReload === null) hotReload = config.hotreload;
else if (hotReload === 'true') hotReload = true
else if (hotReload === 'false') hotReload = false




if (config.mode === 'dev') {
  appendElement(body, gardener({
    t: 'p',
    attr: {
      style: `
position:fixed;
bottom:0;
right:0;
z-index:100;
background:#e5e7eb;
padding:8px;
border-radius:6px;
font-family:sans-serif;
color:black;
font-size:14px;
`
    },
    children: [
      { t: 'span', txt: 'Press ' },
      {
        t: 'span',
        attr: { style: 'color:#22c55e;font-weight:bold;' },
        txt: 'Alt+h'
      },
      { t: 'span', txt: ' to toggle Hot Reload' },
      {
        t: 'form',
        attr: {
          id: 'hrcheckbox',
          style: 'margin-top:6px;padding:6px;background:red;border-radius:4px;cursor:pointer;'
        },
        events: { click: togglehotreload },
        children: [
          { t: 'label', txt: 'Hot Reload ' },
          {
            t: 'input',
            cn: ['hrcheckbox'],
            attr: { type: 'checkbox' }
          }
        ]
      }
    ]
  }));

  applyHotReloadState();

  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key.toLowerCase() === 'h') {
      e.preventDefault();   // Stop browser from opening history
      // Your logic here...
      togglehotreload();
    }
  });
}

//appendElement(body, gardener())




// togglehotreload();




//if (config.mode === 'dev') {


function togglehotreload() {
  hotReload = !hotReload;
  localStorage.setItem('hotreload', String(hotReload));

  const hrcheck = fetchElement('#hrcheckbox');
  const checkbox = fetchElement('.hrcheckbox');

  if (hotReload) {
    hrcheck.style.background = '#66e666';
    checkbox.checked = true;
    hotReloadtimeout = setTimeout(() => window.location.reload(), 1000);
  } else {
    hrcheck.style.background = 'red';
    checkbox.checked = false;
    clearTimeout(hotReloadtimeout);
  }
}

function parserWindow(input) {
  if (config.mode !== 'dev') return;

  let text;
  try {
    text = JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    text = input;
  }

  const result = gardener({
    t: 'div',
    attr: {
      style: `
position:fixed;
top:25%;
left:25%;
width:50%;
height:50%;
background:#6b7280;
color:white;
border:2px solid black;
border-radius:8px;
z-index:90;
display:flex;
flex-direction:column;
justify-content:space-between;
`
    },
    children: [
      {
        t: 'div',
        attr: {
          style: `
background:#e5e7eb;
color:black;
padding:10px;
display:flex;
justify-content:space-between;
align-items:center;
border-top-left-radius:8px;
border-top-right-radius:8px;
`
        },
        children: [
          { t: 'h3', txt: 'Parser Window' },
          {
            t: 'button',
            txt: 'Copy JSON',
            attr: {
              style: `
padding:6px 10px;
background:#f87171;
border-radius:6px;
cursor:pointer;
`
            },
            events: {
              click: () => copyTextToClipboard(text)
            }
          }
        ]
      },
      {
        t: 'pre',
        txt: text,
        attr: {
          style: `
padding:12px;
overflow:auto;
font-size:12px;
white-space:pre-wrap;
`
        }
      }
    ]
  });

  appendElement(body, result);
}



async function copyTextToClipboard(txt) {
  try {
    await navigator.clipboard.writeText(txt);
    alert('Component copied to clipboard');
  } catch (err) {
    console.error('Clipboard copy failed', err);
  }
}




export function fetchElement(param) {
  return document.querySelector(param);
}

export function appendElement(parent, child) {
  if (typeof parent === 'string') parent = fetchElement(parent);
  parent.appendChild(child);
}

export function createElement(type, classname) {
  let element = document.createElement(type);
  if (classname)
    element.classList.add(...classname);
  return element;
}

export function insertText(element, text) {
  element.innerText = text;
}

export function replaceElement(original, New) {
  if (typeof original === 'string') original = fetchElement(original);
  original.replaceWith(New);
}

export function gardener(Dom) {

  if (Dom.nodeType === 1) return Dom;
  // detect if this is an SVG element
  const isSVG = [
    'svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'g', 'defs', 'clipPath', 'use'
  ].includes(Dom.t);

  // create element accordingly
  let element;

  if (isSVG) {
    element = document.createElementNS('http://www.w3.org/2000/svg', Dom.t);
    if (Dom.cn)
      element.classList.add(...Dom.cn);
  }
  else {
    element = createElement(Dom.t, Dom.cn);
  }

  // text content (skip for SVG like <path>)
  if (Dom.txt) {
    insertText(element, Dom.txt);
  }

  // apply attributes safely
  const propertyNames = new Set([
    'value', 'selected', 'muted', 'disabled',
    'selectedIndex', 'volume', // etc.
  ]);

  if (Dom.attr) {
    for (const [key, value] of Object.entries(Dom.attr)) {
      if (isSVG || key.startsWith('data-') || key.startsWith('aria-')) {
        element.setAttribute(key, value);
      } else if (key in element && !propertyNames.has(key)) {
        // Prefer property for known safe cases
        try { element[key] = value === '' ? true : value; } catch (e) { element.setAttribute(key, value); }
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (Dom.events) {
    Object.entries(Dom.events).forEach(([eventName, handler]) => {
      element.addEventListener(eventName, handler);
    });
  }

  // recursively handle children
  if (Dom.children) {
    Dom.children.forEach(child => appendElement(element, gardener(child)));
  }

  return element;
}

function cleanStringAndList(input) {
  const pattern = /\?"?(\w+)"?\?/g;
  const vars = new Set();
  let match;

  while ((match = pattern.exec(input)) !== null) {
    vars.add(match[1]);
  }

  // Replace ?var? with "+var+" and clean up resulting empty strings or double quotes
  const cleanedString = input
    .replace(pattern, '"+$1+"')
    .replace(/^""\+/, '')
    .replace(/\+""$/, '');

  return {
    cleanedString,
    extractedList: [...vars].join(', ')
  };
}

function generateFile(obj) {


  const formatted = JSON.stringify(obj, null, 2);
  const { cleanedString, extractedList } = cleanStringAndList(formatted);

  return `
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export default function thisfun({${extractedList}}) {
  return gardener(${cleanedString})
}
`;
}




export function parser(element, isParent = true) {
  if (typeof element === 'string') {
    element = fetchElement(element);
  }

  console.log(element)
  const obj = {
    t: element.tagName.toLowerCase(),
  };

  // add classes if present
  if (element.classList.length) {
    obj.cn = Array.from(element.classList);
  }

  // add attributes if present
  const attrs = {};
  for (const attr of element.attributes) {
    if (attr.name !== 'class') attrs[attr.name] = attr.value;
  }
  if (Object.keys(attrs).length) obj.attr = attrs;
  // add text content (only if no children)
  if (element.childNodes.length === 1 && element.firstChild.nodeType === Node.TEXT_NODE) {
    obj.txt = element.textContent.trim();

    if (isParent) {

      parserWindow(generateFile(obj))
    }

    return obj;
  }


  // add children recursively
  const children = [];
  for (const child of element.childNodes) {
    if (child.nodeType === Node.COMMENT_NODE) continue;

    if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() === '') continue;

    if (child.nodeType === Node.TEXT_NODE) {
      children.push({ t: 'span', txt: child.textContent.trim() });
      continue;
    }
    children.push(parser(child, false));
  }
  if (children.length) obj.children = children;


  if (isParent) {


    parserWindow(generateFile(obj))
  }

  return obj


  //Let Browser do the migration from html to json and then use copy paste
}


export function addEL(parent, event, fun) {
  if (typeof parent === 'string') {
    parent = fetchElement(parent);
  }
  parent.addEventListener(event, fun)
}

export function imagePreloader(images) {
  const body = fetchElement('body')
  images.forEach(entry => {
    appendElement(body, gardener({
      t: 'img',
      cn: ['preloaderimage'],
      attr: {
        src: entry,
        alt: entry
      }
    }));

    setTimeout(() => {
      const images = document.querySelectorAll('.preloaderimage');
      images.forEach(entry => { entry.style.display = 'none' });
    }, 0)

  })
}




