
import { AppRoutes } from './routes/AppRoutes'
import { obtenerUsuario, obtenerToken } from '../src/utils/storage/authStorage';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

function App() {

  const { setDatosAuthDelStorage} = useAuth();

  useEffect(() => {
    const usuario = obtenerUsuario();
    const token = obtenerToken();

    if (usuario && token) {
      setDatosAuthDelStorage(usuario, token);
    }

  }, []);

  return (
      <AppRoutes />
  );
};

export default App
