function menuToggle(){
    var menu = document.querySelector('.menuIcon');
    menu.classList.toggle('active')
}



function createElementType(type/*  1 for note 2 for list*/){//creates a element with values depending on the type and adds to page 'Fredrik
    
    var mainWindow = document.getElementById("placeholder");// add div wich is gonna hold all elements
    var newElement = document.createElement("div");
    
    
    newElement.setAttribute("class","newElement")
    
    if(type ==1){
        var text = document.createElement("textarea")
        text.setAttribute("class","textAreaToNewElement")
        newElement.appendChild(text)
    }


    mainWindow.appendChild(newElement);


    
}

//Skapar ett nytt datum-objekt och lägger till dagens datum till en ny anteckning i formatet yyyy-mm-dd
//OBS! än så länge ändrar den bara på prototyp-anteckningen
function addDate () {
  let date = document.getElementById("date");
  let noteDate = new Date();
  let year = noteDate.getFullYear();
  let month = noteDate.getMonth();
  let day = noteDate.getDay();
  if (day < 10) {
      day = `0${day}`
  }
  date.innerText = `${year}-${month}-${day}`
  
}
