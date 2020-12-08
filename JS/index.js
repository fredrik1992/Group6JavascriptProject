"use strict";

let noteButton;
let main = document.getElementById("main");

function initButton() {
  createButton();
  buttonContains();
}

function createButton() {
  noteButton = document.createElement("div");
  noteButton.className = "menuIcon";
  document.body.appendChild(noteButton);
  let span = document.createElement("span");
  noteButton.appendChild(span);
  let icon = document.createElement("img");
  icon.src = "/media/plus-circle.svg";
  icon.width = "50";
  icon.height = "50";
  span.appendChild(icon);
  noteButton.addEventListener("click", function () {
    let menu = document.querySelector(".menuIcon");
    menu.classList.toggle("active");
  });
}

function buttonContains() {
  let listButtons = document.createElement("ul");
  noteButton.appendChild(listButtons);
  let b1 = document.createElement("li");
  let b1img = document.createElement("img");
  b1img.src = "/media/card-list.svg";
  b1img.height = "50";
  b1img.width = "50";
  listButtons.appendChild(b1);
  b1.appendChild(b1img);
  b1.addEventListener("click", function () {
    new Note(2);
  });

  let b2 = document.createElement("li");
  let b2img = document.createElement("img");
  b2img.src = "/media/card-text.svg";
  b2img.width = "50";
  b2img.height = "50";
  listButtons.appendChild(b2);
  b2.appendChild(b2img);
  b2.addEventListener("click", function () {
    new Note(1);
  });
}

/*
Konstruktor för notes-objekt 
*/
function Note(type){
  this.noteElement = createNote(type);
  main.appendChild(this.noteElement);
  
}

//////////////////////////////////////// FUNCTIONS FOR CREATING NEW NOTE ////////////////////////////////////////

//Skapar anteckningens container-div (<article>) och kallar på funktioner som ger styling och skapar de adnra elementen i anteckningen innan den fästs i <main>
function createNote(type /*  1 for note 2 for list*/) {
  let article = document.createElement("article");
  article = articleAttributes(article);
  article.appendChild(createDiv1());
  article.appendChild(createDiv2(type));
  article.appendChild(createBtnConfirm());
  return article;
}

//Ger <article> klass och id
function articleAttributes(article) {
  article.className = "note";
  article.id = "note-article";
  return article;
}

//Skapar en div som innehåller delete-btn och datumet
function createDiv1() {
  let div1 = document.createElement("div");
  div1.className = "note-buttons-top";
  div1.appendChild(createP());
  div1.appendChild(createBtnDelete());
  return div1;
}


//Datumet
function createP() {
  let p = document.createElement("p");
  p.className = "date";
  p.innerText = addDate(); //Sätter texten i <p>-taggen till det datum addDate() retunerar
  return p;
}

//Delete-knappen
function createBtnDelete() {
  let btnDelete = document.createElement("button");
  btnDelete.id = "delete-button";
  btnDelete.className = "note-button";
  
  btnDelete.addEventListener("click", function () {
    closeNote();
  });
  btnDelete.appendChild(createImgDelete());
  return btnDelete;
}


//Bilden till delete-knappen
function createImgDelete() {
  let imgDelete = document.createElement("img");
  imgDelete.id = "img-delete";
  imgDelete.src = "media/x.svg";
  imgDelete.alt = "delete button";
  imgDelete.width = "32";
  imgDelete.height = "32";
  imgDelete.title = "Delete";
  return imgDelete;
}


//Skapar en div som innehåller en text-anteckning eller en list-anteckning beroende på användarens val
function createDiv2(type) {
  let div2 = document.createElement("div");
  div2.className = "content";

  if (type == 1) {
    let textarea = document.createElement("div");
    textarea.className = "textArea"
    textarea.contentEditable = "true";
    div2.appendChild(textarea);
  }

  if (type == 2) {
    let node = document.createElement("ul");
    let node_li = document.createElement("li"); // Create a <li> node
    let textnode = document.createTextNode(""); // Create a text node
    node_li.appendChild(textnode);
    node.appendChild(node_li);
    node.className = "list";
    div2.appendChild(node);
  }

  return div2;
}

//Skapar Confirm-knappen
function createBtnConfirm(article) {
  let btnConfirm = document.createElement("button");
  btnConfirm.id = "confirm-button";
  btnConfirm.className = "note-button note-button-bottom";
  btnConfirm.addEventListener("click", function () {
    saveNote();
  });
  btnConfirm.appendChild(createImgConfirm());
  return btnConfirm;
}

//Bilden till confirm-knappen
function createImgConfirm() {
  let imgConfirm = document.createElement("img");
  imgConfirm.id = "img-confirm";
  imgConfirm.src = "media/check.svg";
  imgConfirm.alt = "confirm button";
  imgConfirm.width = "32";
  imgConfirm.height = "32";
  imgConfirm.title = "Confirm";
  return imgConfirm;
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

function saveNote() {
  let inputValue = document.getElementById("input-text").value;
  ///   console.log(inputValue);
}

function closeNote() {
  let x = document.getElementById("note-article");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", initButton());
