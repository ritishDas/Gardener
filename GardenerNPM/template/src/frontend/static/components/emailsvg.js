
import { gardener, fetchElement, replaceElement } from '/static/gardener.js'

export default function thisfun() {
  return gardener({
    "t": "span",
    "cn": [
      "emailsvg"
    ],
    "children": [
      {
        "t": "svg",
        "cn": [
          "icon",
          "icon-tabler",
          "icons-tabler-outline",
          "icon-tabler-mail"
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
              "d": "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10"
            }
          },
          {
            "t": "path",
            "attr": {
              "d": "M3 7l9 6l9 -6"
            }
          }
        ]
      }
    ]
  })
}
