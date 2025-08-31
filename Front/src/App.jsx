
import { AppRoutes } from './routes/AppRoutes'
import { obtenerUsuario } from '../src/utils/storage/authStorage';
import { useAuth } from './hooks/useAuth';
import { useConfiguracionDePago } from './hooks/useConfiguracionDePago';
import { useEffect } from 'react';

function App() {

  const { setDatosAuthDelStorage } = useAuth();
  const { obtenerFormaDePago } = useConfiguracionDePago();

  useEffect(() => {
    const usuario = obtenerUsuario();
    if (usuario) {
      setDatosAuthDelStorage(usuario);
    }

  }, []);

  useEffect(() => {
    obtenerFormaDePago();
  }, []);

  return (
    <AppRoutes />
  );
};

export default App
