function validarPais({ nombre }, registros, id) {
  const normalizar = (valor) => valor.normalize("NFC").toLocaleLowerCase("es");
  if (
    registros.some(
      (registro) =>
        registro.id !== id &&
        normalizar(registro.nombre) === normalizar(nombre),
    )
  ) {
    return "Ya existe un país con ese nombre.";
  }
  return "";
}

export const datos = {
  clave: "paises",
  titulo: "Paises",
  descripcion: "Administra el listado de países del sistema.",
  campoNombre: "nombre",
  alta: "Alta de pais",
  modificar: "Modificar pais",
  baja: "Baja de pais",
  vacio: "Agrega un pais para comenzar.",
  campos: [
    { nombre: "nombre", etiqueta: "Nombre", obligatorio: true, amplio: true },
  ],
  iniciales: ["Argentina", "Perú", "Uruguay"].map((nombre, indice) => ({
    id: `demo-${indice}`,
    nombre,
  })),
  validar: validarPais,
};
