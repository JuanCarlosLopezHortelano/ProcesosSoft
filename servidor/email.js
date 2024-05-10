
const gv = require('./gestorVariables.js');
const nodemailer = require('nodemailer');

// URL de tu aplicación, puede ser local o la URL de despliegue
const url = "http://localhost:3000/";
//const url = "https://procesossoft-yhkqrakm7q-ew.a.run.app/"; 

let options={
  user: "",
  pass: ""
}
let transporter;

module.exports.conectar=function(callback){
gv.obtenerOptions(function(res){ 

    //console.log(res)
    options=res;
    callback(res);  
})  
}


// Función para enviar un correo electrónico
module.exports.enviarEmail=async function(direccion, key,men) {
 /* const transporter = await transporter.sendMail({
      from: 'juancarloslhhellin@gmail.com',
      to: direccion,
      subject: 'Confirmar cuenta',
      text: 'Pulsa aquí para confirmar cuenta',
      html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
  }); */

  transporter=nodemailer.createTransport({
    service: 'gmail',
    
    auth:options
});

const result = await transporter.sendMail({
    from: 'juancarloslhhellin@gmail.com',
    to: direccion,
    subject: 'Confirmar cuenta',
    text: 'Pulsa aquí para confirmar cuenta',
    html: '<p>Bienvenido a Sistema</p><p><a href="'+url+'confirmarUsuario/'+direccion+'/'+key+'">Pulsa aquí para confirmar cuenta</a></p>'
});
console.log(JSON.stringify(result, null, 4));

}
