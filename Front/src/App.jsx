
import { AppRoutes } from './routes/AppRoutes'
import { obtenerUsuario} from '../src/utils/storage/authStorage';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

function App() {

  const { setDatosAuthDelStorage} = useAuth();

  useEffect(() => {
    const usuario = obtenerUsuario();
    if (usuario) {
      setDatosAuthDelStorage(usuario);
    }

  }, []);

  return (
      <AppRoutes />
  );
};

export default App
