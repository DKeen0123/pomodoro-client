import React from 'react';

interface Props {
  countdownFromInSeconds: number;
  startCountdown: boolean;
  setCountdownFromInSeconds: (seconds: number) => void;
}

const Timer: React.FC<Props> = ({
  countdownFromInSeconds,
  startCountdown,
  setCountdownFromInSeconds,
}) => {
  const [minutes, setMinutes] = React.useState(
    Math.floor(countdownFromInSeconds / 60)
  );

  const [seconds, setSeconds] = React.useState(
    countdownFromInSeconds - minutes * 60
  );

  React.useEffect(() => {
    const minutesToSet = Math.floor(countdownFromInSeconds / 60);
    const secondsToSet = countdownFromInSeconds - minutesToSet * 60;

    setMinutes(minutesToSet);
    setSeconds(secondsToSet);
  }, [countdownFromInSeconds]);

  React.useEffect(() => {
    const countdownSeconds = () => {
      return setInterval(
        () => setCountdownFromInSeconds(countdownFromInSeconds - 1),
        1000
      );
    };

    if (startCountdown && countdownFromInSeconds > 0) {
      const reduceSeconds = countdownSeconds();
      return () => clearInterval(reduceSeconds);
    }
  }, [countdownFromInSeconds, setCountdownFromInSeconds, startCountdown]);

  return (
    <div className="text-center mb-4 text-5xl font-bold text-gray-700">
      <span>{minutes}</span>:
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Timer;
