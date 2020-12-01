



function createElementType(type/*  1 for note 2 for list*/){//creates a element with values depending on the type and adds to page 'Fredrik
    
    var mainWindow = document.getElementById("test");// add div wich is gonna hold all elements
    var newElement = document.createElement("div");
    
    
    newElement.setAttribute("class","newElement")
    
    if(type ==1){
        var text = document.createElement("textarea")
        text.setAttribute("class","textAreaToNewElement")
        newElement.appendChild(text)
    }


    mainWindow.appendChild(newElement);


    
}