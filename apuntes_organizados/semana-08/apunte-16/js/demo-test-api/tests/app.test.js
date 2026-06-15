import request from "supertest";
import app from "../app.js";

test("El servidor debe iniciar", async () => {
    // realizo una petición a la ruta por defecto del servidor
    await request(app)
        .get("/api")
        .expect(200)
        .expect(async (res) => {
            expect(res.text).toBe("Servidor iniciado y escuchando...");
        });
});

describe("Pruebas para la api usuarios", () => {
    it("Debe responder la lista de usuarios como un array json", async () => {
        await request(app)
            .get("/api/usuarios")
            .expect(async (res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
                expect(res.body).toHaveLength(2);
            });
    });

    it("Debe responder el usuario con id = 2 como un objeto json", async () => {
        await request(app)
            .get("/api/usuarios/2")
            .expect(async (res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
                expect(res.body).toEqual(expect.objectContaining({
                    id: 2,
                    nombre: "Usuario 2"
                }));
            });
    });

    it("Debe responder con el usuario creado con id = 3 como un objeto json", async () => {
        await request(app)
            .post("/api/usuarios")
            .send({ nombre: "Nuevo Usuario" })
            .expect(async (res) => {
                expect(res.statusCode).toEqual(201);
                expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
                expect(res.body).toHaveProperty("id");
                expect(res.body.id).toBe(3);
                expect(res.body).toEqual(expect.objectContaining({
                    id: 3,
                    nombre: "Nuevo Usuario"
                }));
            });
    });
});
