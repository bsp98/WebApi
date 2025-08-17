import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicoLayout } from '../layouts/Publico/PublicoLayout'
import { ClienteLayout } from '../layouts/Cliente/ClienteLayout'
import { AdminLayout } from '../layouts/Admin/AdminLayout'
import { InicioPublico } from '../pages/publico/inicioPublico/InicioPublico'
import { Servicios } from '../pages/publico/Servicios'
import { Galeria } from '../pages/publico/galeria/Galeria'
import { GiftCard } from '../pages/publico/giftCard/GiftCard'
import { Contacto } from '../pages/publico/contacto/Contacto'
import { Error404 } from '../pages/shared/error404/Error404'
import { InicioCliente } from '../pages/cliente/inicioCliente/InicioCliente'
import { ConfirmarReserva } from '../pages/cliente/confirmarReserva/ConfirmarReserva'
import { InicioAdmin } from '../pages/admin/inicioAdmin/InicioAdmin'
import { GestionReservas } from '../pages/admin/gestionReservas/GestionReservas'
import { GestionClientes } from '../pages/admin/gestionClientes/GestionClientes'
import { GestionEgresos } from '../pages/admin/gestionEgresos/GestionEgresos'
import { GestionServicios } from '../pages/admin/gestionServicios/GestionServicios'
import { Estadisticas } from '../pages/admin/estadisticas/Estadisticas'
import { AltaCliente } from '../pages/admin/AltaCliente'
import { AltaEgreso } from '../pages/admin/AltaEgreso'
import { AltaServicio } from '../pages/admin/AltaServicio'
import { ModificarReserva } from '../pages/admin/ModificarReserva'
import { ModificarServicio } from '../pages/admin/ModificarServicio'
import { CambiarPassword } from '../pages/shared/cambiarPassword/CambiarPassword'
import { ConfigDatosPersonales } from '../pages/shared/configurarDatosPersonales/ConfigDatosPersonales'
import { FormularioReserva } from '../pages/shared/formularioReserva/FormularioReserva'
import { SeleccionarFechaHora } from '../pages/shared/seleccionarFechaHora/SeleccionarFechaHora'
import { Login } from '../pages/publico/login/Login'
import { Registro } from '../pages/publico/registro/Registro'
import { PoliticaPrivacidad } from '../pages/publico/politicaPrivacidad/PoliticaPrivacidad'
import { AvisoLegal } from '../pages/publico/avisoLegal/AvisoLegal'
import { Unauthorized } from '../pages/shared/unauthorized/Unauthorized'
import { RutaProtegida } from './RutaProtegida'
import { RutaPublica } from './RutaPublica'
import { OlvidoPassword } from '../pages/shared/olvidoPassword/OlvidoPassword'
import { AltaPublicacion } from '../pages/admin/AltaPublicacion'
import { GestionDiasLibres } from '../pages/admin/gestionDiasLibres/GestionDiasLibres'
import { AltaDiaLibre } from '../pages/admin/AltaDiaLibre'


export const AppRoutes = () => {
    return (
        <Routes>

            {/*RUTAS PUBLICAS*/}
            <Route element={<RutaPublica />}>
                <Route path="/*" element={<PublicoLayout />} >
                    <Route index element={<InicioPublico />} />
                    <Route path="inicio" element={<InicioPublico></InicioPublico>} />
                    <Route path="servicios/:categoria?" element={<Servicios></Servicios>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="gift-card" element={<GiftCard></GiftCard>} />
                    <Route path="contacto" element={<Contacto></Contacto>} />
                    <Route path="confirmar-reserva/:idServicio" element={<ConfirmarReserva></ConfirmarReserva>} />
                    <Route path="form-reserva/:id" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="politica-de-privacidad" element={<PoliticaPrivacidad></PoliticaPrivacidad>} />
                    <Route path="recuperar-contrasena" element={<OlvidoPassword />} />
                    <Route path="aviso-legal" element={<AvisoLegal></AvisoLegal>} />
                    <Route path="*" element={<Error404></Error404>} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Route>
            </Route>



            {/*RUTAS CLIENTE*/}

            <Route element={<RutaProtegida rolPermitido="Cliente" />}>
                <Route path="/cliente/*" element={<ClienteLayout />}>
                    <Route index element={<InicioCliente />} />
                    <Route path="inicio" element={<InicioCliente />} />
                    <Route path="servicios/:categoria?" element={<Servicios />} />
                    <Route path="galeria" element={<Galeria />} />
                    <Route path="gift-card" element={<GiftCard />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="confirmar-reserva/:idServicio" element={<ConfirmarReserva />} />
                    <Route path="cambiar-password/:id" element={<CambiarPassword />} />
                    <Route path="datos-personales/:id" element={<ConfigDatosPersonales />} />
                    <Route path="form-reserva/:id" element={<FormularioReserva />} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora />} />
                    <Route path="politica-de-privacidad" element={<PoliticaPrivacidad />} />
                    <Route path="aviso-legal" element={<AvisoLegal />} />
                    <Route path="*" element={<Error404 />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Route>
            </Route>


            {/*RUTAS ADMIN*/}
            <Route element={<RutaProtegida rolPermitido="Administrador" />}>
                <Route path="/admin/*" element={<AdminLayout></AdminLayout>}>
                    <Route index element={<InicioAdmin></InicioAdmin>} />
                    <Route path="inicio" element={<InicioAdmin></InicioAdmin>} />
                    <Route path="gestion-servicios" element={<GestionServicios></GestionServicios>} />
                    <Route path="gestion-reservas" element={<GestionReservas></GestionReservas>} />
                    <Route path="gestion-clientes" element={<GestionClientes></GestionClientes>} />
                    <Route path="dias-libres" element={<GestionDiasLibres></GestionDiasLibres>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="servicios/:categoria?" element={<Servicios></Servicios>} />
                    <Route path="gestion-egresos" element={<GestionEgresos></GestionEgresos>} />
                    <Route path="estadisticas" element={<Estadisticas></Estadisticas>} />
                    <Route path="alta-cliente" element={<AltaCliente></AltaCliente>} />
                    <Route path="alta-egreso" element={<AltaEgreso></AltaEgreso>} />
                    <Route path="alta-servicio" element={<AltaServicio></AltaServicio>} />
                    <Route path="alta-publicacion" element={<AltaPublicacion></AltaPublicacion>} />
                    <Route path="alta-dias-libres" element={<AltaDiaLibre></AltaDiaLibre>} />
                    <Route path="modificar-reserva/:id" element={<ModificarReserva></ModificarReserva>} />
                    <Route path="modificar-servicio/:id" element={<ModificarServicio></ModificarServicio>} />
                    <Route path="cambiar-password/:id" element={<CambiarPassword></CambiarPassword>} />
                    <Route path="datos-personales/:id" element={<ConfigDatosPersonales></ConfigDatosPersonales>} />
                    <Route path="form-reserva/:id" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="*" element={<Error404></Error404>} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Route>
            </Route>

            {/*RUTA LOGIN*/}
            <Route element={<RutaPublica />}>
                <Route path="/login" element={<Login></Login>}></Route>
            </Route>

            {/*RUTA REGISTRO*/}
            <Route element={<RutaPublica />}>
                <Route path="/registro" element={<Registro></Registro>}></Route>
            </Route>

        </Routes>
    )
}
