"use strict";

let noteButton;
let main = document.getElementById("main");
let existingNoteBooks = [];

function initButton() {
  createButton();
  buttonContains();
  createAddNoteBookButton();
}
//---create noteBookStarts

function createAddNoteBookButton() {
  //skapa div element med flex  som en dropdown item
  // lägga till knapp samt input
  let getDropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
  let flexBoxForContent = document.createElement("div");
  let buttonToAddBooks = document.createElement("button");
  let buttonImage = document.createElement("img");
  let formToInput = document.createElement("form"); // want to add required
  let noteBookNameInput = document.createElement("input");

  flexBoxForContent.className = " addNoteBookFlexBox";
  buttonToAddBooks.className = "addNoteBookButton";
  noteBookNameInput.className = "noteBookTitle";
  buttonImage.src = "/media/plus-circle.svg";
  noteBookNameInput.placeholder = "Title of book";
  noteBookNameInput.required = true;

  getDropdownMenu.appendChild(flexBoxForContent);
  buttonToAddBooks.appendChild(buttonImage);
  flexBoxForContent.appendChild(buttonToAddBooks);
  flexBoxForContent.appendChild(formToInput);
  formToInput.appendChild(noteBookNameInput);

  buttonToAddBooks.addEventListener("click", function () {
    //starts the creation of note books

    createNoteBok(); //sends value of input
  });
}

function createNoteBok() {
  //calls all functions necesary to add a new book

  let inputTitle = document.getElementsByClassName("noteBookTitle")[0].value; //input value
  let changeInputBoxApparance = document.getElementsByClassName(
    "noteBookTitle"
  )[0]; //to change apparance

  if (inputTitle === "") {
    //checks that input isent empty

    changeInputBoxApparance.style.border = "solid red 3px";
  } else {
    changeInputBoxApparance.style.border = "solid 1px";




    




    existingNoteBooks.push(new NoteBookObject(inputTitle)); //adds a new notebook to the list
    document.getElementsByClassName("noteBookTitle")[0].value = "";
  } //clears input field

  updateCurrentNoteBooks(); //updates the note book list with added book
}

function NoteBookObject(title) {
  this.titleOfObject = title;
  this.arrayOfAddedNotes = ["placeholderForNoteobjects"];

  this.getTitle = function () {
    return this.titleOfObject;
  };

  this.setTitle = function (newTitle) {
    this.titleOfObject = newTitle;
  };

  function addNoteToBook(note) {
    arrayOfAddedNotes.push(note);
  }
}

function removeNoteBooks(titleToRemove) {
  //titleToRemove is a button event bound to the object when created

  for (let i = 0; i < existingNoteBooks.length; i++) {
    if (existingNoteBooks[i].titleOfObject == titleToRemove.titleOfObject) {
      existingNoteBooks.splice(i, 1);
      break;
    }
  }

  updateCurrentNoteBooks();
}

function updateCurrentNoteBooks() {
  document.querySelectorAll(".dropdown-item").forEach((e) => e.remove()); //cleares window
  document.querySelectorAll(".noteBookFlex").forEach((e) => e.remove()); //cleares window

  let getDropdownMenu = document.getElementsByClassName("dropdown-menu")[0];

  existingNoteBooks.forEach((element) => {
    let flexBox = document.createElement("div");
    let removeNoteBookButton = document.createElement("button");
    let buttonImage = document.createElement("img");
    let books = document.createElement("button"); // makes the entie title a button

    flexBox.className = "noteBookFlex";
    books.className = "dropdown-item";
    removeNoteBookButton.className = "removeNoteBookButton";
    buttonImage.src = "media/x.svg";
    books.textContent = element.getTitle(); //gets the title variable in noteBookObject

    getDropdownMenu.appendChild(flexBox);
    removeNoteBookButton.appendChild(buttonImage);
    flexBox.appendChild(removeNoteBookButton);
    flexBox.appendChild(books);

    books.addEventListener("click", function () {
      // used to call a certain book to display its notes

      displayElementsBelongingToBook(element);
    });

    removeNoteBookButton.addEventListener("click", function () {
      removeNoteBooks(element);
    });
  });
}

function displayElementsBelongingToBook(bookObject) {
  //takes the object array to send to create notes

  let array = bookObject.arrayOfAddedNotes;

  array.forEach((element) => {
    console.log("test");
    // somwhere we need to choose to either hide or remove the other notes when this function is called
    //suppose to call create element function  to only have the exisiting object notes displayed
  });


}




//--

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
function Note(type) {
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
  article.className = "note shadow-sm";
  article.id = "note-article";
  return article;
}

//Skapar en div som innehåller delete-btn och datumet
function createDiv1() {
  let div1 = document.createElement("div");
  div1.className = "note-buttons-top";
  div1.appendChild(addBooksToNote());
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
    textarea.className = "textArea";
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

//Bilden till confirm-knappen.
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


//Skapar en knapp med en "drop down" som ska skriva ut innehållet i listobjectet. Finns det inget innehåll syns inte knappen. Behöver funktionalitet för att koppla vald notebook till antecknigsobjektet.
function addBooksToNote() {


  let noteBooks = ["Katt", "Hund", "Mockasin"]; //placeholder 
  let noteDropDown = document.createElement("div");
  let button = document.createElement("button");
  let btnIcon = document.createElement("img");
  let dropDownContent = document.createElement("div");
  let dropDownList = document.createElement("ul");
  
  noteDropDown.className = "dropdown";
  noteDropDown.appendChild(button);
  noteDropDown.appendChild(dropDownContent);







  
  
  button.className = "note-button";
  button.addEventListener("click", () => {
    dropDownContent.style.display = "block";
  });
  button.appendChild(btnIcon);

  btnIcon.src = "media/journal-plus.svg";
  btnIcon.width = "24";
  btnIcon.height = "24";
  btnIcon.title = "Add to Note book";

  dropDownContent.className = "dropdown-content shadow-sm";
  dropDownContent.appendChild(dropDownList);

  if (noteBooks.length === 0) {
    button.style.display = "none";

  } else {
    for (let i = 0; i < noteBooks.length; i++) {
      let li = document.createElement("li");
      let option = document.createElement("a");
     
      option.href = "#";
      option.className = "dropdown-option";
      option.textContent = noteBooks[i];
      option.addEventListener("click", () => {
        dropDownContent.style.display = "none";
      })

      li.appendChild(option);
      dropDownContent.appendChild(li);
    }
  }

  return noteDropDown;
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
