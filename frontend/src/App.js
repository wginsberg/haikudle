import { useState } from 'react'
import Haiku from './Haiku';
import Keyboard from './Keyboard';

import useDailyHaiku from './hooks';
import { addHints, FREE_HINT_CHARS } from './util';

function App() {
  const { haikuString, error } = useDailyHaiku()
  const [input, setInput] = useState("")

  const haikuWithHints = addHints(haikuString.split(""), FREE_HINT_CHARS)
  
  const addInput = character => {
    setInput(input => input + character)
  }

  const removeInput = () => {
    setInput(input => input.slice(0, -1))
  }

  return error
    ? (<p>Something went wrong :/</p>)
    : (
      <div className="app">
        <Haiku
          input={input}
          haiku={haikuString.split("")}
          haikuCensored={haikuWithHints}
        />
        <br />
        <Keyboard selectedCharacters={FREE_HINT_CHARS} addCharacter={addInput} removeCharacter={removeInput} />
      </div>
    )
}

export default App;
