import RepositorioBase from './repositorioBase.js';
import Usuario from '../modelos/usuario.js';

class RepositorioUsuario extends RepositorioBase {
  constructor() {
    super(Usuario);
  }

  async obtenerPorUsuario(nombreUsuario) {
    return this.modelo.findOne({ where: { usuario: nombreUsuario } });
  }

  async buscarPorApellido(apellido) {
    return this.modelo.findAll({ where: { apellido } });
  }
}

export default new RepositorioUsuario();
