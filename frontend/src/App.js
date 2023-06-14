import { useState } from 'react'
import Haiku from './Haiku';
import Keyboard from './Keyboard';

import { useDailyHaiku } from './hooks';
import { addHints, generateHintSequence, FREE_HINT_CHARS } from './util';

function App() {
  const { haikuString, error } = useDailyHaiku()
  const [input, setInput] = useState("")
  const [hints, setHints] = useState(FREE_HINT_CHARS)

  const haikuWithHints = addHints(haikuString.split(""), hints)
  
  const addInput = character => {
    setInput(input => input + character)
  }

  const removeInput = () => {
    setInput(input => input.slice(0, -1))
  }

  const addHint = () => {
    const hintSequence = generateHintSequence(haikuString, haikuWithHints, input)
    setHints(hints => new Set([...hints, hintSequence[0]]))
    setInput("")
  }

  const giveup = () => {
    setHints(new Set("abcdefghijklmnopqrstuvwxyz"))
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
        <div className="helpActions">
          <button onClick={addHint}>Hint</button>
          <button onClick={giveup}>Give up</button>
        </div>
        <br />
        <Keyboard selectedCharacters={hints} addCharacter={addInput} removeCharacter={removeInput} />
      </div>
    )
}

export default App;
