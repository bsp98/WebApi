import { HeaderAdmin } from './HeaderAdmin';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ModalConfigPago } from '../../components/admin/modalConfigPago/ModalConfigPago';
import { useConfiguracionDePago } from '../../hooks/useConfiguracionDePago';
import { useAuth } from '../../hooks/useAuth';

export const AdminLayout = () => {
    const {cerrarSesion}= useAuth();

  const {modificarFormaDePago,formaDePago} = useConfiguracionDePago();

  const [modalPagoVisible, setModalPagoVisible] = useState(false);

  const cerrarModalConfigPago = () => {
    setModalPagoVisible(false);
  }

  const abrirModalConfigPago = () => {
    setModalPagoVisible(true);
  }

  return (
    <>
      <HeaderAdmin idUsuario={"2"} cerrarSesion={cerrarSesion} abrirModal={abrirModalConfigPago} />
      <main className="container">
        <Outlet />
        {modalPagoVisible && <ModalConfigPago cerrarModal={cerrarModalConfigPago} modificarFormaDePago={modificarFormaDePago} formaDePago={formaDePago} />}
      </main>
      <Footer tipoUsuario={"admin"} />
    </>
  );
};
