let noteButton;
let main = document.getElementById("main");
let existingNoteBooks = [];
let allNotes = [];
let openNotebook = "Dashboard";

function init() {
  createNewNoteButton();
  buttonContent();
  createAddNoteBookButton();
  createNoteBook("Dashboard");
  createNoteBooksFromLocalStorage();
  makeNotesFromLocalStorage();
  if (openNotebook == null) {
    openNotebook = "Dashboard";
  }
  displayCurrentNoteBook();
  globalUpdate();
}
//---create noteBookStarts this function adds a button with calls to add new note books

function createAddNoteBookButton() {

  let getDropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
  let flexBoxForContent = document.createElement("div");
  let buttonToAddBooks = document.createElement("button");
  let buttonImage = document.createElement("img");
  let formToInput = document.createElement("form"); 
  let noteBookNameInput = document.createElement("input");

  flexBoxForContent.className = " addNoteBookFlexBox";
  buttonToAddBooks.className = "addNoteBookButton";
  noteBookNameInput.className = "noteBookTitle";
  buttonImage.src = "/media/plus-circle.svg";
  noteBookNameInput.placeholder = "Title of book";
  noteBookNameInput.required = true;
  noteBookNameInput.addEventListener("keypress", function (event) {
    let e = event;
    if (e.code === "Enter") {
      createNoteBook();
    }
  });

  getDropdownMenu.appendChild(flexBoxForContent);
  buttonToAddBooks.appendChild(buttonImage);
  flexBoxForContent.appendChild(buttonToAddBooks);
  flexBoxForContent.appendChild(formToInput);
  formToInput.appendChild(noteBookNameInput);

  buttonToAddBooks.addEventListener("click", function () {
  

    createNoteBook(); 
  });
}

//Calls all functions necessary for creating a new notebook
function createNoteBook(inputFromLocalStorage) {


  let inputTitle = document.getElementsByClassName("noteBookTitle")[0].value;
  if (inputFromLocalStorage != null) {
 
     inputTitle = inputFromLocalStorage;
  }

  let changeInputBoxApparance = document.getElementsByClassName(
    "noteBookTitle"
  )[0]; 

  if (inputTitle === "") {
    
    changeInputBoxApparance.style.border = "solid red 3px";
  } else {
    changeInputBoxApparance.style.border = "solid 1px";

    existingNoteBooks.push(new NoteBookObject(inputTitle));
    document.getElementsByClassName("noteBookTitle")[0].value = "";
  } 

  updateCurrentNoteBooks(); 
  saveNoteBooksToLocalStorage();
}

// function to take all current Notebooks and save to local storage
function saveNoteBooksToLocalStorage() {
 
  if (existingNoteBooks.length > 1) {
    let arrayToHoldAllCurrentNotebooks = []; 
    existingNoteBooks.forEach((element) => {
      if (element.titleOfObject != "Dashboard") {
        arrayToHoldAllCurrentNotebooks.push(element.titleOfObject);
      }
    }); //need to clear array after used or check before if there allredy is a existing name

    arrayToHoldAllCurrentNotebooks.toString(); // turns the notes ti string
    localStorage.setItem("books", arrayToHoldAllCurrentNotebooks);
  }
}
//Creates Notebooks from local storage
function createNoteBooksFromLocalStorage() {
  if (localStorage.getItem("lastVisitedNoteBook" != null)) {
    openNotebook = localStorage.getItem("lastVisitedNoteBook");
  }
  if (getLocalStorageListsToArray("books") != null) {
    getLocalStorageListsToArray("books").forEach((element) => {
      createNoteBook(element);
    });
  }
}
// saves which note book was last opened to local storage
function lastVisitedNoteBook(lastNoteBookClick) {
  //at sstart
  localStorage.setItem("lastVisitedNoteBook", lastNoteBookClick);
}
//constructor for creating noteBooks
function NoteBookObject(title) {
  this.titleOfObject = title;

  this.getTitle = function () {
    return this.titleOfObject;
  };

  this.setTitle = function (newTitle) {
    this.titleOfObject = newTitle;
  };
}
//Removes note books from local storage 
function removeNoteBooks(titleToRemove) {
  //titleToRemove is a button event bound to the object when created

  for (let i = 0; i < existingNoteBooks.length; i++) {
    if (existingNoteBooks[i].titleOfObject == titleToRemove.titleOfObject) {
      existingNoteBooks.splice(i, 1);
      if (existingNoteBooks.length == 1) {
        localStorage.removeItem("books");
        //Testar om bara dashboard är kvar och tar bort nyckeln helt.
      }
      saveNotesToLocalStorage();
      saveNoteBooksToLocalStorage();
      break;
    }
  }

  updateCurrentNoteBooks();
}
//updates notebooks when somthing is changed
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

    if (element.titleOfObject != "Dashboard") {
      //checks if element is Dashboard so it wont get removed

      flexBox.appendChild(removeNoteBookButton);
    } else {
      notebook.classList.add("Dashboard");
    }

    flexBox.appendChild(notebook);

    notebook.addEventListener("click", function () {
      // used to call a certain book to display its notes

      openNotebook = element.titleOfObject;
      lastVisitedNoteBook(element.titleOfObject);
      displayCurrentNoteBook();
      globalUpdate();
    });

    removeNoteBookButton.addEventListener("click", function () {
      moveToDashboard(element);
      if (element.titleOfObject == openNotebook) {
        openNotebook = "Dashboard";
        localStorage.setItem("lastVisitedNoteBook", "Dashboard");
      }
      removeNoteBooks(element);
      displayCurrentNoteBook();
      globalUpdate();
    });
  });
}
//Changes title of object to Dashboard if notebook is deleted
function moveToDashboard(obj) {
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].titleOfNoteBook == obj.titleOfObject) {
      allNotes[i].titleOfNoteBook = "Dashboard";
    }
  }
}

//updates the window to show the correct notes 
function globalUpdate() {
  document.querySelectorAll(".note").forEach((e) => e.remove()); //cleares window
  moveSelected(false);

  allNotes.forEach((element) => {
    if (element.titleOfNoteBook == openNotebook && element.delete != true) {
      main.prepend(element.noteElement);
    }
  });
}
//removes the noteobject from allnotes that is marked for deletion
function clearDeleted() {
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].delete == true) {
      allNotes.splice(i, 1);
    }
  }
}
///Gets the current open notebook and displays it in the header of the page
function displayCurrentNoteBook() {
  let currentNotebookHeading = document.getElementById("current-notebook");
  currentNotebookHeading.innerText = openNotebook.toUpperCase();
  newNoteBookIntro(currentNotebookHeading);
}
//flashes the new notebook name when changing noteBook
function newNoteBookIntro(notebookHeading) {
  notebookHeading.style.color = "#f7faeb";
  notebookHeading.style.transition = "all 0.1s ease-in-out";
  notebookHeading.style.transform = "scale(1.1)";

  setTimeout(() => {
    notebookHeading.style.color = "#32292f";
    notebookHeading.style.transform = "scale(1)";
  }, 100);
}

//Creates a button that lets the user choose which type of note to create.
function createNewNoteButton() {
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
//what the createNewNoteButton contains
function buttonContent() {
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
    saveNotesToLocalStorage();
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
    saveNotesToLocalStorage();
  });
}


//constructor of note object 
function Note(type) {
  this.noteType = type;
  this.date = addDate();
  this.titleOfNoteBook = openNotebook;
  this.addingFromLocalStorage = function (
    date,
    savedNoteBookPlacment,
    savedTextarea
  ) {
    if (date != null) {
      this.date = date;
    }
    if (savedNoteBookPlacment != null) {
      this.titleOfNoteBook = savedNoteBookPlacment;
    } else {
      this.titleOfNoteBook = openNotebook;
    }
    if (savedTextarea != "" && type == 1) {
      this.noteElement.getElementsByClassName(
        "textArea"
      )[0].textContent = savedTextarea;
    }
  };

  this.noteElement = createNote(this, type);
  main.prepend(this.noteElement);

  this.checkBox = document.createElement("input");
  this.checkBox.type = "checkbox";
  this.checkBox.style.display = "none";
  this.checkBox.className = "checkbox";
  this.noteElement.appendChild(this.checkBox);
  this.delete = false;

  this.getNoteLi = function () {
    if (this.noteType == 2) {
      let arrayOfInnerText = [];
      let listItemsArray = this.noteElement.getElementsByClassName(
        "itemOfList"
      );

      for (let index = 0; index < listItemsArray.length; index++) {
        arrayOfInnerText.push(listItemsArray[index].innerText);
      }
      arrayOfInnerText.toString();
      return arrayOfInnerText;
    }
  };

  //om du kan mata varje string som newNext från local sätter denna dit dom en i taget
  this.setNewLi = function (newText) {
    if (this.noteType == 2) {
      let node = this.noteElement.getElementsByClassName("list");
      let listItemContainer = document.createElement("div");
      listItemContainer.className = "list-item-container";
      let node_li = document.createElement("li");
      node_li.contentEditable = "true";
      node_li.className = "itemOfList";
      let textnode = document.createTextNode(newText);
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "remove-list-item";
      span.addEventListener("click", () => {
        listItemContainer.remove();
        saveNotesToLocalStorage();
      });
      span.appendChild(txt);
      node_li.appendChild(textnode);
      listItemContainer.appendChild(node_li);
      listItemContainer.appendChild(span);
      node[0].appendChild(listItemContainer);
      return node;
    }
  };
  this.getNoteText = function () {
    if (this.noteType == 1) {
      return this.noteElement.getElementsByClassName("textArea")[0].textContent;
    }
  };
  this.setTitleOfNoteBook = (title) => {
    this.titleOfNoteBook = title;
  };

  this.checkBoxVisible = function (choise) {
    if (choise == true) {
      return (this.checkBox.style.display = "block");
    } else if (choise == false) {
      return (this.checkBox.style.display = "none");
    }
  };

  this.removeNote = function () {
    this.noteElement.remove();
    this.delete = true;
    clearDeleted();
    saveNotesToLocalStorage();
  };
}
// save notes data to local storage
function saveNotesToLocalStorage() {
  let holdsLocalStorageNotes = [];
  allNotes.forEach((element) => {
    element.getNoteText();

    let temporaryVarForTextContent = "";
    if (element.getNoteText() != "") {
      temporaryVarForTextContent = element.getNoteText();
    }

    let liFromObjArray = element.getNoteLi();

    holdsLocalStorageNotes.push(
      element.noteType,
      element.titleOfNoteBook,
      element.date,
      temporaryVarForTextContent
    ); //fix here

    if (element.noteType == 2) {
      liFromObjArray.forEach((element) => {
        holdsLocalStorageNotes.push(element);
      });
    }

    holdsLocalStorageNotes.push("//");
  });

  toString(holdsLocalStorageNotes);

  localStorage.setItem("notes", holdsLocalStorageNotes);

  // maby add a call in remove notes to jsut to keep in current
}

//Creates notes when page is loaded from local storage
function makeNotesFromLocalStorage() {
  
  let noteBookBelongingToNote = "";
  let noteOrListType = "";
  let dateOfCreatedNote = "";
  let noteTosave = [];
  const endOfSavedNoteSymbol = "//";

  openNotebook = localStorage.getItem("lastVisitedNoteBook");

  if (getLocalStorageListsToArray("notes") != null) {
    getLocalStorageListsToArray("notes").forEach((element) => {
      // creates notes

      if (element == endOfSavedNoteSymbol && noteTosave[0] == 1) {
        noteOrListType = noteTosave[0];
        noteBookBelongingToNote = noteTosave[1];
        dateOfCreatedNote = noteTosave[2];

        let noteTextarea = noteTosave[3];
        let temporaryHolderOfNoteObj = new Note(noteOrListType);

        temporaryHolderOfNoteObj.addingFromLocalStorage(
          dateOfCreatedNote,
          noteBookBelongingToNote,
          noteTextarea
        );
        allNotes.push(temporaryHolderOfNoteObj);
        noteTosave = [];
      }

      if (element == endOfSavedNoteSymbol && noteTosave[0] == 2) {
        // creates note lists

        noteOrListType = noteTosave[0];
        noteBookBelongingToNote = noteTosave[1];
        dateOfCreatedNote = noteTosave[2];

        let temporaryHolderOfListObj = new Note(noteOrListType);
        temporaryHolderOfListObj.addingFromLocalStorage(
          dateOfCreatedNote,
          noteBookBelongingToNote,
          ""
        );
        for (let index = 4; index < noteTosave.length; index++) {
          temporaryHolderOfListObj.setNewLi(noteTosave[index]);
        }

        allNotes.push(temporaryHolderOfListObj); //when fixed sent the rest of array into notes
        noteTosave = [];
      }

      if (element != "//") {
        noteTosave.push(element);
      }
    });
  }
}
//used to get any key values from local storage and converts them to a array
function getLocalStorageListsToArray(key) {
  if (localStorage.getItem(key) != null) {
    let arrayToHoldkeyList = localStorage.getItem(key);
    arrayToHoldkeyList = arrayToHoldkeyList.split(",");

    return arrayToHoldkeyList;
  }
}

//creates article element and calls all functions needed to create a note
function createNote(obj, type ) {
  let article = document.createElement("article");
  article = articleAttributes(article);
  article.appendChild(createDiv1(obj));
  article.appendChild(createDiv2(type, article));
  article.appendChild(createBtnConfirm());
  return article;
}

//set attributes to article 
function articleAttributes(article) {
  article.className = "note shadow-sm";
  article.id = "note-article";
  return article;
}

//creates a div that holds date , delete and change note book  buttons
function createDiv1(obj) {
  let div1 = document.createElement("div");
  div1.className = "note-buttons-top";
  div1.appendChild(addBooksToNote(obj));
  div1.appendChild(createP(obj));
  div1.appendChild(createBtnDelete(obj));
  return div1;
}

//creates p element that displays the date
function createP(obj) {
  let p = document.createElement("p");
  p.className = "date";
  p.innerText = obj.date;
  return p;
}

//Button for deleting  note
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

//The image for createBtnDelete button
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

//Create div that holds the content for the note
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
    input.placeholder = "Add to list";

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
    div2.appendChild(node);

    input.addEventListener("keypress", function (event) {
      let e = event;
      if (
        e.code === "Enter" &&
        document.getElementsByClassName("list-input")[0].value != ""
      ) {
        addListItemOnClick();
      }
    });

    function addListItemOnClick() {
      if (input.value.length > 0) {
        let listItemContainer = document.createElement("div");
        listItemContainer.className = "list-item-container";
        let node_li = document.createElement("li");
        node_li.contentEditable = "true";
        node_li.className = "itemOfList";
        let textnode = document.createTextNode(input.value);
        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "remove-list-item";
        span.addEventListener("click", () => {
          listItemContainer.remove();
          saveNotesToLocalStorage();
        });
        span.appendChild(txt);
        node_li.appendChild(textnode);
        listItemContainer.appendChild(node_li);
        listItemContainer.appendChild(span);
        node.prepend(listItemContainer);

        div2.appendChild(node);
        document.getElementsByClassName("list-input")[0].value = "";
        saveNotesToLocalStorage();
      }
    }
    button.addEventListener("click", addListItemOnClick);
  }
  return div2;
}
//Creates a button to confirm note changes
function createBtnConfirm() {
  let btnConfirm = document.createElement("button");
  btnConfirm.className = "note-button note-button-bottom";
  btnConfirm.addEventListener("click", function () {
    saveNotesToLocalStorage();
  });
  btnConfirm.appendChild(createImgConfirm());
  return btnConfirm;
}

//Image for createBtnConfirm function
function createImgConfirm() {
  let imgConfirm = document.createElement("img");
  imgConfirm.src = "media/check.svg";
  imgConfirm.alt = "confirm button";
  imgConfirm.width = "32";
  imgConfirm.height = "32";
  imgConfirm.title = "Confirm";
  return imgConfirm;
}

//creates dateobj from current date and binds it to the note obj
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

//Creates a drop-down menu for the note 
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
//Adds a list of note books to dropdown of addBooksToNote and a checkbox to move multiple notes.
function addBooksToDropDown(obj, dropDownContent) {
  let closeButton = document.createElement("button");
  let closeButtonIcon = document.createElement("img");

  dropDownContent.appendChild(closeButton);
  closeButton.className = "note-button close-btn-dropdown";
  closeButton.addEventListener("click", () => {
    dropDownContent.style.display = "none";
  });

  closeButton.appendChild(closeButtonIcon);
  closeButtonIcon.src = "media/x.svg";
  closeButtonIcon.height = "18";
  closeButtonIcon.width = "18";
  closeButtonIcon.alt = "Close dropdown";
  closeButtonIcon.title = "close";
  closeButtonIcon.className = "close-btn-dropdown-img";

  for (let i = 0; i < existingNoteBooks.length; i++) {
    let li = document.createElement("li");
    li.className = "dropdown-li";
    let option = document.createElement("a");

    option.href = "#";
    option.className = "dropdown-option dropdown-a";
    option.textContent = existingNoteBooks[i].getTitle();

    option.addEventListener("click", (element) => {
      if (obj.checked == true || obj.checkBox.style.display == "none") {
        obj.setTitleOfNoteBook(element.target.innerText);
        saveNotesToLocalStorage();
        globalUpdate();
      }

      allNotes.forEach((element) => {
        if (element.checkBox.checked == true) {
          element.titleOfNoteBook = existingNoteBooks[i].getTitle();
          element.checkBox.checked = false;
          saveNotesToLocalStorage();
          globalUpdate();
        }
      });

      dropDownContent.style.display = "none";
    });

    li.appendChild(option);

    dropDownContent.appendChild(li);
  }

  let selectToMove = document.createElement("button");
  selectToMove.textContent = "SELECT MORE";
  selectToMove.className =
    "btn btn-outline-secondary btn-sm btn-block dropdown-btn";
  selectToMove.addEventListener("click", () => {
    moveSelected(true);
  });

  dropDownContent.appendChild(selectToMove);
  closeOnClickOutside(obj, dropDownContent);
}
//Functions that closes note drop down from addBooksToNote when clicked outside 
function closeOnClickOutside(obj, dropDownContent) {
  document.addEventListener("click", (event) => {
    let target = event.target;
    do {
      if (obj.noteElement == target) {
        return;
      }
      target = target.parentNode;
    } while (target);
    dropDownContent.style.display = "none";
  });
}
//Clears list of notebooks in dropdwon menue
function clearNoteDropDown() {
  document.querySelectorAll(".close-btn-dropdown").forEach((e) => e.remove());
  document.querySelectorAll(".dropdown-li").forEach((e) => e.remove());
  document.querySelectorAll(".dropdown-btn").forEach((e) => e.remove());
}
//moves selected element to new notebook
function moveSelected(bool) {
  allNotes.forEach((element) => {
    element.checkBoxVisible(bool);
  });
}

window.addEventListener("DOMContentLoaded", init());
