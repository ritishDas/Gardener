import { gardener, fetchElement, appendElement } from "../gardener.js";

const main = fetchElement("#main");

const helloUI = gardener({
    t: "div",
    cn: ["flex", "flex-col", "items-center", "justify-center", "h-screen", "bg-indigo-600", "text-white"],
    children: [
        {
            t: "h1",
            cn: ["text-5xl", "font-bold", "mb-4"],
            txt: "Hello from Gardener MCP!"
        },
        {
            t: "p",
            cn: ["text-xl", "opacity-80"],
            txt: "This page was created programmatically using the new AI-ready services."
        },
        {
            t: "button",
            cn: ["mt-8", "px-6", "py-2", "bg-white", "text-indigo-600", "rounded-full", "font-bold", "hover:bg-indigo-50", "transition"],
            txt: "Go Back",
            events: {
                click: () => window.location.href = "/"
            }
        }
    ]
});

if (main) {
    // Clear the hero from template
    main.innerHTML = "";
    appendElement(main, helloUI);
}