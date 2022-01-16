import React from 'react';
import { Link } from 'react-router-dom'

// Importing test.png
import icon from '../images/test.png'

function Quiz(props) {
    return (
        <div className='quiz--container'>
            <Link to={props.nav}>
                <h2>{props.title}</h2>
                <p>
                    <img src={icon} alt='vector image of a test icon' />
                </p>
                <h3>{props.weight}</h3>
            </Link>
        </div>
    )
}

export default Quiz