import React from 'react'
import './hero.css'
import '../buttons/buttons.css'
import { ButtonRedirect } from '../buttons/ButtonRedirect'

export const Hero = ({ textHero,variant_position,description = "", btn_action }) => {
  return (
    <div className='hero_container'>
      <div className='container_content'>

        <div className={variant_position}>
          <h1 className='title_hero'>{textHero}</h1>
          <p className='description_hero'>{description}</p>
        </div>

        {description != "" &&
          <div className='container_button'>
            <ButtonRedirect textBtn={"RESERVAR"} actionRedirect={btn_action} btn_variant={"btn_hero"} width_btn='btn_small' />
          </div>
        }

      </div>
    </div>
  )
}
