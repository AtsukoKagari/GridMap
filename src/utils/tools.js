
export function windowToCanvas(x, y, canvas){
    var box = canvas.getBoundingClientRect();
    return {
        x: x - box.left - (box.width - canvas.width) / 2,
        y: y - box.top - (box.height - canvas.height) / 2
    };
}

export function UniqueId(){
 let stamp = new Date().getTime();
 return (((1+Math.random())*stamp)|0).toString(16)
}