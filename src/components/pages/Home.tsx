import React from 'react';
import Timer from '../ui/Timer';
const Home = () => {
  const [startCountdown, setStartCountdown] = React.useState(false);

  return (
    <>
      <Timer countdownFromInSeconds={488} startCountdown={startCountdown} />
      <button onClick={() => setStartCountdown((prevState) => !prevState)}>
        {startCountdown ? 'stop' : 'start'}
      </button>
    </>
  );
};

export default Home;
