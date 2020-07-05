import {GridController} from "./GridController.js"

export function init(div, options){
    return new GridController(div, options)
}

export var GridMap = new Object();

GridMap.init = init

window.GridMap = GridMap

if(typeof window !== 'undefined' && window.Vue){
    window.Vue.component('segredo-gridmap', GridMap)
}

export default {
    init
}