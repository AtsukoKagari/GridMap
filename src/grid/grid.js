/*
核心功能：绘制地图实现
*/
import Options from "../Options.js"

var options = Options.options

var firstPaint = true

export function gridMap(canvas, cameraX, cameraY, cameraScale, info){
    let tempCanvas = document.createElement('canvas'); // 新建一个 canvas 作为缓存 canvas
    let tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width; tempCanvas.height = canvas.height; // 设置宽高
    let left = cameraX - Math.floor(canvas.width / 2) * cameraScale;
    let right = left + canvas.width * cameraScale;
    let top = cameraY - Math.floor(canvas.height / 2) * cameraScale;
    let bottom = top + canvas.height * cameraScale;
    // 计算有多少个方格需要着色,以及转化成坐标
    let printList = []
    for (let i = 0; i < info.length; i++) {
        let printbox = {}
        let boxleft = parseInt(info[i].x), boxright = parseInt(boxleft) + parseInt(info[i].sizeX), boxtop = parseInt(info[i].y), boxbottom = parseInt(info[i].y) + parseInt(info[i].sizeY);
        // 如果有Image属性就直接减
        if (info[i].image != null) {
            printbox["x"] = (boxleft - cameraX) / cameraScale + (canvas.width / 2);
            printbox["y"] = (boxtop - cameraY) / cameraScale + (canvas.height / 2);
            printbox["sizeX"] = parseInt(info[i].sizeX) / cameraScale;
            printbox["sizeY"] = parseInt(info[i].sizeY) / cameraScale;
            for (let key in info[i]) {
                if (key != "x" && key != "y" && key != "sizeX" && key != "sizeY") {
                    printbox[key] = info[i][key]
                }
            }
            printList.push(printbox)
            continue;
        }
        // 左上角在图内
        if (left < boxleft && right > boxleft && top < boxtop && bottom > boxtop) {
            printbox["x"] = (boxleft - cameraX) / cameraScale + (canvas.width / 2);
            printbox["y"] = (boxtop - cameraY) / cameraScale + (canvas.height / 2);
            // 右
            if (right > boxright) {
                printbox["sizeX"] = parseInt(info[i].sizeX) / cameraScale;
            } else {
                printbox["sizeX"] = (right - boxleft) / cameraScale;
            }
            // 下
            if (bottom > boxbottom) {
                printbox["sizeY"] = parseInt(info[i].sizeY) / cameraScale;
            } else {
                printbox["sizeY"] = (bottom - boxtop) / cameraScale;
            }
        } else if (left < boxleft && right > boxleft && top < boxbottom && bottom > boxbottom) {
            // 有5种情况左上角不在图内,左下角在图内的有2种
            printbox["x"] = (boxleft - cameraX) / cameraScale + (canvas.width / 2);
            printbox["y"] = 0;
            printbox["sizeY"] = (boxbottom - top) / cameraScale;
            // 右
            if (right > boxright) {
                printbox["sizeX"] = parseInt(info[i].sizeX) / cameraScale;
            } else {
                printbox["sizeX"] = (right - boxleft) / cameraScale;
            }
        } else if (left < boxright && right > boxright && top < boxtop && bottom > boxtop) {
            // 2种情况右上角在图内
            printbox["x"] = 0
            printbox["y"] = (boxtop - cameraY) / cameraScale + (canvas.height / 2);
            printbox["sizeX"] = (boxright - left) / cameraScale;
            // 下
            if (bottom > boxbottom) {
                printbox["sizeY"] = parseInt(info[i].sizeY) / cameraScale;
            } else {
                printbox["sizeY"] = (bottom - boxtop) / cameraScale;
            }
        } else if (left < boxright && right > boxright && top < boxbottom && bottom > boxbottom) {
            // 1种情况右下角在图内
            printbox["x"] = 0;
            printbox["y"] = 0;
            printbox["sizeX"] = (boxright - left) / cameraScale;
            printbox["sizeY"] = (boxbottom - top) / cameraScale;
        } else {
            //不在图内
            continue;
        }
        for (let key in info[i]) {
            if (key != "x" && key != "y" && key != "sizeX" && key != "sizeY") {
                printbox[key] = info[i][key]
            }
        }
        printList.push(printbox)
    }
    if(options.needGrid){
        let space = options.GridSize
        // 定义当前坐标
        let x = (canvas.width / 2) - cameraX / cameraScale
        let y = (canvas.height / 2) - cameraY / cameraScale
        while(x > 0){
            x -= space / cameraScale
        }
        while(y > 0){
            y -= space / cameraScale
        }
        // 设置虚线
        tempCtx.setLineDash([5,10])
        //绘制水平方向的网格线
        for(;y<canvas.height;y+=space/cameraScale){
            //开启路径
            tempCtx.beginPath()
            
            tempCtx.moveTo(0,y)
            tempCtx.lineTo(canvas.width,y)
            tempCtx.stroke()
        }
        //绘制垂直方向的网格线
        for(;x<canvas.width;x+=space/cameraScale){
            //开启路径
            tempCtx.beginPath()
            
            tempCtx.moveTo(x,0)
            tempCtx.lineTo(x,canvas.height)
            tempCtx.stroke()
        }    
    }

    let waitImageList = []
    // 绘图
    printList.forEach(p => {
        if (p.image != null) {
            waitImageList.push(p)
            // Image的大小取决于你的设置
            if (p.collision == false) {
                p.image.filter = 'alpha(opacity=40);'
            }
            if(firstPaint == true){
                p.image.onload = function(){
                    tempCtx.drawImage(p.image, p.x, p.y, p.sizeX, p.sizeY)
                }
            } else {
                tempCtx.drawImage(p.image, p.x, p.y, p.sizeX, p.sizeY)     
            }

        } else {
            // 自定义着色
            if (p.color != null) {
                tempCtx.fillStyle = p.color
                if (p.collision == false) {
                    let rgb = ColorToRGBA(p.color)
                    tempCtx.fillStyle = "rgba(" + rgb.join(",") + ",0.4)"
                } else {
                    tempCtx.fillStyle = p.color
                }
            } else {
                if (p.collision == false) {
                    let rgb = ColorToRGBA(options.boxColor)
                    tempCtx.fillStyle = "rgba(" + rgb.join(",") + ",0.4)"
                } else {
                    tempCtx.fillStyle = options.boxColor;
                }
            }
            tempCtx.fillRect(p.x, p.y, p.sizeX, p.sizeY)
        }
    });

    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(firstPaint == true){
        firstPaint = false
        var timer = setInterval(() => {
            let index =  true
            for(let i =0;i<waitImageList.length;i++){
                if(waitImageList[i].complete == false){
                    index =false
                    break
                }
            }
            if(index == true){
                ctx.drawImage(tempCanvas, 0, 0);
                clearInterval(timer)
            }
        }, 200);
    } else {
        ctx.drawImage(tempCanvas, 0, 0);
    }
    
    return true
}