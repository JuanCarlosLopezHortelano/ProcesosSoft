
const mongo=require("mongodb").MongoClient;
const ObjectId=require("mongodb").ObjectId;

function CAD(){
    this.usuarios;
    

    this.conectar=async function(callback){
        let cad=this;
        let client= new mongo("mongodb+srv://juancarloslhhellin:78pDSRTsC68GCFvW@proyectossoft.gzwcn2s.mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database=client.db("sistema");
        cad.usuarios=database.collection("usuarios");
        callback(database);
        }
}
module.exports.CAD=CAD;
