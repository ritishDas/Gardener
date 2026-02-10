
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export default function thisfun() {
  return gardener({
  "t": "div",
  "attr": {
    "id": "body"
  },
  "children": [
    {
      "t": "div",
      "cn": [
        "h-screen",
        "w-screen",
        "bg-white",
        "loader",
        "absolute"
      ],
      "attr": {
        "style": "transition: 0.4s; opacity: 0;"
      },
      "txt": ""
    },
    {
      "t": "div",
      "cn": [
        "hero",
        "flex",
        "justify-around",
        "items-center",
        "p-5",
        "h-[90vh]"
      ],
      "children": [
        {
          "t": "p",
          "cn": [
            "p-5"
          ],
          "txt": "Gardener is a front-end library for creating and manipulating DOM elements using a declarative JavaScript object syntax. It includes a development server with features like timely reload and on-the-fly component creation from existing HTML. The server also provides dynamic image resizing and caching."
        },
        {
          "t": "img",
          "attr": {
            "src": "/cache/gardener_500x500.webp",
            "alt": "logo"
          }
        }
      ]
    }
  ]
})
}
