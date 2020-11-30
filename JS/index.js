



function createNoteElement(){
    
    var mainWindow = document.getElementById("Placeholder : put div id to add the element to");
    var newNoteElement = document.createElement("div");
    var text = prompt("write text")
    

    newNoteElement.setAttribute("style","background-color: yellow; height: 200px; width:200px; margin:200px; text-align:center");
    newNoteElement.setAttribute("height", "100px");
    newNoteElement.textContent = text;


    mainWindow.appendChild(newNoteElement);


    
}