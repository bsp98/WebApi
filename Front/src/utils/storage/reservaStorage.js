const STORAGE_KEY = "reservaEnProceso";

export const guardarReservaEnStorage = (nuevosDatos) => {
  const reservaActual = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  const reservaActualizada = { ...reservaActual, ...nuevosDatos };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservaActualizada));
};

export const obtenerReservaDeStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const limpiarReservaEnStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};