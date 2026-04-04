
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export function footer({mystery}) {
  return gardener({
  "t": "footer",
  "cn": [
    "bg-green-900",
    "text-green-100",
    "py-12",
    "text-center"
  ],
  "children": [
    {
      "t": "p",
      "cn": [
        "text-xl",
        "italic"
      ],
      "txt": "\"Because sometimes you don't need a forest. Just a garden.\""
    },
    {
      "t": "div",
      "cn": [
        "mt-6",
        "text-sm",
        "opacity-70"
      ],
      "txt": "MIT Licensed | Built on Express & EJS "+mystery+""
    }
  ]
})
}
