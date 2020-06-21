import OC from "./Options.js"
import {Map} from "./map/map.js"
import {gridClass} from "./map/gridClass.js"
import {Camera} from "./Camera/camera.js"
import {ListenerController} from "./Listener/ListenerController.js"
import {gridMap} from "./grid/grid.js"
import {Item} from "./Item/item.js"
import {ExtensionController} from "./Extension/ExtensionController.js"
export class GridController{
    constructor(div, options){
        OC.setOptions(options)
        this.gridClass = new gridClass(div)
        this.Map = new Map()
        this.Item = new Item()
        this.Camera = new Camera()
        this.Ext = new ExtensionController(this)
        this.ListenerController = new ListenerController(this.gridClass, this.Camera, this.Map, this.Item)
    }

    addMap(mapinfo){
        this.Map.addMapInfo(mapinfo)
    }

    removeMap(id){
        if(id == null){
            this.Map.removeAll()
        } else{
            this.Map.removeMapInfo(id)
        }
    }

    addItems(itemsInfo){
        this.Item.addItemInfo(itemsInfo)
    }
    
    removeItem(id){
        this.Item.removeItem(id)
    }

    refresh(){
        let xy = this.Camera.getPos()  
        gridMap(this.gridClass.showCanvas, xy[0], xy[1], this.Camera.getScale(), this.Map.getMapInfo().concat(this.Item.getItemsInfo()))
    }

    showGrid(size){
        if(size != null){
            OC.setOptions({
                "needGrid": true,
                "GirdSize": size
            })
        } else {
            OC.setOptions({
                "needGrid": true,     
            })
        }
    }

    hiddenGrid(){
        OC.setOptions({
            "needGrid": false
        })
    }

}