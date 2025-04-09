import React, { useState, useEffect } from 'react';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsWorkTime((prev) => !prev);
      setTimeLeft(isWorkTime ? BREAK_TIME : WORK_TIME);
      if (isWorkTime) setCycles((prev) => prev + 1);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkTime]);

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(WORK_TIME);
    setIsWorkTime(true);
    setCycles(0);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Pomodoro Timer</h1>
      <div className="text-6xl font-mono text-gray-800 mb-6">
        {formatTime(timeLeft)}
      </div>
      <p className="text-lg mb-4">
        {isWorkTime ? 'Focus Time' : 'Break Time'} | Cycles Completed: {cycles}
      </p>
      <div className="flex justify-center gap-4">
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600"
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
