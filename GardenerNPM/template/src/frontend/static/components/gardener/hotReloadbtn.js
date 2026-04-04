import { gardener, fetchElement, appendElement } from '../../gardener.js'
import { gardenerError } from './errorBox.js';

const config = {
  hotreload: false
}

gardenerError('Something Went Wrong')

let hotReload;
let hotReloadtimeout;
const localStore = localStorage.getItem('hotreload');

if (localStore === null) hotReload = config.hotreload;
else if (localStore === 'true') hotReload = true
else if (localStore === 'false') hotReload = false


export function togglehotreload() {
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

export function hotReloadBtn() {
  return gardener({
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
  })
}
