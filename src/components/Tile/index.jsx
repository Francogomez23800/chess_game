import React from 'react';
import './tile.css'

const Tile = ({number, image}) => {
return number % 2 === 0 ?
    (<span className="tile black-tile">
        {image && (<div style={{backgroundImage:`url(${image})`}} className='chess-pieces'></div>)}
    </span>)
    :
    (<span className="tile white-tile">
        {image && (<div style={{backgroundImage:`url(${image})`}} className='chess-pieces'></div>)}
    </span>) 
}

export {Tile}