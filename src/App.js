import './style.scss';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import ShuffleCards from './ShuffleCard';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';

export default function App() {
  const [data, setData] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    var getCard = async () => {
      let test1 = await fetch(
        'https://api.github.com/repos/facebook/react/contributors'
      );
      let test2 = await test1.json();
      let val = test2.slice(0, 6);
      let finalVal = ShuffleCards(val.concat(val));
      setData(finalVal);
    };
    getCard();
  }, []);
  const evaluate = () => {
    const [first, second] = openCards;
    if (data[first].login === data[second].login) {
      setOpenCards([]);
      data[first].clearCard = true;
      data[second].clearCard = true;
      setData([...data]);
      setScore((prev) => prev + 100);
      return;
    } else {
      setOpenCards([]);
    }
  };
  useEffect(() => {
    checkCompletion();
  }, [data]);
  const checkCompletion = () => {
    const filterVal = data.filter((x) => x.clearCard);
    if (data.length === filterVal.length) {
      console.log('HHHHHHHHHHHHH', showModal);
      setShowModal(true);
    }
  };
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 1000);
    }
    return () => clearTimeout(timeout);
  }, [openCards]);
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
    } else {
      setOpenCards([index]);
    }
  };
  const handleRestart = () => {
    setData(ShuffleCards(data.concat(data)));
    setOpenCards([]);
    setShowModal(false);
    setScore(0);
    setTime(0);
  };
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };
  const startTimer = () => {
    setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };
  useEffect(() => {
    if (time < 60) {
      setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [time]);
  return (
    <>
      <div className="parent">
        <div className="container">
          {data &&
            data.map((x, index) => {
              return (
                <Avatar
                  card={x}
                  index={index}
                  isFlipped={checkIsFlipped(index)}
                  onClick={handleCardClick}
                  inActive={x.clearCard && 'inActive'}
                />
              );
            })}
        </div>
        <div className="timer">
          <div className="outer">
            Total time
            <div>60 sec</div>
            Time elapsed
            <div>{time} sec</div>
          </div>
          <div className="outer">
            Score
            <div>{score}</div>
          </div>
        </div>
      </div>
      <button onClick={() => startTimer()}>Start</button>
      <Dialog open={showModal}>
        <DialogTitle>Hurray!!! You completed the challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You completed the game. Your best score is {score}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRestart()} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
