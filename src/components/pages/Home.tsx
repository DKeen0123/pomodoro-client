import React from 'react';
import Axios from 'axios';
import { API_HOST } from '../../constants/api';
import UserContext from '../../contexts/UserContext';
import Timer from '../ui/Timer';
import ErrorNotice from '../ui/ErrorNotice';
import ProjectList from '../ui/ProjectList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCog } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  // original amount, reset when user restarts timer
  const { userData } = React.useContext(UserContext);
  const [startCountdown, setStartCountdown] = React.useState(false);
  const [
    originalCountdownFromInSeconds,
    setOriginalCountdownFromInSeconds,
  ] = React.useState(1500);
  const [countdownFromInSeconds, setCountdownFromInSeconds] = React.useState(
    originalCountdownFromInSeconds
  );
  const [timerEnded, setTimerEnded] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState('');
  const [error, setError] = React.useState<null | string>(null);

  React.useEffect(() => {
    if (countdownFromInSeconds === 0) {
      setTimerEnded(true);
    }
  }, [countdownFromInSeconds]);

  React.useEffect(() => {});

  React.useEffect(() => {
    const createPomo = async () => {
      try {
        await Axios.post(
          `${API_HOST}/pomodoros`,
          {
            name: currentProject,
            lengthInSeconds: originalCountdownFromInSeconds,
          },
          {
            headers: { 'x-auth-token': userData.token },
          }
        );
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    };

    if (timerEnded) {
      createPomo();
      setTimerEnded(false);
    }
  }, [
    timerEnded,
    currentProject,
    userData.token,
    originalCountdownFromInSeconds,
  ]);

  const handleStartFocusing = () => {
    setStartCountdown(true);
    setShowTimer(true);
    setOriginalCountdownFromInSeconds(countdownFromInSeconds);
  };

  return (
    <div className="sm:mx-auto mx-2 my-0 lg:w-5/12 md:w-8/12 mt-12 sm:w-10/12">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(null)} />
      )}
      <div className="shadow-md rounded-md">
        <div className="bg-white p-4 flex justify-between rounded-t-md ">
          <FontAwesomeIcon
            onClick={() => setShowTimer(true)}
            size="2x"
            className={`${
              showTimer ? 'text-gray-800' : 'text-gray-600'
            } cursor-pointer`}
            icon={faClock}
          />
          <FontAwesomeIcon
            onClick={() => setShowTimer(false)}
            size="2x"
            color=""
            className={`${
              !showTimer ? 'text-gray-800' : 'text-gray-600'
            } cursor-pointer`}
            icon={faCog}
          />
        </div>
        <div className="bg-indigo-100 p-4 rounded-b-md">
          {showTimer ? (
            <>
              <Timer
                setCountdownFromInSeconds={setCountdownFromInSeconds}
                countdownFromInSeconds={countdownFromInSeconds}
                startCountdown={startCountdown}
              />
              <button
                className="bg-indigo-600 p-2 text-white hover:bg-indigo-700 w-full rounded-md text-2xl font-bold"
                onClick={() => setStartCountdown((prevState) => !prevState)}
              >
                {startCountdown ? 'Pause' : 'Start'}
              </button>
            </>
          ) : (
            <div>
              <h3 className="mb-2 text-gray-600 text-xl font-semibold">
                How long do you want to focus for?
              </h3>
              <div className="bg-white p-3 rounded-md text-gray-500 text-xl flex  mb-4 justify-between">
                <button
                  className="focus:outline-none focus:shadow-outline w-full mr-2 hover:text-gray-700"
                  onClick={() => setCountdownFromInSeconds(900)}
                >
                  15 mins
                </button>
                <div className="border-r-2"></div>
                <button
                  className="focus:outline-none focus:shadow-outline w-full mr-2 hover:text-gray-700"
                  onClick={() => setCountdownFromInSeconds(1500)}
                >
                  25 mins
                </button>
                <div className="border-r-2"></div>
                <button
                  className="focus:outline-none focus:shadow-outline w-full hover:text-gray-700"
                  onClick={() => setCountdownFromInSeconds(1800)}
                >
                  30 mins
                </button>
              </div>
              <button onClick={handleStartFocusing} className="button">
                Start Focusing
              </button>
            </div>
          )}
        </div>
      </div>
      <ProjectList setCurrentProject={setCurrentProject} />
    </div>
  );
};

export default Home;
