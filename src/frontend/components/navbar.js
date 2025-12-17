
import { gardener } from '../gardener.js'

export default function () {
  return gardener({ "t": "nav", "cn": ["flex", "items-center", "border-b", "h-15", "px-10", "justify-between"], "children": [{ "t": "p", "cn": ["font-bold"], "children": [{ "t": "a", "attr": { "href": "/" }, "txt": "Event Manager" }] }, { "t": "ul", "cn": ["flex", "items-center", "gap-6"], "children": [{ "t": "li", "children": [{ "t": "a", "attr": { "href": "/" }, "txt": "Home" }] }, { "t": "li", "children": [{ "t": "a", "attr": { "href": "/events" }, "txt": "Events" }] }, { "t": "li", "children": [{ "t": "a", "cn": ["bg-blue-500", "text-white", "px-4", "py-2", "rounded-lg", "hover:bg-blue-600", "transition"], "attr": { "href": "/create-event" }, "txt": "Create Event" }] }] }] })
}