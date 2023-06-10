import './App.css';
import Haiku from './Haiku';

import useDailyHaiku from './hooks';
import { addHints, FREE_HINT_CHARS } from './util';

function App() {
  const { haikuString, error } = useDailyHaiku()

  const haikuWithHints = addHints(haikuString.split(""), FREE_HINT_CHARS)

  return error
    ? (<p>Something went wrong :/</p>)
    : (
      <>
        <Haiku characters={haikuWithHints} />
      </>
    )
}

export default App;
