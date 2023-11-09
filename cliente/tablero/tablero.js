class Tablero{
    constructor(){
        this.columnas = 10
        this.filas = 20
        this.lado_celda = 25
        this.ancho = this.columnas * this.lado_celda
        this.alto = this.filas * this.lado_celda
        this.posicion = createVector(MargenTablero, MargenTablero);
    }
     coordenada(x,y){
        return createVector(x,y).mult(this.lado_celda).add(this.posicion)
    }
    dibujarTablero(){
        push()
        noStroke()
        for(let columna = 0; columna < this.columnas; columna ++){
            for(let fila = 0; fila < this.filas; fila++){
                if((columna+fila)%2==0){
                    fill("white")
                }else{fill("#fff8e7")}

             // Calcula la posición (x, y) de la esquina superior izquierda de la celda
              let c = this.coordenada(columna, fila)
              rect(c.x,c.y,this.lado_celda)

    
        }
    }
    pop()
}
}