import GridMap from "./GridMap.js"
let map = document.getElementById("map")
let image = new Image();
image.src = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592501604988&di=a2f6970585c0f30af469adb7e4834f4a&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D51636e0b7bcf3bc7e800cde4e101babd%2F8682db22720e0cf3e1a0dcfd0146f21fbf09aab5.jpg"
let gc = GridMap.init(map)
let mapinfo = []
for(let i=0;i < 10; i++){
    mapinfo.push({
        "position": `${i*100},${i*100}`,
        "size": "40, 40"
    })
}
gc.addMap(mapinfo)
gc.addItems([{
    "position": "200, 300",
    "size": "50, 50",
    "image": image,
    "id": 'character'
}])
gc.Camera.setFocus("character")
gc.refresh()
console.log(gc)
let showGrid = false

document.onkeydown = function(ev){
    var ev = ev || window.event;
    switch(ev.keyCode){
        case 37:
            gc.Ext.moveItem("character", 10, 0, true)
            break;
        case 38:
            gc.Ext.moveItem("character", 0, 10, true)
            break;
        case 39:
            gc.Ext.moveItem("character", -10, 0, true)
            break;
        case 40:
            gc.Ext.moveItem("character", 0, -10, true)
            break;
        case 13:
            if(showGrid){
                gc.hiddenGrid()
                showGrid = false
            } else {
                gc.showGrid()
                showGrid = true
            }
            gc.refresh()
    }
}