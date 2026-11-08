import React from "react";
import { datos } from "../datos.js";

export default function TablaRegistros({ registros, abrir }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registro) => (
          <tr key={registro.id}>
            <td>
              <strong>{registro[datos.campoNombre]}</strong>
            </td>
            <td className="row-actions">
              <button
                onClick={() => abrir("modificar", registro)}
                aria-label={`Modificar ${registro[datos.campoNombre]}`}
              >
                Modificar
              </button>
              <button
                className="danger-text"
                onClick={() => abrir("baja", registro)}
                aria-label={`Dar de baja ${registro[datos.campoNombre]}`}
              >
                Dar de baja
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
