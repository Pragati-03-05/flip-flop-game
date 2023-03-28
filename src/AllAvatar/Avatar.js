import React from 'react';
import './avatar.scss';
import dice from '../Images/dice.png';

function Avatar(props) {
  const { card, index, isFlipped, onClick, inActive, disable } = props;
  return (
    <div
      className={`${inActive} ${isFlipped}`}
      onClick={() => !isFlipped && disable && onClick(index)}
    >
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <img src={dice} alt={dice} />
        </div>
        <div className="flip-box-back">
          <img src={card.avatar_url} alt={card.login} className="img" />
        </div>
      </div>
    </div>
  );
}
export default React.memo(Avatar);
