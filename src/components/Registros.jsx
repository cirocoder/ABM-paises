import React, { useState } from "react";
import { datos } from "../datos.js";
import DialogRegistro from "./DialogRegistro.jsx";
import TablaRegistros from "./TablaRegistros.jsx";

function leerRegistros(configuracion) {
  const datosGuardados = localStorage.getItem(configuracion.clave);
  if (datosGuardados === null) return configuracion.iniciales;

  const registros = JSON.parse(datosGuardados);
  if (!Array.isArray(registros))
    throw new Error("Formato de almacenamiento inválido");
  return registros.map((registro) => ({
    ...registro,
    nombre: registro.nombre ?? registro.name,
  }));
}

export default function Registros() {
  const [guardado, setGuardado] = useState(() => {
    try {
      return { registros: leerRegistros(datos), error: "" };
    } catch {
      return {
        registros: [],
        error: "No se pudieron leer los datos guardados en este navegador.",
      };
    }
  });
  const [accion, setAccion] = useState(null);
  const [errorFormulario, setErrorFormulario] = useState("");
  const [estado, setEstado] = useState("");

  function abrir(modo, registro) {
    setErrorFormulario("");
    setEstado("");
    setAccion({ modo, registro });
  }

  function enviar(event) {
    event.preventDefault();
    const { modo, registro } = accion;
    const id = registro?.id;
    const valores = Object.fromEntries(
      [...new FormData(event.currentTarget)].map(([clave, valor]) => [
        clave,
        valor.trim(),
      ]),
    );

    try {
      const actuales = leerRegistros(datos);
      if (id && !actuales.some((elemento) => elemento.id === id)) {
        setGuardado({ registros: actuales, error: "" });
        setErrorFormulario("Este registro ya no está disponible.");
        return;
      }

      let siguientes;
      if (modo === "baja") {
        siguientes = actuales.filter((elemento) => elemento.id !== id);
      } else {
        const faltante = datos.campos.find(
          (campo) => campo.obligatorio && !valores[campo.nombre],
        );
        const errorValidacion = faltante
          ? `Completá el campo «${faltante.etiqueta}».`
          : datos.validar(valores, actuales, id);
        if (errorValidacion) {
          setErrorFormulario(errorValidacion);
          return;
        }

        siguientes = id
          ? actuales.map((elemento) =>
              elemento.id === id ? { ...valores, id } : elemento,
            )
          : [...actuales, { ...valores, id: crypto.randomUUID() }];
      }

      localStorage.setItem(datos.clave, JSON.stringify(siguientes));
      setGuardado({ registros: siguientes, error: "" });
      setAccion(null);
      setEstado(
        modo === "baja" ? "Registro dado de baja." : "Cambios guardados.",
      );
    } catch {
      setErrorFormulario(
        "No se pudieron guardar los cambios en el almacenamiento del navegador.",
      );
    }
  }

  return (
    <section className="panel" aria-labelledby="section-title">
      <div className="section-heading">
        <div>
          <h2 id="section-title">{datos.titulo}</h2>
          <p className="muted">{datos.descripcion}</p>
        </div>
        <button
          className="primary"
          onClick={() => abrir("alta")}
          disabled={Boolean(guardado.error)}
        >
          {datos.alta}
        </button>
      </div>

      {guardado.error && (
        <p role="alert" className="error">
          {guardado.error}
        </p>
      )}
      {!guardado.error && guardado.registros.length === 0 && (
        <p className="empty">{datos.vacio}</p>
      )}
      {guardado.registros.length > 0 && (
        <TablaRegistros registros={guardado.registros} abrir={abrir} />
      )}
      <p className="status" role="status">
        {estado}
      </p>

      {accion && (
        <DialogRegistro
          accion={accion}
          cerrar={() => setAccion(null)}
          enviar={enviar}
          errorFormulario={errorFormulario}
        />
      )}
    </section>
  );
}
