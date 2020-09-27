import React from 'react';

interface Props {
  countdownFromInSeconds: number;
  startCountdown: boolean;
}

const Timer: React.FC<Props> = ({ countdownFromInSeconds, startCountdown }) => {
  const [minutes, setMinutes] = React.useState(
    Math.floor(countdownFromInSeconds / 60)
  );
  const [seconds, setSeconds] = React.useState(
    countdownFromInSeconds - minutes * 60
  );

  React.useEffect(() => {
    const countdownSeconds = () => {
      return setInterval(() => setSeconds(seconds - 1), 1000);
    };

    if (startCountdown) {
      if (seconds > 0) {
        const reduceSeconds = countdownSeconds();
        return () => clearInterval(reduceSeconds);
      }

      if (minutes > 0) {
        setSeconds(59);
        setMinutes((prevCount) => prevCount - 1);
      }
    }
  }, [seconds, minutes, startCountdown]);

  return (
    <div>
      <span>{minutes}</span>:
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Timer;
