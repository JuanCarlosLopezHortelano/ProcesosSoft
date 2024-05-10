// testAccess.js
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessSecret(name) {
  try {
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    const datos = version.payload.data.toString('utf8');
    console.log(`Datos del Secreto (${name}):`, datos);
    console.log("funciona");
    return datos;
  } catch (error) {
    console.error(`Error al acceder al secreto (${name}): ${error.message}`);
    return null;
  }
}

(async function () {
  await accessSecret('projects/937465366567/secrets/CLAVECORREO');
  await accessSecret('projects/937465366567/secrets/CORREO_GMAIL');
})();
