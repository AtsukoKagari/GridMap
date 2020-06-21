import Options from "../../Options.js"
import {CollisionCheck} from "./collision.js"

var options = Options.options

export function moveItem(id, x , y, controller, relative){
    let i = 0, index = false, item = null, items = controller.Item.getItemsInfo();
    for (i = 0; i < items.length; i++) {
        if (items[i].id == id) {
            item = items[i]
            break
        }
    }
    if(item == null){
        console.error("[error]could not found item which id=" + id)
        return
    }

    if(relative){
        x = item.x - x
        y = item.y - y
    }

    if(options.collision){
        index = CollisionCheck(item,  controller.Map.getMapInfo().concat(controller.Item.getItemsInfo()), x, y)
    }

    if(index){
        items[i].x = x;
        items[i].y = y;
        if(controller.Camera.getFocus() == id){
            controller.Camera.setPos(x, y)
        }
        controller.refresh()
    }
}

