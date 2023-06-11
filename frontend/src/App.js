import './App.css';
import Haiku from './Haiku';
import Keyboard from './Keyboard';

import useDailyHaiku from './hooks';
import { addHints, FREE_HINT_CHARS } from './util';

function App() {
  const { haikuString, error } = useDailyHaiku()

  const haikuWithHints = addHints(haikuString.split(""), FREE_HINT_CHARS)

  return error
    ? (<p>Something went wrong :/</p>)
    : (
      <div class="app">
        <Haiku characters={haikuWithHints} />
        <br />
        <Keyboard selectedCharacters={FREE_HINT_CHARS}/>
      </div>
    )
}

export default App;
