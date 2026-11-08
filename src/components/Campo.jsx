import React from "react";

export default function Campo({ campo, registro }) {
  const {
    nombre,
    etiqueta,
    obligatorio,
    amplio,
    placeholder,
    inputMode,
    pattern,
    ayuda,
    sugerencias,
  } = campo;
  return (
    <div className={amplio ? "field wide" : "field"}>
      <label htmlFor={nombre}>
        {etiqueta}
        {obligatorio && " *"}
      </label>
      <input
        id={nombre}
        name={nombre}
        required={obligatorio}
        defaultValue={registro?.[nombre] ?? ""}
        placeholder={placeholder}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={240}
        aria-describedby={ayuda ? `${nombre}-help` : undefined}
        list={sugerencias ? `${nombre}-options` : undefined}
      />
      {ayuda && <small id={`${nombre}-help`}>{ayuda}</small>}
      {sugerencias && (
        <datalist id={`${nombre}-options`}>
          {sugerencias.map((sugerencia) => (
            <option key={sugerencia} value={sugerencia} />
          ))}
        </datalist>
      )}
    </div>
  );
}
