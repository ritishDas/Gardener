import { parser, fetchElement, replaceElement, gardener, appendElement } from './gardener.js'

const body = fetchElement('#body')

nextPagehandler();
pageloader();


function nextPagehandler() {
  const anchor = document.querySelectorAll('a')
  anchor.forEach(link => {

    link.addEventListener('click', (e) => {

      //event delegation
      const link = e.target.closest('a');
      if (!link) return;
      if (link.target === '_blank') return;
      //event delegation

      e.preventDefault();
      appendElement(body, gardener({
        t: 'div',
        cn: ['tempnpdiv', 'top-0', 'left-[100vw]', 'absolute', 'h-screen', 'w-screen', 'shadow-[30px_0_60px_15px_rgb(0,0,0)]'],
      }))
      const width = window.innerWidth
      console.log(width)
      body.style.transition = '.2s';
      body.style.transform = `translateX(-${width}px)`
      setTimeout(() => {
        window.location.href = link.href
      }, 200)
    })
  })

  window.addEventListener('pagehide', () => {
    setTimeout(() => {
      body.style.transform = 'translateX(0px)';
      setTimeout(() => {
        fetchElement('.tempnpdiv').remove()

      }, 200)
    }, 200);
  });

}

function pageloader() {
  const loader = fetchElement('.loader');
  loader.style.transition = '.4s';
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 400)

}
//console.log('hellooo');
//parser(fetchElement('.hero'));
//parser(fetchElement('nav'));
