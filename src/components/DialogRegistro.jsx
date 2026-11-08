import React from "react";
import { datos } from "../datos.js";
import Modal from "./Modal.jsx";
import Campo from "./Campo.jsx";

export default function DialogRegistro({ accion, cerrar, enviar, errorFormulario }) {
  return (
    <Modal titulo={datos[accion.modo]} cerrar={cerrar} contenido={
      <form onSubmit={enviar}>
        {accion.modo === "baja" ? (
          <p>
            ¿Confirmás la baja de{" "}
            <strong>{accion.registro[datos.campoNombre]}</strong>?
          </p>
        ) : (
          <div className="fields">
            {datos.campos.map((campo) => (
              <Campo
                key={campo.nombre}
                campo={campo}
                registro={accion.registro}
              />
            ))}
          </div>
        )}
        {errorFormulario && (
          <p className="error" role="alert">
            {errorFormulario}
          </p>
        )}
        <div className="dialog-actions">
          <button type="button" onClick={cerrar}>
            Cancelar
          </button>
          <button
            type="submit"
            className={accion.modo === "baja" ? "danger" : "primary"}
          >
            {accion.modo === "baja" ? "Confirmar baja" : "Guardar"}
          </button>
        </div>
      </form>
    } />
  );
}