
export const guardarModoDePago = (modo) => {
  localStorage.setItem("modoDePago", JSON.stringify(modo));
}

export const obtenerModoDePago = () => {
  const modo = localStorage.getItem("modoDePago");
  return modo !== null ? parseInt(modo, 10) : 0; 
}

export const eliminarModoDePago = () => {
  localStorage.removeItem("modoDePago");
}

export const limpiarPagoStorage = () => {
  eliminarModoDePago();
}