"use strict";

let noteButton

function initButton(){
createButton();
buttonContains();
}

function createButton(){
  noteButton = document.createElement("div")
  noteButton.className = "menuIcon"
document.body.appendChild(noteButton)
let span = document.createElement("span")
noteButton.appendChild(span)
let icon = document.createElement("img")
icon.src = "/media/plus-circle.svg"
icon.width ="50"
icon.height ="50"
span.appendChild(icon)
noteButton.addEventListener("click", function(){
  let menu = document.querySelector('.menuIcon');
    menu.classList.toggle('active')
});
}

function buttonContains(){
let listButtons = document.createElement("ul")
noteButton.appendChild(listButtons)

let b1 = document.createElement("li")
let b1img = document.createElement("img")
b1img.src = "/media/card-list.svg"
b1img.height = "50"
b1img.width = "50"
listButtons.appendChild(b1)
b1.appendChild(b1img)
b1.addEventListener("click", function(){
  createElementType(2)
});

let b2 = document.createElement("li")
let b2img = document.createElement("img")
b2img.src = "/media/card-text.svg"
b2img.width = "50"
b2img.height = "50"
listButtons.appendChild(b2)
b2.appendChild(b2img)
b2.addEventListener("click", function(){
  createElementType(1)
});
}





function createElementType(type /*  1 for note 2 for list*/) {
  //creates a element with values depending on the type and adds to page 'Fredrik

  let main = document.getElementById("main"); // add div wich is gonna hold all elements
  let article = document.createElement("article");
  article.setAttribute("class", "note");
  article.setAttribute("id", "note-article");

  let div1 = document.createElement("div");
  div1.setAttribute("class", "note-buttons-top");
  article.appendChild(div1);

  let p = document.createElement("p");
  p.setAttribute("class", "date");
  p.innerText = addDate();
  div1.appendChild(p);

  let btnDelete = document.createElement("button");
  btnDelete.setAttribute("id", "delete-button");
  btnDelete.setAttribute("class", "note-button");
  btnDelete.addEventListener("click", function(){
    closeNote()
  });
  div1.appendChild(btnDelete);

  let imgDelete = document.createElement("img");
  imgDelete.setAttribute("id", "img-delete");
  imgDelete.setAttribute("src", "media/x.svg");
  imgDelete.setAttribute("alt", "delete button");
  imgDelete.setAttribute("width", "32");
  imgDelete.setAttribute("height", "32");
  imgDelete.setAttribute("title", "Delete");
  btnDelete.appendChild(imgDelete);

  let div2 = document.createElement("div");
  div2.setAttribute("class", "content");
  article.appendChild(div2);

  let btnConfirm = document.createElement("button");
  btnConfirm.setAttribute("id", "confirm-button");
  btnConfirm.setAttribute("class", "note-button note-button-bottom");
  btnConfirm.addEventListener("click", function(){
    saveNote()
  });
  article.appendChild(btnConfirm);

  let imgConfirm = document.createElement("img");
  imgConfirm.setAttribute("id", "img-confirm");
  imgConfirm.setAttribute("src", "media/check.svg");
  imgConfirm.setAttribute("alt", "confirm button");
  imgConfirm.setAttribute("width", "32");
  imgConfirm.setAttribute("height", "32");
  imgConfirm.setAttribute("title", "Confirm");
  btnConfirm.appendChild(imgConfirm);

  if (type == 1) {
    let textarea = document.createElement("textarea");
    div2.appendChild(textarea);
  }

  if (type == 2) {
    let node = document.createElement("ul");
    let node_li = document.createElement("li"); // Create a <li> node
    let textnode = document.createTextNode(""); // Create a text node
    node_li.appendChild(textnode);
    node.appendChild(node_li);
    node.setAttribute("class", "list");
    div2.appendChild(node);
  }

  main.appendChild(article);
}

//Skapar ett nytt datum-objekt och lägger till dagens datum till en ny anteckning i formatet yyyy-mm-dd
function addDate() {
  const noteDate = new Date();
  let month = noteDate.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = noteDate.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${noteDate.getFullYear()}-${month}-${day}`;
}





function saveNote(){
    let inputValue = document.getElementById("input-text").value;    
 ///   console.log(inputValue);
    }

    function closeNote(){
        let x = document.getElementById("note-article");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

window.addEventListener("DOMContentLoaded", initButton());