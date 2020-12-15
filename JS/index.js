"use strict";

let noteButton;
let main = document.getElementById("main");
let existingNoteBooks = [];
let allNotes = [];
let openNotebook = "Dashboard";

function init() {
  createButton();
  buttonContains();
  createAddNoteBookButton();
  document.getElementsByClassName("noteBookTitle")[0].value = "Dashboard";
  createNoteBok();
  displayCurrentNoteBook();
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
    "noteBookTitle")[0]; //to change apparance

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

  this.getTitle = function () {
    return this.titleOfObject;
  };

  this.setTitle = function (newTitle) {
    this.titleOfObject = newTitle;
  };

};

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
    let notebook = document.createElement("button"); // makes the entie title a button

    flexBox.className = "noteBookFlex";
    notebook.className = "dropdown-item";
    removeNoteBookButton.className = "removeNoteBookButton";
    buttonImage.src = "media/x.svg";
    notebook.textContent = element.getTitle(); //gets the title variable in noteBookObject
    notebook.style.fontFamily = "Cursive";
   
    getDropdownMenu.appendChild(flexBox);
    removeNoteBookButton.appendChild(buttonImage);
    
    if (element.titleOfObject != "Dashboard"){ //checks if element is Dashboard so it wont get removed

      flexBox.appendChild(removeNoteBookButton);
    }
    else{notebook.classList.add("Dashboard")}
    
    flexBox.appendChild(notebook);
   
    notebook.addEventListener("click", function () {
      // used to call a certain book to display its notes
      openNotebook = element.getTitle();
      displayCurrentNoteBook();
      globalUpdate();
    });

    removeNoteBookButton.addEventListener("click", function () {
      removeNoteBooks(element);
    });
  });
};

function globalUpdate() {
  document.querySelectorAll(".note").forEach((e) => e.remove()); //cleares window
  moveSelected(false);


  allNotes.reverse();

  allNotes.forEach((element) => {
    if (element.titleOfNoteBook == openNotebook && element.delete != true) {
      main.appendChild(element.noteElement);
    }
  });
}

function clearDeleted(){
  for (let i = 0; i < allNotes.length; i++) {
    if(allNotes[i].delete == true){
      allNotes.splice(i, 1);
    }
  }
}

function displayCurrentNoteBook () {
  let currentNotebookHeading = document.getElementById("current-notebook");
  currentNotebookHeading.innerText = openNotebook.toUpperCase();

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
    allNotes.push(new Note(2));
  });

  let b2 = document.createElement("li");
  let b2img = document.createElement("img");
  b2img.src = "/media/card-text.svg";
  b2img.width = "50";
  b2img.height = "50";
  listButtons.appendChild(b2);
  b2.appendChild(b2img);
  b2.addEventListener("click", function () {
    allNotes.push(new Note(1));
  });
}

/*
Konstruktor för notes-objekt 
*/
function Note(type) {
  this.noteElement = createNote(this, type);
  main.appendChild(this.noteElement);

  this.checkBox = document.createElement("input");
  this.checkBox.type = "checkbox";
  this.checkBox.style.visibility ="hidden";
  this.noteElement.appendChild(this.checkBox);

  this.titleOfNoteBook = openNotebook;
  this.delete = false;

  this.setTitleOfNoteBook = (title) => {
    this.titleOfNoteBook = title;
  };

  this.checkBoxVisible = function(choise){
    if(choise == true){
      return this.checkBox.style.visibility ="visible";
    }else if(choise == false){
      return this.checkBox.style.visibility ="hidden";
    }
  }

  this.removeNote = function () {
    this.noteElement.remove();
    this.delete = true;
    clearDeleted();
  };
}

//////////////////////////////////////// FUNCTIONS FOR CREATING NEW NOTE ////////////////////////////////////////

//Skapar anteckningens container-div (<article>) och kallar på funktioner som ger styling och skapar de adnra elementen i anteckningen innan den fästs i <main>
function createNote(obj, type /*  1 for note 2 for list*/) {
  let article = document.createElement("article");
  article = articleAttributes(article);
  article.appendChild(createDiv1(obj));
  article.appendChild(createDiv2(type, article));
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
function createDiv1(obj) {
  let div1 = document.createElement("div");
  div1.className = "note-buttons-top";
  div1.appendChild(addBooksToNote(obj));
  div1.appendChild(createP());
  div1.appendChild(createBtnDelete(obj));
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
function createBtnDelete(obj) {
  let btnDelete = document.createElement("button");
  btnDelete.id = "delete-button";
  btnDelete.className = "note-button";

  btnDelete.addEventListener("click", function () {
    obj.removeNote();
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
function createDiv2(type, article) {
  let div2 = document.createElement("div");
  div2.className = "content";

  if (type == 1) {
    let textarea = document.createElement("div");
    textarea.className = "textArea";
    textarea.contentEditable = "true";
    div2.appendChild(textarea);
  }

  if (type == 2) {
    article.className = "note note-list shadow-sm";
    let inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    let input = document.createElement("input");
    input.type = "text";
    input.className = "list-input";
    input.placeholder = "Type here..."
    
    let button = document.createElement("button");
    button.className = "list-btn note-button";
    let imgAddList = document.createElement("img");
    imgAddList.src = "media/plus.svg";
    imgAddList.alt = "Add";
    imgAddList.width = "28";
    imgAddList.height = "28";
    imgAddList.title = "Add to list";
    button.appendChild(imgAddList);
    let node = document.createElement("ul");
    node.className = "list";

    inputContainer.appendChild(input);
    inputContainer.appendChild(button);

    div2.appendChild(inputContainer);
    

    input.addEventListener("keypress", function (event) {
      let e = event;
      if (e.keyCode === 13) {
        let node_li = document.createElement("li");
        node_li.className = "list-item";
        let textnode = document.createTextNode(input.value);
        node_li.appendChild(textnode);
        node.appendChild(node_li);

        div2.appendChild(node);
      }
    });

    function addListItemOnClick() {
      if (input.value.length > 0) {
        let node_li = document.createElement("li");
        let textnode = document.createTextNode(input.value);
        node_li.appendChild(textnode);
        node.appendChild(node_li);

        div2.appendChild(node);
      }
    }
    button.addEventListener("click", addListItemOnClick);
  }
  return div2;
}

//Skapar Confirm-knappen
function createBtnConfirm() {
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

//Skapar en knapp med en "drop down" som ska skriva ut innehållet i listobjectet. Finns det inget innehåll syns inte knappen. Behöver funktionalitet för att koppla vald notebook till antecknigsobjektet..
function addBooksToNote(obj) {
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
    clearNoteDropDown();
    addBooksToDropDown(obj, dropDownContent);
    dropDownContent.style.display = "block";
    
    
  });
  button.appendChild(btnIcon);

  btnIcon.src = "media/journal-plus.svg";
  btnIcon.width = "24";
  btnIcon.height = "24";
  btnIcon.title = "Move to notebook";

  dropDownContent.className = "dropdown-content shadow-sm";
  dropDownContent.appendChild(dropDownList);

  return noteDropDown;
}

function addBooksToDropDown(obj, dropDownContent) {
  for (let i = 0; i < existingNoteBooks.length; i++) {
    let li = document.createElement("li");
    li.className = "dropdown-li";
    let option = document.createElement("a");

    option.href = "#";
    option.className = "dropdown-option dropdown-a";
    option.textContent = existingNoteBooks[i].getTitle();

    option.addEventListener("click", (element) => {
      if(obj.checked == true || obj.checkBox.style.visibility == 'hidden'){
        obj.setTitleOfNoteBook(element.target.innerText);
        globalUpdate();  
      }
      
      allNotes.forEach((element) => {
        if (element.checkBox.checked == true) {
          element.titleOfNoteBook = existingNoteBooks[i].getTitle();
          element.checkBox.checked = false;
          globalUpdate();
        } else {
          console.log("Inget flyttades");
        }
      });

      dropDownContent.style.display = "none";
    });

    li.appendChild(option);
    dropDownContent.appendChild(li);
  }
  let closeButton = document.createElement("button");
  closeButton.textContent = "CLOSE";
  closeButton.className = "btn btn-outline-secondary btn-sm btn-block dropdown-btn";
  closeButton.addEventListener("click", () => {
    dropDownContent.style.display = "none";
  });
  let selectToMove = document.createElement("button");
  selectToMove.textContent = "select more";
  selectToMove.className = "btn btn-outline-secondary btn-sm btn-block dropdown-btn";
  selectToMove.addEventListener("click", () => {
    moveSelected(true);
  });

  dropDownContent.appendChild(selectToMove);
  dropDownContent.appendChild(closeButton);
  closeOnClickOutside(obj, dropDownContent);
  
}

function closeOnClickOutside (obj, dropDownContent) {
  document.addEventListener("click", (event) => {
    let target = event.target;
    do {
      if (obj.noteElement == target) {
        return;
      }
      target = target.parentNode;
    }
    while (target);
    dropDownContent.style.display = "none";

  })
  
}

function clearNoteDropDown () {
  document.querySelectorAll(".dropdown-a").forEach((e) => e.remove());
  document.querySelectorAll(".dropdown-li").forEach((e) => e.remove());
  document.querySelectorAll(".dropdown-btn").forEach((e) => e.remove());

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

function moveSelected(bool){
  allNotes.forEach(element => {
    element.checkBoxVisible(bool)
  });
}

window.addEventListener("DOMContentLoaded", init());
