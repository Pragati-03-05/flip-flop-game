import React from 'react';
import './avatar.scss';
import classnames from 'classnames';
import dice from '../Images/dice.png';

function Avatar(props) {
  const { card, index, isFlipped, onClick, inActive, disable } = props;
  return (
    <div
      className={`card ${inActive}`}
      onClick={() => !isFlipped && disable && onClick(index)}
    >
      <div className={classnames('card-face')}>
        {isFlipped ? (
          <img src={card.avatar_url} alt={card.login} className="img" />
        ) : (
          <img src={dice} alt={dice} />
        )}
      </div>
    </div>
  );
}
export default React.memo(Avatar);
