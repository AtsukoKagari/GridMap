/*
Responsible for controlling the switch of the listener
*/
import OC from "../Options.js"
import Mouse from "./MouseListener.js"
import {OnResize} from "./basicListener.js"

var options = OC.options

export class ListenerController{
    constructor(gridClass, camera, map, item){
        this.gridClass = gridClass
        this.camera = camera
        this.map = map
        this.item = item
        if(options.FullScreen){
            Mouse.RegisterFullScreenShow(this.gridClass, this.camera, this.map, this.item)
        }

        if(options.Drag){
            Mouse.RegisterGragEvent(this.gridClass, this.camera, this.map, this.item)
        }

        if(options.Scale){
            Mouse.RegisterScaleEvent(this.gridClass.GridMap_Canvas, this.camera, this.map, this.item)
            Mouse.RegisterScaleEvent(this.gridClass.GridMap_Canvas_Full, this.camera, this.map, this.item)
        }

        OnResize(gridClass, camera, map, item)

    }

    UnRegisterFullScreen(){
        options.FullScreen = false
        Mouse.UnRegisterFullScreenShow(this.gridClass)
    }

    UnRegisterDrag(){
        options.Drag = false
        Mouse.UnRegisterGragEvent()
    }

    UnRegisterScale(){
        options.Scale = false
        Mouse.UnRegisterScaleEvent(this.gridClass.GridMap_Canvas)
        Mouse.UnRegisterScaleEvent(this.gridClass.GridMap_Canvas_Full)
    }
}