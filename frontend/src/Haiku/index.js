import classnames from 'classnames'
import Tile from './Tile'
import { addInputToHaiku, charactersTo2DStringArray } from '../util'

export default function Haiku ({ haiku, haikuCensored, input }) {
  const { characters, meta } = addInputToHaiku(haikuCensored, input)

  const wordArray2d = charactersTo2DStringArray(haiku)
  const censoredWordArray2d = charactersTo2DStringArray(characters)
  const metaArray2d = charactersTo2DStringArray(meta)

  const currentLine = metaArray2d.findIndex(line => line.find(word => word.includes('*')))
  const activeLine = currentLine === -1 ? 3 : currentLine

  return (
    <div className='haiku'>
      {censoredWordArray2d.map((line, i) => {
        const isActiveLine = i <= activeLine
        const className = classnames('line', { 'line-inactive': !isActiveLine })
        return (
          <div className={className} key={i}>
            {line.map((word, j) => {
              const isComplete = word === wordArray2d[i][j]

              return (
                <span className='word' key={j}>
                  {word
                    .split('')
                    .map((character, k) => {
                      const isTileCorrect = activeLine > i && character === wordArray2d[i][j][k]
                      return (
                        <Tile
                          character={character}
                          tileIsCorrect={isTileCorrect}
                          wordIsComplete={isComplete}
                          meta={metaArray2d[i][j][k]}
                          key={`${i}-${j}-${k}`}
                        />
                      )
                    })}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
