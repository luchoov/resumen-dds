import express from "express";

const app = express();
const usuarios = [{ id: 1, nombre: "Usuario 1" }, { id: 2, nombre: "Usuario 2" }];

app.use(express.json());

// Handler function para la ruta raíz
app.get("/api", (req, res) => {
    res.send("Servidor iniciado y escuchando...");
});

// Handler function para la ruta /usuarios
app.get("/api/usuarios", (req, res) => {
    res.json(usuarios);
});

// Handler function para la ruta /usuario/:id
app.get("/api/usuarios/:id", (req, res) => {
    const userId = req.params.id;
    const usuario = usuarios[userId - 1];
    res.json(usuario);
});

app.post("/api/usuarios", (req, res) => {
    const newUsuario = { id: usuarios.length + 1, ...req.body };
    usuarios.push(newUsuario);
    res.status(201).json(newUsuario);
});

// Handler function para rutas no encontradas
app.use((req, res) => {
    res.status(404).send("Ruta no encontrada");
});

(async function start() {
// Escuchar en el puerto 3000
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor REST escuchando en el puerto ${PORT}`);
    });
}());

export default app;
