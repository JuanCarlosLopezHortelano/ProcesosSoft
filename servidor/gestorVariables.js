const {SecretManagerServiceClient} = require('@google-cloud/secretmanager');
const client = new SecretManagerServiceClient();


async function accessCLAVECORREO() {
    const name = 'projects/moonlit-text-402117/secrets/CLAVECORREO/versions/1';
  
    try {
      const [version] = await client.accessSecretVersion({
        name: name,
      });
      const datos = version.payload.data.toString('utf8');
      return datos;
    } catch (error) {
      console.error(`Error al acceder al secreto: ${error.message}`);
      return null;
    }
  }

  module.exports.obtenerOptions = async function(callback) {
    let options = { user: 'juancarloslhhellin@gmail.com', pass: '' };
    const pass = await accessCLAVECORREO();
    if (pass) {
      options.pass = pass;
    } else {
      console.error('Error al obtener la clave de correo.');
    }
    callback(options);
  }