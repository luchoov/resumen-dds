const sequelize = require("./db");
const Usuario = require("./usuario");

async function crearUsuarios(){

  //Crear usuario Juan Perez
  const datosJuanPerez = {
      nombre: "Juan",
      apellido: "Perez",
      usuario: "jperez",
      password: "MiPwd%%$$W",
      email: "jperez@gmail.com",
  };
  const juanPerez = await Usuario.create(datosJuanPerez);
  console.log("Usuario creado ID:", juanPerez.id);

  //Crear usuario María García 
  const datosMariaGarcia = {
      nombre: "Maria",
      apellido: "García",
      usuario: "mgarcia",
      password: "Pwd%%$$Wss",
      email: "mgarcia@gmail.com",
  };
  const mariaGarcia = await Usuario.create(datosMariaGarcia);
  console.log("Usuario creado ID:", mariaGarcia.id);
}

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

  crearUsuarios();  

};

main();
