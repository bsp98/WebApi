import React from 'react'
import './hero.css'
export const Hero = ({textHero}) => {
  return (
    <div className='hero_container'>
        <h1>{textHero}</h1>
    </div>
  )
}
