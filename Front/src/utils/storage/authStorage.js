
export const guardarToken = (token) => {
  localStorage.setItem("token", token);
}

export const obtenerToken = () => {
  return localStorage.getItem("token");
}

export const eliminarToken = () => {
  localStorage.removeItem("token");
}

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
  eliminarToken();
  eliminarUsuario();
}