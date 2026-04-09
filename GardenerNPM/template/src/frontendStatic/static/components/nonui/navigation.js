import { gardener, fetchElement, appendElement } from "../../gardener.js";
import { mode } from "../../gardenerConfig.js";

const body = fetchElement('#main');

export function nextPagehandler() {
  const anchor = document.querySelectorAll('a')
  anchor.forEach(link => {

    link.addEventListener('click', (e) => {


      e.preventDefault();
      nextPage(link.href)

    })
  })



  window.addEventListener('pagehide', () => {
    setTimeout(() => {
      body.style.transform = 'translateX(0px)';
      setTimeout(() => {
        try {
          fetchElement('.tempnpdiv').remove()
        }
        catch (err) { }

      }, 200)
    }, 200);
  });

}

export function nextPage(link) {

  appendElement(body, gardener({
    t: 'div',
    cn: ['tempnpdiv', 'top-0', 'left-[100vw]', 'fixed', 'h-screen', 'w-screen'],
  }))
  const width = window.innerWidth
  console.log(width)
  body.style.transition = '.2s';
  body.style.transform = `translateX(-${width}px)`
  setTimeout(() => {
    window.location.href = link
  }, 200)
}

export function pageloader() {
  const loader = fetchElement('.loader');
  loader.style.transition = '.4s';
  loader.style.opacity = '0';
  if (mode !== 'dev')
    setTimeout(() => loader.remove(), 400)
  else
    loader.remove();
}
