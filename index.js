import { fetchElement, gardener, parser, parserWindow } from "./gardener.js";

const data = parser(fetchElement('#target'), true);
console.log(data);
//parserWindow(JSON.stringify(data));
//console.log(fetchElement('#target'));
//


