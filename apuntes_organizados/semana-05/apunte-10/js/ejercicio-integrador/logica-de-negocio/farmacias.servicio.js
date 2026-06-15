export class FarmaciasServicio {
    farmacias = [];

    constructor() {
        this.farmacias = [];
    }

    setFarmacias(farmacias) {
        this.farmacias = farmacias;
    }

    /***
     * Retorna cantidad de farmacias de la localidad Córdoba.
     * @param localidad: nombre de localidad para filtrar.
     * @returns {number}
     */
    getTotalFarmacias(localidad) {
        return this.farmacias.filter(f => f.localidad.nombre.toLowerCase() === localidad.toLowerCase()).length;
    }

    /***
     * Obtener la farmacia cuyo nombre coincida.
     * @param nombre: nombre de farmacia a buscar
     * @returns {Farmacia | undefined}
     */
    getFarmacia(nombre) {
        return this.farmacias.find(f => f.nombre.toLowerCase() === nombre.toLowerCase());
    }


    /***
     * Listar todas las descripciones de tipologías que existen.
     * @returns {string[]}
     */
    getTipologias() {
        const tipologias = [];
        for (const f of this.farmacias) {
            if (!tipologias.some(t => t.descripcion.toLowerCase() === f.tipologia.descripcion.toLowerCase())) {
                tipologias.push(f.tipologia);
            }
        }
        return tipologias.map(t => t.descripcion);
    }

    /***
     * Retorna la provincia con más farmacias.
     * @returns {{cantidad: *, nombre: string}}
     */
    getProvinciaConMasFarmacias() {
        const farmaciasPorProvincia = this.getCantidadFarmaciasPorProvincia();
        let provinciaMasFarmacias;
        for (const provincia in farmaciasPorProvincia){
            if (!provinciaMasFarmacias){
                provinciaMasFarmacias = {
                    nombre: provincia,
                    cantidad: farmaciasPorProvincia[provincia]
                }
                continue;
            }
            if (provinciaMasFarmacias < farmaciasPorProvincia[provincia]){
                provinciaMasFarmacias = {
                    nombre: provincia,
                    cantidad: farmaciasPorProvincia[provincia]
                }
            }
        }
        return provinciaMasFarmacias;
    }

    /***
     * Retorna cantidad de farmacias por provincia.
     * @returns {{}}
     */
    getCantidadFarmaciasPorProvincia() {
        const map = {};
        this.farmacias.forEach((f) => {
            const key = f.localidad.departamento.provincia.nombre;
            const cantidad = map[key];
            if (!cantidad) {
                map[key] = 1;
            } else {
                map[key]++;
            }
        });
        return map;
    }
}