import {moveItem} from "./move/transfer.js"

export class ExtensionController{
    constructor(controller){
        this.controller = controller
        this.moveItem = function(id, x , y, relateive){
            moveItem(id, x, y,this.controller, relateive)
        }
    }


}