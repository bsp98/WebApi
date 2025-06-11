import React from 'react'
import './filter.css'
import { ButtonFilter } from './ButtonFilter'

export const Filter = ({optionFilter, onFilter}) => {
    return (
        <div className='container_filter'>

            {optionFilter.map(opt =>(
                <ButtonFilter key={opt.value} option={opt.name} value={opt.value} action={onFilter} />
            ))}

        </div>
    )
}
