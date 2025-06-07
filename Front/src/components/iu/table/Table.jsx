import React from 'react'
import './table.css'
import { ButtonAction } from './ButtonAction';

export const Table = () => {
    return (

        <div className='container_table'>

            <table className='content_table'>
                <thead className='content_head_table'>
                    <tr className='row_head'>
                        <th className='cell_head'>Nombre</th>
                        <th className='cell_head'>Categoría</th>
                        <th className='cell_head'>Estado</th>
                        <th className='cell_head'>Duración</th>
                        <th className='cell_head'>Precio</th>
                        <th className='cell_head'>Acciones</th>
                    </tr>
                </thead>

                <tbody className='content_body_table'>
                    <tr className='row_body'>
                        <td className='cell_body'>Esculpidas</td>
                        <td className='cell_body'>Uñas</td>
                        <td className='cell_body'>Activo</td>
                        <td className='cell_body'>90 min</td>
                        <td className='cell_body'>$2000</td>
                        <td className='cell_action'>
                            <ButtonAction text={"Modificar"} variant={"btn_primary"} />
                            <ButtonAction text={"Eliminar"} variant={"btn_secondary"} />
                        </td>
                    </tr>

                    <tr className='row_body'>
                        <td className='cell_body'>Esculpidas</td>
                        <td className='cell_body'>Uñas</td>
                        <td className='cell_body'>Activo</td>
                        <td className='cell_body'>90 min</td>
                        <td className='cell_body'>$2000</td>
                        <td className='cell_action'>
                            <ButtonAction text={"Modificar"} variant={"btn_primary"} />
                            <ButtonAction text={"Eliminar"} variant={"btn_secondary"} />
                        </td>
                    </tr>

                    <tr className='row_body'>
                        <td className='cell_body'>Esculpidas</td>
                        <td className='cell_body'>Uñas</td>
                        <td className='cell_body'>Activo</td>
                        <td className='cell_body'>90 min</td>
                        <td className='cell_body'>$2000</td>
                        <td className='cell_action'>
                            <ButtonAction text={"Modificar"} variant={"btn_primary"} />
                            <ButtonAction text={"Eliminar"} variant={"btn_secondary"} />
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

    )
}
