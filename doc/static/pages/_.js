import { copybtn } from "../components/copybtn.js";
import addNotification from "../components/notification.js";
import { gardener, fetchElement, replaceElement, appendElement } from "/static/gardener.js";
import { log, parser, addEl, State } from "/static/gardenerDev.js"

addEl('.copybtn', 'click', () => {
  try {
    navigator.clipboard.writeText(fetchElement('.initCommand').innerText)
    replaceElement('.copybtn', copybtn());
    addNotification({ status: 'success', message: 'Copied' })
  }
  catch (err) {
    addNotification({
      status: 'failure', message: "Couldn't Copy"
    });
  }
})



