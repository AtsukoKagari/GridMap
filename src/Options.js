/*
Configure global parameters
*/

var options = {
    "FullScreen": true,  // to turn on full screen
    "Drag": true,
    "Scale": true,
    "boxColor": "#FFFF99",   // Default map block color
    "collision": true,
    "needGrid": false,
    "GridSize": 200, 
}

function setOptions(option){
    for(let o in option){
        options[o] = option[o]
    }
}

export default{
    options,
    setOptions
}