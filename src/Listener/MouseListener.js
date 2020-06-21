/*
Register and unregister mouse listening
*/
import {gridMap} from "../grid/grid.js"
import {windowToCanvas} from "../utils/tools.js"
/*
@canvas:The canvas
@camera: class camera
@map: class map
*/
function RegisterScaleEvent(canvas, camera, map, item){
    canvas.onmousewheel = canvas.onwheel = function (event) {
        if (event.wheelDelta > 0) {
            // 放大
            camera.minusScale()
        } else {
            // 缩小
            camera.addScale()
        }
        let xy = camera.getPos()
        gridMap(canvas, xy[0], xy[1], camera.getScale(),  map.getMapInfo().concat(item.getItemsInfo()));
    }
}

function UnRegisterScaleEvent(canvas){
    canvas.onmousewheel = canvas.onwheel = null
}

/*
*/
function RegisterGragEvent(gridClass, camera, map, item){
    let dragging = false
    let lastestdragX = 0
    let lastestdragY = 0

    document.onmousedown = function (event) {
        let dragstartinfo = windowToCanvas(event.clientX, event.clientY, gridClass.showCanvas);
        if (dragstartinfo.x > 0 && dragstartinfo.x < gridClass.showCanvas.width && dragstartinfo.y > 0 && dragstartinfo.y < gridClass.showCanvas.height) {
            dragging = true;
            lastestdragX = dragstartinfo.x;
            lastestdragY = dragstartinfo.y;
        }
    };

    document.onmousemove = function (event) {
        if (dragging) {
            let draginfo = windowToCanvas(event.clientX, event.clientY, gridClass.showCanvas);
            camera.addPosX(-(draginfo.x - lastestdragX))
            camera.addPosY(-(draginfo.y - lastestdragY));
            let xy = camera.getPos()
            gridMap(gridClass.showCanvas, xy[0], xy[1], camera.getScale(), map.getMapInfo().concat(item.getItemsInfo()));
            lastestdragX = draginfo.x
            lastestdragY = draginfo.y
        }
    }

    document.onmouseup = function (event) {
        dragging = false;
        lastestdragX = 0;
        lastestdragY = 0;
    }
}

function UnRegisterGragEvent(){
    document.onmousedown = null
    document.onmousemove = null
    document.onmouseup = null
}

var ToDefault = null
var ToFullScreen = null

function RegisterFullScreenShow(gridClass, camera, map, item){
    ToDefault = () =>{
        FullScreen2Screen(gridClass, camera, map, item)
    }
    gridClass.GridMap_Canvas_Full.addEventListener("dblclick",ToDefault , false)
    ToFullScreen = () =>{
        Screen2FullScreen(gridClass, camera, map, item)
    }
    gridClass.GridMap_Canvas.addEventListener("dblclick", ToFullScreen, false)
}

function UnRegisterFullScreenShow(gridClass){
    gridClass.GridMap_Canvas.removeEventListener("dbclick", ToFullScreen)
    gridClass.GridMap_Canvas_Full.removeEventListener("dblclick",ToDefault)
}

function FullScreen2Screen(gridClass, camera, map, item) {
    let smallctx = gridClass.GridMap_Canvas.getContext('2d')
    let bigctx = gridClass.GridMap_Canvas_Full.getContext('2d')
    smallctx.clearRect(0, 0, gridClass.GridMap_Canvas.width, gridClass.GridMap_Canvas.height);
    bigctx.clearRect(0, 0, gridClass.GridMap_Canvas_Full.width, gridClass.GridMap_Canvas_Full.height);
    
    gridClass.showCanvas = gridClass.GridMap_Canvas

    let xy = camera.getPos()
    gridMap(gridClass.GridMap_Canvas, xy[0], xy[1], camera.getScale(),  map.getMapInfo().concat(item.getItemsInfo()));
    gridClass.GridMap_Canvas_Full_Div.style.display = "none"
}

function Screen2FullScreen(gridClass, camera, map, item){
    let smallctx = gridClass.GridMap_Canvas.getContext('2d')
    let bigctx = gridClass.GridMap_Canvas_Full.getContext('2d')
    smallctx.clearRect(0, 0, gridClass.GridMap_Canvas.width, gridClass.GridMap_Canvas.height);
    bigctx.clearRect(0, 0, gridClass.GridMap_Canvas_Full.width, gridClass.GridMap_Canvas_Full.height);

    gridClass.showCanvas = gridClass.GridMap_Canvas_Full
    let xy = camera.getPos()
    gridMap(gridClass.GridMap_Canvas_Full, xy[0], xy[1], camera.getScale(),  map.getMapInfo().concat(item.getItemsInfo()));
    GridMap_Canvas_Full_Div.style.display = ""
}

export default{
    RegisterGragEvent,
    UnRegisterGragEvent,
    RegisterScaleEvent,
    UnRegisterScaleEvent,
    RegisterFullScreenShow,
    UnRegisterFullScreenShow
}