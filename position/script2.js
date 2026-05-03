

let car = {
    plaque : "123456",
    print : function(kilometres){
        console.log("this is a car " + this.plaque + " / kilometres : " + kilometres)
    }
}

car.print(25);

class Car {
    constructor(plaque, conso , siege = {type:"cuir", nombre : 4} ){
        this.conso = conso // Litre au 100Km
        this.plaque = plaque
        this.siege = siege
    }
    print(){
        console.log("-------------------------------------")
        console.log("Plaque : " + this.plaque)
        console.log("Siege en " + this.siege.type + " / Nombre : " + this.siege.nombre)
        console.log("-------------------------------------")

    }
    consoForDistance(distance) {
        return distance * this.conso / 100
    }

    distanceBXNamur(){
        return this.consoForDistance(40)
    }


}

let bmw = new Car("Bmw" ,5, {type:"cuir", nombre : 4})
console.log("Conso BX - Namur : " + bmw.distanceBXNamur())

console.log(bmw)