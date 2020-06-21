import {gridMap} from "../grid/grid.js"
export function OnResize(gridClass, camera, map, item){
    window.onresize = function () {
        gridClass.GridMap_Canvas.width = gridClass.div.offsetWidth;
        gridClass.GridMap_Canvas.height = gridClass.div.offsetHeight;
        gridClass.GridMap_Canvas_Full.width = window.document.body.offsetWidth;
        gridClass.GridMap_Canvas_Full.height = window.document.body.offsetHeight;
        let xy = camera.getPos()
        gridMap(gridClass.showCanvas, xy[0], xy[1], camera.getScale(),  map.getMapInfo().concat(item.getItemsInfo()));
        }
}