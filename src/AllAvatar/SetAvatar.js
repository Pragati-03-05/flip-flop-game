import React, { useCallback } from 'react';
import Avatar from './Avatar';

const SetAvatar = (props) => {
  const { data, openCards, clearCards, disable } = props;
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
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
        isFlipped={checkIsFlipped(index)}
        onClick={() => handleCardClick(index)}
        inActive={clearCards.includes(index) && 'inActive'}
      />
    );
  });
};
export default React.memo(SetAvatar);
