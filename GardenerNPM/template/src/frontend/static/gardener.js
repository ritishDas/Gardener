
export function fetchElement(param) {
  return document.querySelector(param);
}

export function appendElement(parent, child) {
  if (typeof parent === 'string') {
    parent = fetchElement(parent);
  }
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
  if (typeof original === 'string') {
    original = fetchElement(original);
  }
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


