function fetchElement(param) {
  return document.querySelector(param);
}

function appendElement(parent,child) {
  parent.appendChild(child);
}

function createElement(type,classname) {
  let element = document.createElement(type);
  if(classname)
  element.classList.add(...classname);
  return element;
}

function insertText(element,text) {
  element.innerText = text;
}

function replaceElement(original, New) {
  original.replaceWith(New);
}

function gardener(Dom) {
  // detect if this is an SVG element
  const isSVG = [
    'svg', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'g', 'defs', 'clipPath', 'use'
  ].includes(Dom.t);

  // create element accordingly
  const element = isSVG
    ? document.createElementNS('http://www.w3.org/2000/svg', Dom.t)
    : createElement(Dom.t, Dom.cn);

  // text content (skip for SVG like <path>)
  if (Dom.txt) {
    insertText(element, Dom.txt);
  }

  // apply attributes safely
  if (Dom.attr) {
    for (const [key, value] of Object.entries(Dom.attr)) {
      if (isSVG) {
        element.setAttribute(key, value);
      } else {
        // for HTML
        if (key in element) {
          element[key] = value;
        } else {
          element.setAttribute(key, value);
        }
      }
    }
  }

  // add event listeners
  if (Dom.onclick) element.addEventListener('click', Dom.onclick);
  if (Dom.onsubmit) element.addEventListener('submit', Dom.onsubmit);

  // recursively handle children
  if (Dom.children) {
    Dom.children.forEach(child => appendElement(element, gardener(child)));
  }

  return element;
}

function parser(element) {
  if (typeof element === 'string') {
    // If user passes raw HTML string
    const temp = document.createElement('div');
    temp.innerHTML = element.trim();
    element = temp.firstElementChild;
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
    return obj;
  }

  // add children recursively
  const children = [];
  for (const child of element.children) {
    children.push(parser(child));
  }
  if (children.length) obj.children = children;

  console.log(obj);
  return obj
 //Let Browser do the migration from html to json and then use copy paste
}

  function imagePreloader(images) {
      const body = fetchElement('body')
    images.forEach(entry => {
          appendElement(body, gardener({
            t:'img',
            cn:['preloaderimage'],
            attr:{
            src:entry,
            alt:entry
            }
          }));

          setTimeout(()=>{
          const images = document.querySelectorAll('.preloaderimage');
          images.forEach(entry => {entry.style.display = 'none'});
          }, 0)

    })
  }

