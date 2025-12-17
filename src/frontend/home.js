import Hero from "./components/Hero.js";
import { fetchElement, parser, replaceElement } from "./gardener.js";
replaceElement(fetchElement('.hero'), Hero())

//parser(fetchElement('nav'))
