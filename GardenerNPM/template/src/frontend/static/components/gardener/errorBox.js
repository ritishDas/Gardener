import { gardener, fetchElement, appendElement } from '../../gardener.js'

const body = fetchElement('body');

export function gardenerError(error) {
  appendElement(body, gardener({
    t: 'div',
    // Added: centering, shadow, border-left for "alert" feel, and high z-index
    cn: [
      'fixed', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2',
      'w-11/12', 'max-w-md', 'bg-white', 'text-gray-800', 'shadow-2xl',
      'border-l-8', 'border-red-600', 'rounded-r-lg', 'z-[100]', 'p-0', 'overflow-hidden'
    ],
    children: [
      {
        t: 'div',
        cn: ['bg-red-50', 'p-4', 'flex', 'items-center', 'gap-3'],
        children: [
          {
            t: 'h2',
            cn: ['text-red-700', 'font-bold', 'text-lg', 'uppercase', 'tracking-wider'],
            txt: '⚠️ System Error'
          }
        ]
      },
      {
        t: 'div',
        cn: ['p-6', 'bg-white'],
        children: [
          {
            t: 'p',
            cn: ['font-mono', 'text-sm', 'bg-gray-100', 'p-3', 'rounded', 'border', 'border-gray-200', 'break-words'],
            txt: error
          },
          {
            t: 'button',
            cn: ['mt-4', 'w-full', 'py-2', 'bg-gray-800', 'text-white', 'rounded', 'hover:bg-black', 'transition-colors', 'cursor-pointer'],
            txt: 'Dismiss',
            events: {
              click: (e) => e.target.closest('.fixed').remove()
            }
          }
        ]
      }
    ]
  }))
}
