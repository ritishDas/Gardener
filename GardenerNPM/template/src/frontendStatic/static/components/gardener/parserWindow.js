import { gardener, fetchElement, appendElement } from '../../gardener.js'
import { gardenerError } from './errorBox.js';

const body = fetchElement('body');

const config = {
  componentdir: 'static/components',
}

let result;
export function parserWindow(text) {
  result = gardener({
    t: 'div',
    cn: ['fixed', 'border-2', 'border-black', 'bg-gray-500', 'text-white', 'rounded-lg', 'z-90', 'w-2/4', 'h-2/4', 'left-1/4', 'flex', 'flex-col', 'justify-between', 'top-1/4'],
    children: [
      {
        t: 'div',
        cn: ['bg-gray-200', 'h-15', 'text-black', 'rounded-t-lg', 'flex', 'items-center', 'justify-around'],
        children: [
          {
            t: 'h3',
            cn: ['font-bold', 'p-5'],
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
                  click: () => addComponentForm(text)
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


  return result;
}

function addComponentForm(text) {
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

async function addComponent(txt, path) {
  try {
    const res = await fetch('/addcomponent', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ component: generateFile(txt, path), path: `${config.componentdir}/${path}.js` })
    })

    if (!res.ok) {
      throw new Error(`Failed to add component: ${res.status} ${res.statusText}`);
    }

    const data = await res.json()

  }
  catch (err) {
    console.error('Add Component Error:', err);
    gardenerError(err.message || 'Failed to add component');
  }

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
