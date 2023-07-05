import logo from './logo.svg';
import './App.css';
import Textarea from './components/Textarea';
import { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App">

      <div className='flex w-full'>
        <Textarea
          insertable={true} />
        <Textarea
          insertable={false} />
      </div>


    </div>
  );
}

export default App;
