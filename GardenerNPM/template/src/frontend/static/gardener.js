import { gardenerError } from "./components/gardener/errorBox.js";


export function fetchElement(param) {
  const element = document.querySelector(param);
  if (!element) {
    console.warn(`Element not found: ${param}`);
  }
  return element;
}

export function appendElement(parent, child) {
  try {
    if (typeof parent === 'string') {
      parent = fetchElement(parent);
    }
    if (!parent) {
      throw new Error('Parent element is null or undefined');
    }
    if (!child) {
      throw new Error('Child element is null or undefined');
    }
    parent.appendChild(child);
  } catch (error) {
    gardenerError(error);
  }
}

export function createElement(type, classname) {
  try {
    if (!type) {
      throw new Error('Element type is required');
    }
    let element = document.createElement(type);
    if (classname)
      element.classList.add(...classname);
    return element;
  } catch (error) {
    gardenerError(error);
    return null;
  }
}

export function insertText(element, text) {
  if (!element) {
    console.warn('insertText: Element is null or undefined');
    return;
  }
  element.textContent = text;
}

export function replaceElement(original, New) {
  try {
    if (typeof original === 'string') {
      original = fetchElement(original);
    }
    if (!original) {
      throw new Error('Original element is null or undefined');
    }
    if (!New) {
      throw new Error('New element is null or undefined');
    }
    original.replaceWith(New);
  } catch (error) {
    gardenerError(error);
  }
}

export function gardener(Dom) {
  try {
    if (!Dom) {
      throw new Error('DOM configuration is null or undefined');
    }

    if (Dom.nodeType === 1) return Dom;

    if (!Dom.t) {
      throw new Error('Element type (t) is required in DOM configuration');
    }

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

    if (!element) {
      throw new Error(`Failed to create element: ${Dom.t}`);
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
        try {
          if (isSVG || key.startsWith('data-') || key.startsWith('aria-')) {
            element.setAttribute(key, value);
          } else if (key in element && !propertyNames.has(key)) {
            // Prefer property for known safe cases
            try { element[key] = value === '' ? true : value; } catch (e) { element.setAttribute(key, value); }
          } else {
            element.setAttribute(key, value);
          }
        } catch (attrError) {
          console.warn(`Failed to set attribute ${key}:`, attrError);
        }
      }
    }

    if (Dom.events) {
      Object.entries(Dom.events).forEach(([eventName, handler]) => {
        try {
          if (typeof handler !== 'function') {
            throw new Error(`Event handler for '${eventName}' must be a function`);
          }
          element.addEventListener(eventName, handler);
        } catch (eventError) {
          console.warn(`Failed to add event listener ${eventName}:`, eventError);
        }
      });
    }

    // recursively handle children
    if (Dom.children) {
      Dom.children.forEach(child => {
        try {
          appendElement(element, gardener(child));
        } catch (childError) {
          console.warn('Failed to append child:', childError);
        }
      });
    }

    return element;
  } catch (error) {
    gardenerError(error);
    return null;
  }
}

