function fetchElement(param) {
  return document.querySelector(param);
}

function appendElement(parent,child) {
  parent.appendChild(child);
}

function createElement(type,classname) {
  let element = document.createElement(type);
  if(classname)
  element.classList.add(...classname);
  return element;
}

function insertText(element,text) {
  element.innerText = text;
}

function replaceElement(original, New) {
  original.replaceWith(New);
}

function gardener(Dom) {
  
  let element = createElement(Dom.t,Dom.cn);

  if(Dom.txt){
    insertText(element,Dom.txt);
  }

  if(Dom.attr){
  for (const [key, value] of Object.entries(Dom.attr)) {
      element[key] = value;
}
  }

  if(Dom.onclick){
    element.addEventListener('click', Dom.onclick);
  }

  if(Dom.onsubmit){
    element.addEventListener('submit', Dom.onsubmit);
  }

  if(Dom.children){
  Dom.children.forEach(child=>{
    appendElement(element,gardener(child));
  });
  }



  return element;
}
