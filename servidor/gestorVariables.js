const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();


async function accessCLAVECORREO() {
     const name = 'projects/937465366567/secrets/CLAVECORREO/versions/1';

   
      const [version] = await client.accessSecretVersion({
        name: name,
      });
      const datos = version.payload.data.toString('utf8');
      
      console.log("Datos "+datos);

      return datos;
    } 
    
  

  async function accessCORREO_GMAIL() {
    const name = 'projects/937465366567/secrets/CORREO_GMAIL/versions/1';
  
    
      const [version] = await client.accessSecretVersion({
        name: name,
      });
      const datos = version.payload.data.toString('utf8');
      return datos;

    } 
  


  module.exports.obtenerOptions = async function(callback) {
    const options = { user: '', pass: '' }; //juancarloslhhellin@gmail.com
    
    
    
    let pass = await accessCLAVECORREO();

    let correo = await accessCORREO_GMAIL();



      options.user = correo;
      console.log(correo)
      options.pass = pass;
      console.log(pass)

    callback(options);
  }