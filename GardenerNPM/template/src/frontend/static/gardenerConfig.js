import { fetchElement } from "./gardener.js"

export const mode = fetchElement('#node_env').innerText === 'production' ? 'prod' : 'dev';
console.log(mode);

