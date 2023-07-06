import logo from './logo.svg';
import './App.css';
import Textarea from './components/Textarea';
import { useState, useEffect } from 'react';
import TextareaDisabled from './components/TextareaDisabled';

function App() {
  const [text, setText] = useState("");

  function handleTextState(newText) {
    setText(newText);
    console.log("handleTextState:_ ", newText);
  }

  return (
    <div className="App">

      <div className='flex w-full'>
        <Textarea
          setText={handleTextState}
        />
        <TextareaDisabled
          text={text}
        />
      </div>
    </div>
  );
}

export default App;
