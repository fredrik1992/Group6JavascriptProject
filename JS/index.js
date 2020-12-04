"use strict";

document.getElementById("new-note-button").addEventListener("click", function(){
  let menu = document.querySelector('.menuIcon');
    menu.classList.toggle('active')
});
document.getElementById("list-button").addEventListener("click", function(){
  createElementType(2)
});
document.getElementById("text-button").addEventListener("click", function(){
  createElementType(1)
});
document.getElementById("delete-button").addEventListener("click", function(){
  closeNote()
});
document.getElementById("confirm-button").addEventListener("click", function(){
  saveNote()
});


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