import { mode } from '/static/gardenerConfig.js'
import { gardener, appendElement, fetchElement } from '/static/gardener.js'
import { addPagebtn } from './components/gardener/pageOverlayBtn.js';
import { parserWindow as parserWindowComponent } from './components/gardener/parserWindow.js';
import { hotReloadBtn, togglehotreload } from './components/gardener/hotReloadbtn.js';
import { gardenerError } from './components/gardener/errorBox.js';

const body = fetchElement('body');












if (mode === 'dev') {
  appendElement(body, addPagebtn);


  appendElement(body, hotReloadBtn())

  togglehotreload();
}




document.addEventListener('keydown', function(e) {
  // Detect Ctrl + H
  if (e.altKey && e.key.toLowerCase() === 'h') {
    e.preventDefault();   // Stop browser from opening history
    // Your logic here...
    togglehotreload();
  }
});






export function parserWindow(text) {
  if (mode !== 'dev') return;


  const result = parserWindowComponent(text);


  appendElement(body, result);
}




export function parser(element, isParent = true) {
  try {

    if (mode !== 'dev') return;

    if (typeof element === 'string') {
      element = fetchElement(element);
    }

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

        parserWindow(JSON.stringify(obj, null, 2))
      }

      return obj;
    }


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


      parserWindow(JSON.stringify(obj, null, 2))
    }

    return obj


    //Let Browser do the migration from html to json and then use copy paste
  }
  catch (err) {
    gardenerError(`parserError: ${err}`);
  }

}

export function addEl(parent, event, fun) {
  try {
    if (typeof parent === 'string') {
      parent = fetchElement(parent);
    }
    parent.addEventListener(event, fun)

  }
  catch (err) {
    gardenerError(`addElError: ${err}`);
  }
}


export class State {
  constructor(value) {
    this.value = value;
    this.cb = [];
  }
  registerCb(cb) {
    cb(this.value);
    this.cb.push(cb);
  }
  unregisterCb(cb) {
    this.cb = this.cb.filter(c => c !== cb);
  }
  setTo(val) {
    this.value = val;
    this.cb.forEach(cb => { cb(val) });
  }
}


export function log(target) {
  console.log(target)
}

