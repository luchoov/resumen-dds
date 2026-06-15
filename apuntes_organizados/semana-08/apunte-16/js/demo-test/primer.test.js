// Primer archivo de tests
import { sumar, cuentaLetras } from "./index.js";

test("Esto suma dos números", () => {
	const a = 1;
	const b = 1;
	const expected = a + b;
	const res = sumar(a, b);
	expect(res).toBe(expected);
})

test("Esto cuenta cantidad de caracteres de la cadena", () => {
	const cadena1 = "importante";
	const expected1 = cadena1.length;
	expect(cuentaLetras(cadena1)).toBe(expected1);
	const cadena2 = "";
	const expected2 = cadena2.length;
	expect(cuentaLetras(cadena2)).toBe(expected2);
  });
