const sequelize = require("./db");

async function main(){
  try{

    // Sincronizar la base de datos con el modelo
    await sequelize.sync(); 
    
    // Probar la conexión
    // await sequelize.authenticate();
    
    console.log("Base de Datos: lista");
  } 
  catch (error){
    console.error("Ha ocurrido un error: ", error);
  }

};

main();
