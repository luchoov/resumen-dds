import RepositorioBase from './repositorioBase.js';
import Perfil from '../modelos/perfil.js';

class RepositorioPerfil extends RepositorioBase {
  constructor() {
    super(Perfil);
  }

  async obtenerPorNombre(nombre) {
    return this.modelo.findOne({ where: { nombre } });
  }
}

export default new RepositorioPerfil();
