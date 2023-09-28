const fs=require("fs");
const express = require('express');
const app = express();
const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + "/"));


// Nueva función app.get("/")
app.get("/", function(request,response){
    // Leer el contenido del archivo index.html
    var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  
    // Establecer el tipo de contenido de la respuesta
    response.setHeader("Content-type","text/html");
  
    // Enviar la respuesta
    response.send(contenido);
  });


  app.listen(PORT, () => {
console.log(`App está escuchando en el puerto ${PORT}`);
console.log('Ctrl+C para salir');
});
