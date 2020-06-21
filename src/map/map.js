const mapinfo = Symbol('mapinfo')

export class Map{
    constructor(info){
        this[mapinfo] = []
        if(info != null){
            addMapInfo(info)
        }
    }

    addMapInfo(map){
        for (let i = 0; i < map.length; i++) {
            let mapdict = {}
            for (let k in map[i]) {
                if (k.toLowerCase() == "position") {
                    let data = map[i][k].split(",");
                    if (data.length != 2) {
                        console.warn("[Warning]Map position has invalid,must be only 2 dimension");
                        continue;
                    }
                    mapdict["x"] = data[0]
                    mapdict["y"] = data[1]
                    continue;
                }
                if (k.toLowerCase() == "size") {
                    let data = map[i][k].split(",");
                    if (data.length != 2) {
                        console.warn("[Warning]Map size has invalid,must be only 2 dimension");
                        continue;
                    }
                    mapdict["sizeX"] = data[0]
                    mapdict["sizeY"] = data[1]
                    continue;
                }
                mapdict[k] = map[i][k]
            }
            if (!(mapdict["x"] && mapdict["y"] && mapdict["sizeX"] && mapdict["sizeY"])) {
                console.warn("[Warning]Each map info must has position and size.");
                continue;
            }
            this[mapinfo].push(mapdict);
        }
    }
    /*
    id: only can delete mapinfo contains id.
    */
    removeMapInfo(id){
        for(let i=this[mapinfo].length - 1;i >=0;i++){
            if(this[mapinfo][i].id == id){
                this[mapinfo].splice(i, 1)
            }
        }
    }

    removeAll(){
        this[mapinfo] = []
    }

    getMapInfo(){
        return this[mapinfo]
    }

}