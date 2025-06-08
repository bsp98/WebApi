import React from 'react'
import './table.css'
import { ButtonAction } from './ButtonAction';

export const Table = ({columns, datos, textBtn1, textBtn2, actionBtn1, actionBtn2}) => {
    return (

        <div className='container_table'>

            <table className='content_table'>

                <thead className='content_head_table'>
                    <tr className='row_head'>
                        {columns.map(col => (
                            <th className='cell_head' key={col.field}>{col.header}</th>
                        ))}
                        {(textBtn1 || textBtn2) && <th className='cell_head'>Acciones</th>}
                    </tr>
                </thead>

                <tbody className='content_body_table'>

                        {datos.map(dato => (
                            <tr className='row_body' key={dato.id}>
                                {columns.map(col => (
                                    <td className='cell_body' key={col.field}>{dato[col.field]}</td>
                                ))}


                                {(textBtn1 || textBtn2) && (
                                    <td className='cell_action'>
                                        <ButtonAction text={textBtn1} variant={"btn_primary"} dato={dato} action={actionBtn1} />
                                        <ButtonAction text={textBtn2} variant={"btn_secondary"} dato={dato} action={actionBtn2}/>
                                    </td>
                                )}

                            </tr>
                        ))}
                </tbody>

            </table>

        </div>
    )
}
