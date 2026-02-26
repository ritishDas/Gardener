
import { gardener, fetchElement, replaceElement } from '../gardener.js'

export default function thisfun() {
  return gardener({
  "t": "body",
  "children": [
    {
      "t": "div",
      "cn": [
        "notification"
      ]
    },
    {
      "t": "div",
      "cn": [
        "bg-gray-200",
        "w-screen",
        "h-screen",
        "flex",
        "justify-center",
        "items-center"
      ],
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
              "txt": "Gardener is a front-end library for creating and manipulating DOM elements using a declarative JavaScript object syntax. It includes a development server with features like hot-reloading and on-the-fly component creation from existing HTML. The server also provides dynamic image resizing and caching."
            },
            {
              "t": "img",
              "cn": [
                "w-500"
              ],
              "attr": {
                "src": "/cache/w_500x500.webp",
                "alt": "logo"
              }
            }
          ]
        }
      ]
    },
    {
      "t": "script",
      "attr": {
        "src": "/static/global.js",
        "type": "module"
      }
    },
    {
      "t": "script",
      "attr": {
        "type": "module",
        "src": "/static/pages/_test.js"
      },
      "txt": ""
    },
    {
      "t": "button",
      "cn": [
        "pb-1.5",
        "flex",
        "items-center",
        "justify-center",
        "h-15",
        "w-15",
        "bg-green-300",
        "fixed",
        "bottom-22",
        "right-2",
        "rounded-full",
        "text-5xl"
      ],
      "children": [
        {
          "t": "span",
          "txt": "+"
        }
      ]
    },
    {
      "t": "p",
      "cn": [
        "bg-gray-200",
        "fixed",
        "bottom-0",
        "z-100",
        "right-0",
        "border-b-1",
        "p-2",
        "rounded-md"
      ],
      "children": [
        {
          "t": "span",
          "txt": "Press"
        },
        {
          "t": "span",
          "cn": [
            "text-green-500",
            "font-bold"
          ],
          "txt": "Alt+h"
        },
        {
          "t": "span",
          "txt": "to toggle Hot Reload"
        },
        {
          "t": "form",
          "cn": [
            "p-2",
            "bg-red-300"
          ],
          "attr": {
            "id": "hrcheckbox",
            "style": "background: red;"
          },
          "children": [
            {
              "t": "label",
              "txt": "Hot Reload"
            },
            {
              "t": "input",
              "cn": [
                "hrcheckbox"
              ],
              "attr": {
                "type": "checkbox"
              }
            }
          ]
        }
      ]
    }
  ]
})
}
