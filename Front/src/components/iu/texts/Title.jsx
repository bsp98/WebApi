import React from 'react'
import './title.css';

export const Title = ({text, modifyStyle=''}) => {
  return (
    <h1 className={`title_h1 ${modifyStyle}`}>{text}</h1>
)}
