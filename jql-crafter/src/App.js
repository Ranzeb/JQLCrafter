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
      <div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-black sm:text-6xl">
          Generate Jira Query Language (JQL)
        </h1>
        <p className="mt-6 text-lg leading-8 text-black-300">
          Describe the JQL query that you need below
        </p>
      </div>
      <div className='flex w-full'>
        <div className='block w-full'>
          <div>
            <h1 className="text-lg text-left px-20 font-bold tracking-tight text-black sm:text-lg">
              Your description
            </h1>
          </div>
          <Textarea
            setText={handleTextState}
          />
        </div>
        <div className='block w-full'>
          <div>
            <h1 className="text-lg text-left px-20 font-bold tracking-tight text-black sm:text-lg">
              Your JQL query
            </h1>
          </div>

          <TextareaDisabled
            text={text}
          />
        </div>
      </div>
    </div >
  );
}

export default App;
