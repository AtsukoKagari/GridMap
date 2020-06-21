import {UniqueId} from "../utils/tools.js"

const itemInfo = Symbol('itemInfo')

export class Item{
    constructor(info){
        this[itemInfo] = []
        if(info != null){
            addItemInfo(info)
        }
    }

    addItemInfo(items){
        items.forEach(item => {
            let unique = true
            if(!item.hasOwnProperty('id')){
                console.error("[warning]You need a item id.")
                item.id = UniqueId()
            } else {
                for(let i=0;i<this[itemInfo].length;i++){
                    if(this[itemInfo][i].id == item.id){
                        console.error("[error]Item id must be unique.")
                        unique = false
                        break;
                    }
                }
            }
            // not a unique id
            if(!unique){
                return;
            }
            let itemMap = {}
            for (let k in item) {
                if (k.toLowerCase() == "position") {
                    let data = item[k].split(",");
                    if (data.length != 2) {
                        console.warn("[Warning]Map position has invalid,must be only 2 dimension");
                        continue;
                    }
                    itemMap["x"] = data[0]
                    itemMap["y"] = data[1]
                    continue;
                }
                if (k.toLowerCase() == "size") {
                    let data = item[k].split(",");
                    if (data.length != 2) {
                        console.warn("[Warning]Map size has invalid,must be only 2 dimension");
                        continue;
                    }
                    itemMap["sizeX"] = data[0]
                    itemMap["sizeY"] = data[1]
                    continue;
                }
                itemMap[k] = item[k]
            }
            if (!(itemMap["x"] && itemMap["y"] && itemMap["sizeX"] && itemMap["sizeY"])) {
                console.error("[Error]Each item info must has position and size.");
                return;
            }
            // Default item is a collision.
            if(!item.hasOwnProperty('collision')){
                item.collision = true
            }
            this[itemInfo].push(itemMap)
        });
    }

    removeItem(id){
        for(let i=this[itemInfo].length - 1;i >=0;i++){
            if(this[itemInfo][i].id == id){
                this[itemInfo].splice(i, 1)
                break
            }
        }
    }

    getItemsInfo(){
        return this[itemInfo]
    }

    getItem(id){
        for(let i=this[itemInfo].length - 1;i >=0;i++){
            if(this[itemInfo][i].id == id){
                return this[itemInfo][i]
            }
        }
    }
}