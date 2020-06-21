const x = Symbol('x')
const y = Symbol('y')
const scale = Symbol('scale')
const drag = Symbol('drag')
const focus = Symbol('focus')
const minscale = Symbol('minscale')
const maxscale = Symbol('maxscale')
const scaleRate = Symbol('scaleRate')

export class Camera{
    constructor(){
        this[x] = 0
        this[y] = 0
        this[scale] = 2
        this[drag] = true
        this[focus] = null
        this[minscale] = 0.5
        this[maxscale] = 5
        this[scaleRate] = 0.2
    }

    setPos(nx, ny){
        if(nx == null || ny == null){
            console.error("[error]to set Position must has x and y.")
            return
        }
        this[x] = parseFloat(nx)
        this[y] = parseFloat(ny)
    }

    getPos(){
        return [this[x], this[y]]
    }

    setPosX(nx){
        this[x] = parseFloat(nx)
    }

    setPosY(ny){
        this[y] = parseFloat(ny)
    }

    addPosX(ax){
        this[x] = this[x] + parseFloat(ax)
    }

    addPosY(ay){
        this[y] = this[y] + parseFloat(ay)
    }

    setScale(s){
        this[scale] = s
    }

    getScale(){
        return this[scale]
    }

    addScale(as){
        if(as == null){
            this[scale] = this[scale] + this[scaleRate] > this[maxscale] ? this[maxscale] : this[scale] + this[scaleRate]
        } else {
            this[scale] = this[scale] + parseFloat(as) > this[maxscale] ? this[maxscale] : this[scale] + parseFloat(as)
        }
    }

    minusScale(ms){
        if(ms == null){
            this[scale] = this[scale] - this[scaleRate] < this[minscale] ? this[minscale] : this[scale] - this[scaleRate]
        } else {
            this[scale] = this[scale] - parseFloat(ms) < this[minscale] ? this[minscale] : this[scale] - parseFloat(ms)
        }
    }

    setFocus(id){
        this[focus] = id
    }

    getFocus(){
        return this[focus]
    }

    setMinScale(ms){
        this[minscale] = parseFloat(ms)
    }

    getMinScale(){
        return this[minscale]
    }

    addMinScale(ams){
        this[minscale] = this[minscale] + parseFloat(ams)
    }

    setMaxScale(ms){
        this[maxscale] = parseFloat(ms)
    }

    getMaxScale(){
        return this[maxscale]
    }

    addMaxScale(ams){
        this[maxscale] = this[maxscale] + parseFloat(ams)
    }

    setScaleRate(rate){
        this[scaleRate] = parseFloat(rate)
    }

    getScaleRate(){
        return this[scaleRate]
    }

    addScaleRate(rate){
        this[scaleRate] = this[scaleRate] + parseFloat(rate)
    }

}