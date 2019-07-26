import React from 'react';
import { ItemModel } from '../../interfaces'
import './Cards.scss'


interface ItemProps {
  card: ItemModel;
}

const Card = ({ card: { url, name } }: ItemProps) => {
  return (
    <div className='card'>
        <a href={url}><img src={url} alt="Loading" /></a>
    </div>
  );
}

export default Card;