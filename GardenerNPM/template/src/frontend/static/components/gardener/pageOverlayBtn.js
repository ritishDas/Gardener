import { gardener, fetchElement, appendElement } from '../../gardener.js'

const body = fetchElement('body');

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


export const addPagebtn = gardener({
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
