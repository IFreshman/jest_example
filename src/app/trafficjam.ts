export class TrafficJam {
    traffic: string
    loadCargo: string
    trafficArray: string[]

    constructor(queue?: string){
        if(!queue){
            return
        } else if(!queue.split('').every(el => map.get(el))){
            throw new Error
        } 

        this.traffic = this.getTraffic(queue)
    }

    getTraffic(queue: string){
        let splitTraffic = []

        for(let vehicle of queue.split('')){
            splitTraffic.push(map.get(vehicle))
        }        

        this.trafficArray = [...splitTraffic]

        return splitTraffic.join(' ')
    }

    print(){
        return this.traffic
    }

    fillCargo(){
        let state = false
        if(this.loadCargo && (this.loadCargo != this.traffic)){
            this.traffic = this.loadCargo
            state = true 
        }

        if(this.trafficArray.filter(el => el.includes("_")).length > 0){
            let getNextCargo =  this.trafficArray.findIndex(el => el.includes("_"))
            this.trafficArray[getNextCargo] = this.trafficArray[getNextCargo].replace(/_/g, "#")
            
            this.loadCargo = this.trafficArray.join(" ")
            state = true
        } 

        return state
    }

    removeFirst(){
        return this.traffic = [...this.trafficArray.slice(1)].join(" ")
    }

    removeLast(){
        return this.traffic = [...this.trafficArray.slice(0, this.trafficArray.length - 1)].join(" ")
    }
}

const map = new Map([
    [ "C",  '/OO\\'], 
    [ "B", "-/OOOO\\"], 
    [ "P", "/O\\__"],
    [ "T", "/O|___"]
])