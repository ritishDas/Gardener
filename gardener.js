const config = {
  mode: 'dev',
  componentdir: './components/'
}

let hotReloadtimeout;

let hotReload = true;
const body = fetchElement('body');
if (config.mode === 'dev') {
  appendElement(body, gardener({
    t: 'form',
    attr: {
      id: 'hrcheckbox',
    },
    events: {
      click: () => togglehotreload()
    },
    cn: ['rounded-full', 'p-5', 'bg-red-300', 'fixed', 'right-10', 'bottom-10', 'z-100'],
    children: [{
      t: 'label',
      txt: 'Hot Reload ',
    }
      , {
      t: 'input',
      attr: {
        type: 'checkbox'
      }
    }]
  }))
}

togglehotreload();
document.addEventListener('keydown', function(e) {
  // Detect Ctrl + H
  if (e.ctrlKey && e.key.toLowerCase() === 'h') {
    e.preventDefault();   // Stop browser from opening history
    // Your logic here...
    togglehotreload();
  }
});

function togglehotreload() {
  const hr = hotReload;
  const hrcheck = fetchElement('#hrcheckbox');
  console.log(hrcheck.children[1].value)

  if (hr) {
    hrcheck.style.background = 'green';
    hrcheck.children[1].checked = true;
    hotReloadtimeout = setTimeout(() => window.location.reload(), 1000);
  }
  else {
    hrcheck.style.background = 'red';
    hrcheck.children[1].checked = false;
    clearTimeout(hotReloadtimeout);
  }

  hotReload = !hotReload;
}

export function parserWindow(text) {
  body.addEventListener('keypress', function(event) {
    if (event.key.toLowerCase() === 'y')
      copytxt();
  });


  const result = gardener({
    t: 'div',
    cn: ['fixed', 'border-2', 'border-black', 'bg-gray-500', 'text-white', 'rounded-lg', 'z-90', 'w-2/4', 'h-3/4', 'left-1/4', 'flex', 'flex-col', 'justify-between'],
    children: [
      {
        t: 'div',
        cn: ['bg-gray-200', 'h-10', 'text-black', 'rounded-t-lg', 'flex', 'items-center', 'justify-around'],
        children: [
          {
            t: 'h3',
            cn: ['font-bold'],
            txt: 'Parser Window'
          },
          {
            t: 'button',
            cn: ['w-20', 'bg-red-300', 'rounded-lg', 'cursor-pointer'],
            txt: 'Copy',
            attr: {
              id: 'copybtn'
            },
            events: {
              click: copytxt
            }
          }
        ]
      },
      {
        t: 'p',
        cn: ['p-5'],
        txt: text
      },
      {
        t: 'div',
        cn: ['bg-white', 'text-black', 'rounded-b-lg', 'p-1'],
        children: [
          {
            t: 'span',
            txt: 'Press '
          },
          {
            t: 'span',
            cn: ['text-green-500', 'font-bold'],
            txt: 'Y'
          },
          {
            t: 'span',
            txt: ' to copy'
          }
        ]
      }
    ]
  })

  function copytxt() {
    console.log('clicked')
    //copyText(text);
    const btn = fetchElement('#copybtn');
    insertText(btn, 'Copied');
    btn.style.background = '#66e666';
    result.remove()

    const compform = gardener({
      t: 'form',
      events: {
        submit: (event) => {
          event.preventDefault()
          copyText(text, `${fetchElement('.componentInp').value}.js`)
          compform.remove();
        }
      },
      cn: ['fixed', 'w-1/5', 'left-2/5', 'bg-gray-500', 'rounded-lg', 'p-10', 'block'],
      children: [
        {
          t: 'input',
          cn: ['bg-white', 'componentInp'],
          attr: {
            type: 'text',
            placeholder: 'Component Name'
          }
        }
      ]
    });
    appendElement(body, compform);

    fetchElement('.componentInp').focus();
    //setTimeout(() => result.remove(), 500);
  }

  appendElement(body, result);
}



async function copyText(txt, path) {
  // await navigator.clipboard.writeText(txt);
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ component: txt, path: `${config.componentdir}/${path}` })
    })

    if (!res.ok) console.error('wrong');

    const data = await res.json()
    console.log(data);

  }
  catch (err) {
    console.error(err);
  }

}




export function fetchElement(param) {
  return document.querySelector(param);
}

export function appendElement(parent, child) {
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
  original.replaceWith(New);
}

export function gardener(Dom) {
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
    'value', 'checked', 'selected', 'muted', 'disabled',
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

export function parser(element, isParent) {
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

    if (isParent) {
      console.log('parent')
      parserWindow(JSON.stringify(obj))
    }

    return obj;
  }

  // add children recursively
  const children = [];
  for (const child of element.children) {
    children.push(parser(child, false));
  }
  if (children.length) obj.children = children;



  return obj
  //Let Browser do the migration from html to json and then use copy paste
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


