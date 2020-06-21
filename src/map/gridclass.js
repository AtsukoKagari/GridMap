/*
    Generate basic components such as canvas
*/
import Options from "../Options.js"

var options = Options.options

export class gridClass{
    constructor(div){
        if(div == null || div.constructor != HTMLDivElement){
            console.error('[error]The passed object is not a div element')
            return
        }
        this.div = div
        this.GridMap_Canvas = document.createElement('canvas');
        div.appendChild(this.GridMap_Canvas);
        this.GridMap_Canvas.width = div.offsetWidth;
        this.GridMap_Canvas.height = div.offsetHeight;
        this.GridMap_Canvas.id = "GridMap_Canvas"

        this.GridMap_Canvas_Full_Div = null
        this.GridMap_Canvas_Full = null

        if(options.FullScreen){
            this.addFullScreen()
        }
        this.showCanvas = this.GridMap_Canvas
    }

    addFullScreen(){
        this.GridMap_Canvas_Full_Div = document.createElement('div');
        this.GridMap_Canvas_Full_Div.width = document.body.offsetWidth;
        this.GridMap_Canvas_Full_Div.height = document.body.offsetHeight;
        this.GridMap_Canvas_Full_Div.id = "GridMap_Canvas_Full_Div"
        this.GridMap_Canvas_Full_Div.style.position = "absolute"
        this.GridMap_Canvas_Full_Div.style["z-index"] = 999
        this.GridMap_Canvas_Full_Div.style.backgroundColor = "white"
        this.GridMap_Canvas_Full_Div.style.display = "none"
        this.GridMap_Canvas_Full_Div.style.left = 0;
        this.GridMap_Canvas_Full_Div.style.top = 0;

        document.body.appendChild(this.GridMap_Canvas_Full_Div)
        this.GridMap_Canvas_Full = document.createElement('canvas');
        this.GridMap_Canvas_Full.width = this.GridMap_Canvas_Full_Div.width
        this.GridMap_Canvas_Full.height = this.GridMap_Canvas_Full_Div.height
        this.GridMap_Canvas_Full.id = "GridMap_Canvas_Full"
        this.GridMap_Canvas_Full_Div.appendChild(this.GridMap_Canvas_Full)
    }

    removeFullScreen(){
        this.GridMap_Canvas_Full.remove()
        this.GridMap_Canvas_Full_Div.remove()
    }
    
    

}