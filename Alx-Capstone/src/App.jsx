import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-200 to-red-400 p-4">
      <PomodoroTimer />
    </div>
  );
};

export default App;
