import React, { useEffect, useRef } from "react";

export default function Modal({ titulo, cerrar, contenido }) {
  const dialog = useRef(null);

  useEffect(() => {
    dialog.current.showModal();
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        cerrar();
      }}
    >
      <h2 id="dialog-title">{titulo}</h2>
      {contenido}
    </dialog>
  );
}
