const { SecretManagerServiceClient } = require('@google-cloud/secretmanager');

// Crear instancia de SecretManagerServiceClient
const client = new SecretManagerServiceClient();



//CAMBIAR LO DE NUMEROPROYECTO

// Función para acceder a la nueva clave secreta de correo electrónico
async function accessCorreoElectronico() {
    const nombre = 'projects/numeroproyecto/secrets/CORREO_ELECTRONICO/versions/1';
    const [version] = await client.accessSecretVersion({
        name: nombre,
    });
    const correo = version.payload.data.toString('utf8');
    return correo;
}

// Función para acceder a la clave CLAVECORREO
async function accessCLAVECORREO() {
    const nombre = 'projects/numeroproyecto/secrets/CLAVECORREO/versions/1';
    const [version] = await client.accessSecretVersion({
        name: nombre,
    });
    const datos = version.payload.data.toString('utf8');
    return datos;
}

// Método obtenerOptions actualizado para incluir la llamada a accessCorreoElectronico
module.exports.obtenerOptions = async function(callback) {
    let options = { user: '', pass: '' };
    options.user = await accessCorreoElectronico();
    options.pass = await accessCLAVECORREO();
    callback(options);
};
           