//función principal:
function procesar() {
  const $correo = document.getElementById('email')
  const $sugerencia = document.getElementById('sug')
  
  if($sugerencia.value === ''){
    alert('La sugerencia no puede quedar vacía!')
    return;
  }

  if(!esCorreoValido($correo.value)){
    alert('Correo incorrecto')
    return;
  }

  alert('Gracias por su sugerencia!')
  location.reload();
}

function esCorreoValido(txt){
    if(txt.indexOf('@', 0) ===-1)
      return false;
    
    let cad = txt.split('@')
    if(cad.length ===2 && cad[1] === '')
      return false
    
    return true
}