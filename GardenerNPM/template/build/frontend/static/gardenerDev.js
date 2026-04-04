import { mode } from '/static/gardenerConfig.js'
import { gardener, appendElement, fetchElement } from '/static/gardener.js'

const body = fetchElement('body');
let hotReloadtimeout;

const config = {
  componentdir: 'static/components',
  hotreload: false
}



let hotReload;
const localStore = localStorage.getItem('hotreload');

if (localStore === null) hotReload = config.hotreload;
else if (localStore === 'true') hotReload = true
else if (localStore === 'false') hotReload = false



// const addPagebtn = gardener({
//   t: 'button',
//   cn: ['pb-1.5', 'flex', 'items-center', 'justify-center', 'h-15', 'w-15', 'bg-green-300', 'fixed', 'bottom-22', 'right-2', 'rounded-full', 'text-5xl'],
//   children: [{ t: 'span', txt: '+' }],
//   events: {
//     click: opnPagedialog
//   }
// });

const pagebtns = gardener({
  t: 'div',
  cn: [
    'fixed',
    'bottom-20',
    'right-4',
    'flex',
    'flex-col',
    'gap-2',
    'bg-white',
    'shadow-lg',
    'rounded-xl',
    'p-3',
    'z-50'
  ],
  children: [
    {
      t: 'button',
      cn: [
        'px-4',
        'py-2',
        'bg-blue-500',
        'text-white',
        'rounded-lg',
        'hover:bg-blue-600',
        'transition'
      ],
      children: [{ t: 'span', txt: 'New Page' }],
      events: {
        click: opnPagedialog
      }
    },
    {
      t: 'button',
      cn: [
        'px-4',
        'py-2',
        'bg-gray-800',
        'text-white',
        'rounded-lg',
        'hover:bg-gray-900',
        'transition'
      ],
      children: [{ t: 'span', txt: 'Save Template' }],
      events: {
        click: async () => {
          const result = await fetch('/savetemplate', {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ path: fetchElement('#fileName').innerText })
          });

          const data = await result.json(); // ✅ fix
          alert(data.message);
        }
      }
    }
  ]
});
const addPagebtn = gardener({
  t: 'div',
  cn: ['fixed', 'bottom-4', 'right-4', 'z-50'],
  events: {
    mouseenter: () => appendElement(addPagebtn, pagebtns),
    mouseleave: () => pagebtns.remove()
  },
  children: [
    {
      t: 'span',
      // cn: ['pb-1.5', 'flex', 'items-center', 'justify-center', 'h-15', 'w-15', 'bg-black', 'text-white', 'fixed', 'bottom-22', 'right-2'],

      cn: [
        'flex',
        'items-center',
        'justify-center',
        'h-14',
        'w-14',
        'bg-black',
        'text-white',
        'fixed',
        'bottom-22',
        'right-2',
        'rounded-full',
        'shadow-lg',
        'cursor-pointer',
      ],
      txt: 'GR'
    }
  ]
});



if (mode === 'dev') {
  appendElement(body, addPagebtn);


  appendElement(body, gardener({
    t: 'p',
    cn: ['bg-gray-200', 'fixed', 'bottom-0', 'z-100', 'right-0', 'border-b-1', 'p-2', 'rounded-md'],
    children: [
      {
        t: 'span',
        txt: 'Press '
      },
      {
        t: 'span',
        cn: ['text-green-500', 'font-bold'],
        txt: 'Alt+h'
      },
      {
        t: 'span',
        txt: ' to toggle Hot Reload'
      },
      {
        t: 'form',
        attr: {
          id: 'hrcheckbox',
        },
        events: {
          click: () => togglehotreload()
        },
        cn: ['p-2', 'bg-red-300'],
        children: [{
          t: 'label',
          txt: 'Hot Reload ',
        }
          , {
          t: 'input',
          cn: ['hrcheckbox'],
          attr: {
            type: 'checkbox'
          }
        }]
      }
    ]
  }))

  togglehotreload();
}

//appendElement(body, gardener())



document.addEventListener('keydown', function(e) {
  // Detect Ctrl + H
  if (e.altKey && e.key.toLowerCase() === 'h') {
    e.preventDefault();   // Stop browser from opening history
    // Your logic here...
    togglehotreload();
  }
});



function togglehotreload() {
  const hr = hotReload;
  const hrcheck = fetchElement('#hrcheckbox');

  localStorage.setItem('hotreload', hr);

  hotReload = !hotReload;

  if (hr) {
    hrcheck.style.background = '#66e666';
    fetchElement('.hrcheckbox').checked = true;
    localStorage.setItem('hotreload', 'true');
    hotReloadtimeout = setTimeout(() => window.location.reload(), 1000);
  }
  else {
    hrcheck.style.background = 'red';
    fetchElement('.hrcheckbox').checked = false;
    localStorage.setItem('hotreload', 'false');
    clearTimeout(hotReloadtimeout);
  }

  //localStorage.setItem('hotreload', hotReload);
}



export function parserWindow(text) {
  if (mode !== 'dev') return;


  const result = gardener({
    t: 'div',
    cn: ['fixed', 'border-2', 'border-black', 'bg-gray-500', 'text-white', 'rounded-lg', 'z-90', 'w-2/4', 'h-2/4', 'left-1/4', 'flex', 'flex-col', 'justify-between', 'top-1/4'],
    children: [
      {
        t: 'div',
        cn: ['bg-gray-200', 'h-15', 'text-black', 'rounded-t-lg', 'flex', 'items-center', 'justify-around'],
        children: [
          {
            t: 'h3',
            cn: ['font-bold'],
            txt: 'Parser Window'
          },
          {
            t: 'div',
            cn: ['flex', 'gap-3'],
            children: [
              {
                t: 'button',
                cn: ['p-2', 'bg-green-300', 'rounded-lg', 'cursor-pointer'],
                txt: 'Copy Component',
                attr: { id: 'copybtn' },
                events: {
                  click: () => { navigator.clipboard.writeText(text); fetchElement('#copybtn').innerText = 'copied'; }
                }
              },
              {
                t: 'button',
                cn: ['p-2', 'bg-red-300', 'rounded-lg', 'cursor-pointer'],
                txt: 'Add Component',
                events: {
                  click: addComponentForm
                }
              }
            ]
          }
        ]
      },
      {
        t: 'p',
        cn: ['p-5', 'overflow-scroll'],
        txt: text
      },
    ]
  })

  function addComponentForm() {
    result.remove()

    const compform = gardener({
      t: 'form',
      events: {
        submit: (event) => {
          event.preventDefault()
          addComponent(text, `${fetchElement('.componentInp').value}`)
          compform.remove();
        }
      },
      cn: ['fixed', 'left-2/5', 'bg-gray-500', 'rounded-lg', 'block', 'top-2/5', 'p-2'],
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



async function addComponent(txt, path) {
  // await navigator.clipboard.writeText(txt);
  try {
    const res = await fetch('/addcomponent', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ component: generateFile(txt, path), path: `${config.componentdir}/${path}.js` })
    })

    if (!res.ok) console.error('wrong');

    const data = await res.json()

  }
  catch (err) {
    console.error(err);
  }

}

function opnPagedialog(btn = true) {
  if (btn) {
    const dialog = gardener({
      t: 'form', cn: ['addpageform', 'fixed', 'left-2/5', 'bg-gray-200', 'rounded-lg', 'block', 'top-2/5', 'p-2', 'flex', 'flex-col', 'p-5', 'gap-2'], events: {
        submit: async (e) => {
          try {
            e.preventDefault()
            const data = new FormData(e.target);
            const input = Object.fromEntries(data.entries());

            const response = await fetch('/addpage', {
              method: 'POST',
              headers: {
                "Content-Type": 'application/json'
              },
              body: JSON.stringify(input)
            }).then(res => res.json())
            opnPagedialog(false)
            window.location.href = `${input.page}`
          }
          catch (err) {
            console.log(err)
          }

        }
      }, children: [{
        t: 'label',
        txt: 'ENTER PATH FOR NEW PAGE'
      }, { t: 'input', attr: { name: 'page' }, cn: ['pathinput'] }]

    })

    appendElement(body, dialog);
    fetchElement('.pathinput').focus();
  }
  else {
    fetchElement('.addpageform').remove();
  }
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

function generateFile(obj, name) {


  const { cleanedString, extractedList } = cleanStringAndList(obj);

  if (extractedList.length === 0) return `
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export function ${name}() {
  return gardener(${cleanedString})
}
`;

  return `
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export function ${name}({${extractedList}}) {
  return gardener(${cleanedString})
}
`;
}


// console.log(result.extractedList);  // ["ritish"]


export function parser(element, isParent = true) {
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


    parserWindow(JSON.stringify(obj, null, 2))
  }

  return obj


  //Let Browser do the migration from html to json and then use copy paste
}

export function addEl(parent, event, fun) {
  if (typeof parent === 'string') {
    parent = fetchElement(parent);
  }
  parent.addEventListener(event, fun)
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

