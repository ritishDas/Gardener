import { copybtn } from "../components/copybtn.js";
import { pageloader } from "../components/nonui/navigation.js";
import addNotification from "../components/notification.js";
import { gardener, fetchElement, replaceElement, appendElement } from "../gardener.js";
import { log, parser, addEl, State } from "../gardenerDev.js"


// pageloader();

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



// parser('body');
