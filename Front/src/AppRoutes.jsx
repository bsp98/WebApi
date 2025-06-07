import { Routes, Route, BrowserRouter} from 'react-router-dom'
import { PublicoLayout } from './layouts/Publico/PublicoLayout'
import { ClienteLayout } from './layouts/Cliente/ClienteLayout'
import { AdminLayout } from './layouts/Admin/AdminLayout'
import { InicioPublico } from './pages/publico/InicioPublico'
import { Servicios } from './pages/publico/Servicios'
import { Galeria } from './pages/publico/Galeria'
import { GiftCard } from './pages/publico/GiftCard'
import { Contacto } from './pages/publico/Contacto'
import { Error404 } from './pages/shared/Error404'
import { InicioCliente } from './pages/cliente/InicioCliente'
import { ConfirmarReserva } from './pages/cliente/ConfirmarReserva'
import { InicioAdmin } from './pages/admin/InicioAdmin'
import { GestionReservas } from './pages/admin/GestionReservas'
import { GestionClientes } from './pages/admin/GestionClientes'
import { GestionEgresos } from './pages/admin/GestionEgresos'
import { GestionServicios } from './pages/admin/GestionServicios'
import { Estadisticas } from './pages/admin/Estadisticas'
import { AltaCliente } from './pages/admin/AltaCliente'
import { AltaEgreso } from './pages/admin/AltaEgreso'
import { AltaServicio } from './pages/admin/AltaServicio'
import { ModificarReserva } from './pages/admin/ModificarReserva'
import { ModificarServicio } from './pages/admin/ModificarServicio'
import { CambiarPassword } from './pages/shared/CambiarPassword'
import { ConfigDatosPersonales } from './pages/shared/ConfigDatosPersonales'
import { FormularioReserva } from './pages/shared/FormularioReserva'
import { SeleccionarFechaHora } from './pages/shared/SeleccionarFechaHora'
import { Login } from './pages/publico/Login'
import { Registro } from './pages/publico/Registro'


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/*RUTAS PUBLICAS*/}
                <Route path="/*" element={<PublicoLayout />} >

                    <Route index element={<InicioPublico />} />
                    <Route path="inicio" element={<InicioPublico></InicioPublico>} />
                    <Route path="servicios" element={<Servicios></Servicios>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="gift-card" element={<GiftCard></GiftCard>} />
                    <Route path="contacto" element={<Contacto></Contacto>} />
                    <Route path="form-reserva" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
                    <Route path="*" element={<Error404></Error404>} />

                </Route>


                {/*RUTAS CLIENTE*/}
                <Route path="/cliente/*" element={<ClienteLayout></ClienteLayout>}>

                    <Route index element={<InicioCliente></InicioCliente>} />
                    <Route path="inicio" element={<InicioCliente></InicioCliente>} />
                    <Route path="servicios" element={<Servicios></Servicios>} />
                    <Route path="galeria" element={<Galeria></Galeria>} />
                    <Route path="gift-card" element={<GiftCard></GiftCard>} />
                    <Route path="contacto" element={<Contacto></Contacto>} />
                    <Route path="confirmar-reserva" element={<ConfirmarReserva></ConfirmarReserva>} />
                    <Route path="cambiar-password" element={<CambiarPassword></CambiarPassword>} />
                    <Route path="datos-personales" element={<ConfigDatosPersonales></ConfigDatosPersonales>} />
                    <Route path="form-reserva" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
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
                    <Route path="servicios" element={<Servicios></Servicios>} />
                    <Route path="gestion-egresos" element={<GestionEgresos></GestionEgresos>} />
                    <Route path="estadisticas" element={<Estadisticas></Estadisticas>} />
                    <Route path="alta-cliente" element={<AltaCliente></AltaCliente>} />
                    <Route path="alta-egreso" element={<AltaEgreso></AltaEgreso>} />
                    <Route path="alta-servicio" element={<AltaServicio></AltaServicio>} />
                    <Route path="modificar-reserva" element={<ModificarReserva></ModificarReserva>} />
                    <Route path="modificar-servicio" element={<ModificarServicio></ModificarServicio>} />
                    <Route path="cambiar-password" element={<CambiarPassword></CambiarPassword>} />
                    <Route path="datos-personales" element={<ConfigDatosPersonales></ConfigDatosPersonales>} />
                    <Route path="form-reserva" element={<FormularioReserva></FormularioReserva>} />
                    <Route path="fecha-hora" element={<SeleccionarFechaHora></SeleccionarFechaHora>} />
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
