import React, { useCallback } from 'react';
import Avatar from './Avatar';

const SetAvatar = (props) => {
  const { data, openCards, clearCards, disable, time } = props;
  const checkIsFlipped = (index) => {
    return time > 0 && openCards.includes(index);
  };
  const handleCardClick = useCallback(
    (index) => {
      if (openCards.length === 1) {
        props.setOpenCards((prev) => [...prev, index]);
      } else {
        props.setOpenCards([index]);
      }
    },
    [openCards]
  );
  return data.map((x, index) => {
    return (
      <Avatar
        card={x}
        key={index}
        index={index}
        disable={disable}
        isFlipped={checkIsFlipped(index) && 'isFlipped'}
        onClick={() => handleCardClick(index)}
        inActive={clearCards.includes(index) && 'inActive'}
      />
    );
  });
};
export default React.memo(SetAvatar);
