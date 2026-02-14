import { gardener, replaceElement, fetchElement } from '/gardener.js'
import eyeoff from '/components/eyeoff.js'
import eyeon from '/components/eyeon.js'
export default function thisfun(visible) {

  const svg = visible ? eyeoff() : eyeon();

  return gardener({
    "t": "div",
    "cn": [
      "w-full",
      "passwordbox"
    ],
    "children": [
      {
        "t": "label",
        "cn": [
          "my-1",
          "block"
        ],
        "txt": "Password"
      },
      {
        "t": "span",
        "cn": [
          "border",
          "border-gray-900",
          "flex",
          "space-x-1",
          "items-center",
          "h-8",
          "p-1",
          "rounded-md"
        ],
        "children": [
          {
            "t": "svg",
            "cn": [
              "icon",
              "icon-tabler",
              "icons-tabler-outline",
              "icon-tabler-key"
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
                  "d": "M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0"
                }
              },
              {
                "t": "path",
                "attr": {
                  "d": "M15 9h.01"
                }
              }
            ]
          },
          {
            "t": "input",
            "cn": [
              "outline-none",
              "inputbox",
              "w-full"
            ],
            "attr": {
              "type": visible ? 'text' : 'password',
              "name": "password",
              value: fetchElement('.inputbox').value,
              "required": "",
            }
          },
          {
            t: 'span',
            events: {
              click: () => replaceElement(fetchElement(".passwordbox"), thisfun(!visible)),
            },
            children: [
              svg
            ]
          }
        ]
      },
    ]
  })
}
