
export const guardarUsuario = (usuario) => {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

export const obtenerUsuario = () => {
  const data = localStorage.getItem("usuario");
  return data ? JSON.parse(data) : null;
}

export const eliminarUsuario = () => {
  localStorage.removeItem("usuario");
}

export const limpiarAuthStorage = () => {
  eliminarUsuario();
}

export const obtenerToken = () => {
  const data = localStorage.getItem("usuario");
  return data ? JSON.parse(data).token : null;
}