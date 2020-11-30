



function createElementType(type/*  1 for note 2 for list*/){//creates a element with values depending on the type and adds to page 'Fredrik
    
    var mainWindow = document.getElementById("placeholder");// add div wich is gonna hold all elements
    var newElement = document.createElement("div");
    
    

    newElement.setAttribute("style","background-color: yellow; height: 200px; width:200px; margin:200px; text-align:center");
    newElement.setAttribute("height", "100px");
    

    if(type ==1){
        var text = prompt("add text here")
        newElement.textContent = text;
    }


    mainWindow.appendChild(newElement);


    
}