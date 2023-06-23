import React from 'react';
import './tile.css'

const Tile = ({number, image}) => {
return number % 2 === 0 ?
    (<span className="tile black-tile">
        <img src={image}/>
    </span>)
    :
    (<span className="tile white-tile">
        <img src={image}/>
    </span>) 
}

export {Tile}