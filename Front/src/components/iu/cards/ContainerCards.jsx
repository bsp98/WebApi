import React from 'react'
import './cards.css'
import { Card } from './Card'

export const ContainerCards = ({ data, action_btn }) => {
    console.log(data)
    return (
        <div className='container_cards'>
            {data.map(dato =>
                dato.disponibilidad === 1 && (
                    <Card key={dato.id} dato={dato} action_btn={action_btn} />
                )
            )}
        </div>
    )

    /*  return (
            <div className='container_cards'>
                
               {data.map(dato => {
                   return <Card  key={dato.id} dato={dato} action_btn={action_btn}/>;
                })}
    
            </div>
        )*/
}
