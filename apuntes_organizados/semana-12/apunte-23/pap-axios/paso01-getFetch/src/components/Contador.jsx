// src/Contador.jsx
import { useState, useEffect } from 'react'

export default function Contador({ nombre, onActualizacion }) {
  const [cuenta, setCuenta] = useState(0)

  useEffect(() => {
    onActualizacion(nombre, cuenta)
  }, [cuenta])

  return (
    <div className="card">
      <button onClick={() => setCuenta(cuenta + 1)}>
        {nombre} cuenta: {cuenta}
      </button>
    </div>
  )
}