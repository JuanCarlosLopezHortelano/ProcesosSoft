const correo=require("./email.js");
const nodemailer = require('nodemailer');

// URL de tu aplicación, puede ser local o la URL de despliegue
const url = "http://localhost:3000/";
// const url = "tu-url-de-despliegue";

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Servicio de correo a utilizar (en este caso, Gmail)
  auth: {
    user: 'juancarlosl.h.01@gmail.com', // Tu dirección de correo electrónico
    pass: 'ejfx lemy fovv spvg' // Tu contraseña o clave de aplicación generada en Gmail
  }
});

// Función para enviar un correo electrónico
module.exports.enviarEmail = async function(direccion, key, mensaje) {
  const result = await transporter.sendMail({
    from: 'juancarlosl.h.01@gmail.com', // Dirección de correo remitente
    to: direccion, // Dirección de correo destinatario
    subject: mensaje, // Asunto del correo
    text: 'Pulsa aquí para confirmar cuenta', // Texto del correo (opcional)
    html: `<p>Bienvenido a Sistema</p>
           <p><a href="${url}confirmarUsuario/${direccion}/${key}">Pulsa aquí para confirmar cuenta</a></p>`
    // Mensaje HTML, donde `${url}` se reemplaza con la URL de confirmación.
  });
};
