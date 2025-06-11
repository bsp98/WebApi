import React from 'react'
import './cards.css'
import { Card } from './Card'

export const ContainerCards = ({ data, action_btn }) => {
          {console.log("informacion de servicios en card container")}
      {console.log(data)}
    return (
        <div className='container_cards'>

            {data.map(dato => {
               return <Card  key={dato.id} dato={dato} action_btn={action_btn}/>;
            })}

        </div>
    )
}
