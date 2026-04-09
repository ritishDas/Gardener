
import { gardener, fetchElement, replaceElement } from '../gardener.js'
import addNotification from './notification.js';

export function copybtn() {
  return gardener({
    "t": "button",
    events: {
      click: () => {
        try {
          navigator.clipboard.writeText(fetchElement('.initCommand').innerText)
          replaceElement('.copybtn', copybtn());
          addNotification({ status: 'success', message: 'Copied' })
        }
        catch (err) {
          addNotification({
            status: 'failure', message: "Couldn't Copy"
          });
        }

      }
    },
    "cn": [
      "copybtn",
      "flex",
      "items-center",
      "justify-center",
      "p-2",
      "text-gray-400",
      "hover:text-white",
      "hover:bg-white/10",
      "rounded",
      "transition-all",
      "duration-200",
      "active:scale-95"
    ],
    "children": [
      {
        "t": "span",
        "cn": [
          "w-5",
          "h-5"
        ],
        "children": [
          {
            "t": "svg",
            "cn": [
              "icon",
              "icon-tabler",
              "icons-tabler-outline",
              "icon-tabler-clipboard-check"
            ],
            "attr": {
              "xmlns": "http://www.w3.org/2000/svg",
              "width": "24",
              "height": "24",
              "viewBox": "0 0 24 24",
              "fill": "none",
              "stroke": "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            },
            "children": [
              {
                "t": "path",
                "attr": {
                  "stroke": "none",
                  "d": "M0 0h24v24H0z",
                  "fill": "none"
                }
              },
              {
                "t": "path",
                "attr": {
                  "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
                }
              },
              {
                "t": "path",
                "attr": {
                  "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2"
                }
              },
              {
                "t": "path",
                "attr": {
                  "d": "M9 14l2 2l4 -4"
                }
              }
            ]
          }
        ]
      }
    ]
  })
}


