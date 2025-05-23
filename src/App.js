import React from 'react';
import BottomSheet from './components/BottomSheet';

function App() {
  return (
    <div className="min-h-screen bg-grayLight flex flex-col">
      <header className="py-6 bg-white shadow-soft-md">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-grayDark select-none">
          FocusMate
        </h1>
        <p className="text-center text-gray-500 mt-1 text-sm sm:text-base max-w-md mx-auto px-4">
          Your productivity companion with smart chat & task management
        </p>
      </header>

      <main className="flex-grow flex justify-center items-center px-4 sm:px-8">
        <div className="w-full max-w-md rounded-lg shadow-soft-md bg-white overflow-hidden">
          <BottomSheet />
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-gray-400 select-none">
        &copy; {new Date().getFullYear()} FocusMate. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
