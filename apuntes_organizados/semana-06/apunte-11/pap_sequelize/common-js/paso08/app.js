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

  //Crear usuario Daniel Taborda
  const datosDanielTaborda = {
      nombre: "Daniel",
      apellido: "Taborda",
      usuario: "dtaborda",
      password: "xx$$Pwd%%$$W",
      email: "dtaborda@gmail.com",
  };
  const danielTaborda = await Usuario.create(datosDanielTaborda);
  console.log("Usuario creado ID:", danielTaborda.id);

  //Crear usuario Diana Muller 
  const datosDianaMuller = {
      nombre: "Diana",
      apellido: "Muller",
      usuario: "dmuller",
      password: "gg99wd%%Wss",
      email: "dmuller@gmail.com",
  };
  const dianaMuller = await Usuario.create(datosDianaMuller);
  console.log("Usuario creado ID:", dianaMuller.id);
}

async function recuperarUsuarios(){
  // Recuperar todos los usuarios
  const usuarios = await Usuario.findAll();
  usuarios.forEach((u) => {
      console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`);
  });
}

async function recuperarUsuario(id){
    const u = await Usuario.findOne({ where: { id: id } });
    console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`);
}

async function actualizarUsuario(id, nombre){
  const u = await Usuario.findOne({ where: { id: id } });
  if (u){
    u.nombre = nombre;
    await u.save();
  }
}

async function eliminarUsuario(id){
  const u = await Usuario.findOne({ where: { id: id } });
  if (u){
    await u.destroy();
  }
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

  // crearUsuarios();  
  // recuperarUsuarios();
  // recuperarUsuario(3);i
  // actualizarUsuario(4, "nuevonombre");
  eliminarUsuario(4);
};

main();
