import { copybtn } from "../components/copybtn.js";
import { pageloader } from "../components/nonui/navigation.js";
import addNotification from "../components/notification.js";
import { fetchElement, replaceElement } from "../gardener.js";
import { addEl } from "../gardenerDev.js";

pageloader();

const elements = document.querySelectorAll('.copybtn');


elements.forEach(element =>

  addEl(element, 'click', () => {
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
)
