/*
    碰撞相关的内容
*/

export function CollisionCheck(item, info, x, y){
    let isColl = true;
    for (let i = 0; i < info.length; i++) {
        if (info[i].id != item.id && info[i].collision && info[i].collision != false) {
            let mapitem = info[i]
            // 需要进行碰撞检测
            let Lx = Math.abs((parseFloat(x) * 2 + parseFloat(item.sizeX)) / 2 - (parseFloat(mapitem.x) * 2 + parseFloat(mapitem.sizeX)) / 2)
            let Ly = Math.abs((parseFloat(y) * 2 + parseFloat(item.sizeY)) / 2 - (parseFloat(mapitem.y) * 2 + parseFloat(mapitem.sizeY)) / 2)
            if (Lx <= (parseFloat(item.sizeX) + parseFloat(mapitem.sizeX)) / 2 && Ly <= (parseFloat(item.sizeY) + parseFloat(mapitem.sizeY)) / 2) {
                isColl = false
                break;
            }
        }
    }
    return isColl
}