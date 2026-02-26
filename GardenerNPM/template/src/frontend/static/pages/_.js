import { copybtn } from "../components/copybtn.js";
import addNotification from "../components/notification.js";
import { gardener, fetchElement, replaceElement, appendElement } from "/static/gardener.js";
import { log, parser, addEl, State } from "/static/gardenerDev.js"

addEl('.copybtn', 'click', () => {
  navigator.clipboard.writeText(fetchElement('.initCommand').innerText)
  replaceElement('.copybtn', copybtn());
  addNotification({ status: 'success', message: 'Copied' })
})



