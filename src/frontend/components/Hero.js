import { gardener } from "../gardener.js"

export default function() {

  function sayHello() {
    console.log('hello world')
  }


  return gardener({ "t": "div", "cn": ["hero", "flex", "justify-around", "items-center", "p-5", "h-[90vh]"], "children": [{ "t": "p", "cn": ["p-5"], "txt": "Gardener is a front-end library for creating and manipulating DOM elements using a declarative JavaScript object syntax. It includes a development server with features like hot-reloading and on-the-fly component creation from existing HTML. The server also provides dynamic image resizing and caching." }, { "t": "img", events: { click: sayHello }, "cn": ["w-500"], "attr": { "src": "/img/gardener.jpg/500/500", "alt": "logo" } }] })
}
