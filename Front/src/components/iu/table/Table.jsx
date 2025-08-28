import { useState, useEffect } from 'react';
import './table.css'
import { ButtonAction } from './ButtonAction';

export const Table = ({ columns, datos, textBtn1, textBtn2, actionBtn1, actionBtn2, table_width, class_margin, deshabilitarBtn1 }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!datos) return null;

  return (
    <div className={`container_table ${table_width}`}>
      {isMobile ? (
        /* Render mobile cards directamente dentro de Table */
        <div className="cards_container">
          {datos.map(dato => (
            <div className="card_row" key={dato.id}>
              {columns.map((col, index) => (
                <p key={index} className="card_field">
                  <span className="card_label">{col.header}:</span> {col.render(dato)}
                </p>
              ))}
              {(textBtn1 || textBtn2) && (
                <div className="card_actions">
                  {textBtn1 && <ButtonAction text={textBtn1} variant="btn_primary" dato={dato} action={actionBtn1} disabled={deshabilitarBtn1?.(dato)} />}
                  {textBtn2 && <ButtonAction text={textBtn2} variant="btn_secondary" dato={dato} action={actionBtn2} />}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Render tabla normal */
        <table className={`content_table ${class_margin}`}>
          <thead className='content_head_table'>
            <tr className='row_head'>
              {columns.map((col, index) => (
                <th className='cell_head' key={index}>{col.header}</th>
              ))}
              {(textBtn1 || textBtn2) && <th className='cell_head'>Acciones</th>}
            </tr>
          </thead>
          <tbody className='content_body_table'>
            {datos.map(dato => (
              <tr className='row_body' key={dato.id}>
                {columns.map((col, index) => (
                  <td className='cell_body' key={index}>{col.render(dato)}</td>
                ))}
                {(textBtn1 || textBtn2) && (
                  <td className='cell_action'>
                    {textBtn1 && <ButtonAction text={textBtn1} variant="btn_primary" dato={dato} action={actionBtn1} disabled={deshabilitarBtn1?.(dato)} />}
                    {textBtn2 && <ButtonAction text={textBtn2} variant="btn_secondary" dato={dato} action={actionBtn2} />}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


/*import React from 'react'
import './table.css'

import { ButtonAction } from './ButtonAction';

export const Table = ({ columns, datos, textBtn1, textBtn2, actionBtn1, actionBtn2,table_width, class_margin,deshabilitarBtn1 }) => {

    if(!datos){return}
    
    return (
        <div className={`container_table ${table_width}`}>
            <table className={`content_table ${class_margin}`}>
                <thead className='content_head_table'>
                    <tr className='row_head'>
                        {columns.map((col, index) => (
                            <th className='cell_head' key={index}>{col.header}</th>
                        ))}
                        {(textBtn1 || textBtn2) && <th className='cell_head'>Acciones</th>}
                    </tr>
                </thead>

                <tbody className='content_body_table'>
                    {datos.map(dato => (
                        <tr className='row_body' key={dato.id}>
                            {columns.map((col, index) => (
                                <td className='cell_body' key={index}>
                                    {col.render(dato)}
                                </td>
                            ))}

                            {(textBtn1 || textBtn2) && (
                                <td className='cell_action'>
                                    {textBtn1 && <ButtonAction text={textBtn1} variant="btn_primary" dato={dato} action={actionBtn1} disabled={deshabilitarBtn1?.(dato)} />}
                                    {textBtn2 && <ButtonAction text={textBtn2} variant="btn_secondary" dato={dato} action={actionBtn2} />}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};*/
