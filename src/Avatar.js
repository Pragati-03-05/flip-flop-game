import React from 'react';
import classnames from 'classnames';
import './style.scss';
import { useEffect, useState } from 'react';
import dice from './Images/dice.png';

function Avatar({ card, index, isFlipped, onClick, inActive }) {
  return (
    <div className={`card ${inActive}`} onClick={() => onClick(index)}>
      <div className={classnames('card-face')}>
        {isFlipped ? (
          <img src={card.avatar_url} alt={card.login} className="img" />
        ) : (
          <img src={dice} alt={dice} className="img" />
        )}
      </div>
    </div>
  );
}
export default Avatar;
