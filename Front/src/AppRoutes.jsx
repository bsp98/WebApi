import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicoLayout } from './layouts/Publico/PublicoLayout'
import { ClienteLayout } from './layouts/Cliente/ClienteLayout'
import { AdminLayout } from './layouts/Admin/AdminLayout'
import { InicioPublico } from './pages/publico/inicioPublico/InicioPublico'
import { Servicios } from './pages/publico/Servicios'
import { Galeria } from './pages/publico/Galeria'
import { GiftCard } from './pages/publico/GiftCard'
import { Contacto } from './pages/publico/Contacto'
import { Error404 } from './pages/shared/Error404'
import { InicioCliente } from './pages/cliente//inicioCliente/InicioCliente'
import { ConfirmarReserva } from './pages/cliente/ConfirmarReserva'
import { InicioAdmin } from './pages/admin/inicioAdmin/InicioAdmin'
import { GestionReservas } from './pages/admin/gestionReservas/GestionReservas'
import { GestionClientes } from './pages/admin/gestionClientes/GestionClientes'
import { GestionEgresos } from './pages/admin/GestionEgresos'
import { GestionServicios } from './pages/admin/gestionServicios/GestionServicios'
import { Estadisticas } from './pages/admin/Estadisticas'
import { AltaCliente } from './pages/admin/AltaCliente'
import { AltaEgreso } from './pages/admin/AltaEgreso'
import { AltaServicio } from './pages/admin/AltaServicio'
import { ModificarReserva } from './pages/admin/ModificarReserva'
import { ModificarServicio } from './pages/admin/ModificarServicio'
import { CambiarPassword } from './pages/shared/CambiarPassword'
import { ConfigDatosPersonales } from './pages/shared/ConfigDatosPersonales'
import { FormularioReserva } from './pages/shared/formularioReserva/FormularioReserva'
import { SeleccionarFechaHora } from './pages/shared/seleccionarFechaHora/SeleccionarFechaHora'
import { Login } from './pages/publico/Login'
import { Registro } from './pages/publico/Registro'
import { PoliticaPrivacidad } from './pages/publico/PoliticaPrivacidad'
import { AvisoLegal } from './pages/publico/AvisoLegal'


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/*RUTAS PUBLICAS*/}
                <Route path="/*" element={<PublicoLayout />} >

                    <Route index element={<InicioPublico />} />
                    <Route path="inicio" element={<InicioPublico></InicioPublico>} />
                    <Route path="servicios/:categoria?" element={<Servicios></Servicios>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="gift-card" element={<GiftCard></GiftCard>} />
                    <Route path="contacto" element={<Contacto></Contacto>} />
                    <Route path="confirmar-reserva" element={<ConfirmarReserva></ConfirmarReserva>} />
                    <Route path="form-reserva/:id" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="politica-de-privacidad" element={<PoliticaPrivacidad></PoliticaPrivacidad>} />
                    <Route path="aviso-legal" element={<AvisoLegal></AvisoLegal>} />
                    <Route path="*" element={<Error404></Error404>} />

                </Route>


                {/*RUTAS CLIENTE*/}
                <Route path="/cliente/*" element={<ClienteLayout></ClienteLayout>}>

                    <Route index element={<InicioCliente></InicioCliente>} />
                    <Route path="inicio" element={<InicioCliente></InicioCliente>} />
                    <Route path="servicios/:categoria?" element={<Servicios></Servicios>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="gift-card" element={<GiftCard></GiftCard>} />
                    <Route path="contacto" element={<Contacto></Contacto>} />
                    <Route path="confirmar-reserva" element={<ConfirmarReserva></ConfirmarReserva>} />
                    <Route path="cambiar-password/:id" element={<CambiarPassword></CambiarPassword>} />
                    <Route path="datos-personales/:id" element={<ConfigDatosPersonales></ConfigDatosPersonales>} />
                    <Route path="form-reserva/:id" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="politica-de-privacidad" element={<PoliticaPrivacidad></PoliticaPrivacidad>} />
                    <Route path="aviso-legal" element={<AvisoLegal></AvisoLegal>} />
                    <Route path="*" element={<Error404></Error404>} />

                </Route>

                {/*RUTAS ADMIN*/}
                <Route path="/admin/*" element={<AdminLayout></AdminLayout>}>

                    <Route index element={<InicioAdmin></InicioAdmin>} />
                    <Route path="inicio" element={<InicioAdmin></InicioAdmin>} />
                    <Route path="gestion-servicios" element={<GestionServicios></GestionServicios>} />
                    <Route path="gestion-reservas" element={<GestionReservas></GestionReservas>} />
                    <Route path="gestion-clientes" element={<GestionClientes></GestionClientes>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="servicios/:categoria?" element={<Servicios></Servicios>} />
                    <Route path="gestion-egresos" element={<GestionEgresos></GestionEgresos>} />
                    <Route path="estadisticas" element={<Estadisticas></Estadisticas>} />
                    <Route path="alta-cliente" element={<AltaCliente></AltaCliente>} />
                    <Route path="alta-egreso" element={<AltaEgreso></AltaEgreso>} />
                    <Route path="alta-servicio" element={<AltaServicio></AltaServicio>} />
                    <Route path="modificar-reserva/:id" element={<ModificarReserva></ModificarReserva>} />
                    <Route path="modificar-servicio/:id" element={<ModificarServicio></ModificarServicio>} />
                    <Route path="cambiar-password/:id" element={<CambiarPassword></CambiarPassword>} />
                    <Route path="datos-personales/:id" element={<ConfigDatosPersonales></ConfigDatosPersonales>} />
                    <Route path="form-reserva/:id" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora/:accion/:id" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="*" element={<Error404></Error404>} />

                </Route>

                {/*RUTA LOGIN*/}
                <Route path="/login" element={<Login></Login>}></Route>

                {/*RUTA REGISTRO*/}
                <Route path="/registro" element={<Registro></Registro>}></Route>

            </Routes>
        </BrowserRouter >
    )
}
