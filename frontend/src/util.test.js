import { addHints, charactersTo2DStringArray, addInputToHaiku, generateHintSequence, GIVEN, GUESSED } from "./util"

test("addHints", () => {
    const rawHaiku = "test / haiku / ai'nt one. $"
    const haikuArray = rawHaiku.split("")
    const hints = "neorst"

    const actual = addHints(haikuArray, hints)
    const expected = [
        't', 'e', 's', 't', ' ', '/', ' ',
        '*', '*', '*', '*', '*', ' ', '/',' ',
        '*', '*', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
      ]

      expect(actual).toEqual(expected)
})

test("charactersTo2DArray", () => {
    const characters = [
        't', 'e', 's', 't', ' ', '/', ' ',
        '*', '*', '*', '*', '*', ' ', '/',' ',
        '*', '*', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
      ]

      const actual = charactersTo2DStringArray(characters)
      const expected = [
        ['test'],
        ['*****'],
        ['**\'nt', 'one.']
      ]

      expect(actual).toEqual(expected)
})

test("addInput", () => {
  const haiku = [
    '*', '*', 's', 't', ' ', '/', ' ',
    '*', '*', '*', '*', '*', ' ', '/',' ',
    '*', '*', '\'', 'n', 't', ' ', 'o', '*', 'e', '.', ' ', '$'
  ]
  const input = "tehaikuai"

  const actual = addInputToHaiku(haiku, input)
  const expectedCharacters = [
    't', 'e', 's', 't', ' ', '/', ' ',
    'h', 'a', 'i', 'k', 'u', ' ', '/',' ',
    'a', 'i', '\'', 'n', 't', ' ', 'o', '*', 'e', '.', ' ', '$'
  ]
  const expectedCharacterMeta = [
    GUESSED, GUESSED, GIVEN, GIVEN, ' ', '/', ' ',
    GUESSED, GUESSED, GUESSED, GUESSED, GUESSED, ' ', '/', ' ',
    GUESSED, GUESSED, GIVEN, GIVEN, GIVEN, ' ', GIVEN, '*', GIVEN, GIVEN, ' ', '$'
  ]

  expect(actual.characters.length).toEqual(expectedCharacters.length)
  expect(actual.meta.length).toEqual(expectedCharacterMeta.length)

  expect(actual.characters).toEqual(expectedCharacters)
  expect(actual.meta).toEqual(expectedCharacterMeta)
})

test("generateHintSequence", () => {
  const haiku = [
    't', 'e', 's', 't', ' ', '/', ' ',
    'h', 'a', 'i', 'k', 'u', ' ', '/',' ',
    'a', 'i', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
  ]

  const censoredHaiku = [
    't', 'e', 's', 't', ' ', '/', ' ',
    '*', '*', '*', '*', '*', ' ', '/',' ',
    '*', '*', '\'', 'n', 't', ' ', '*', 'n', 'e', '.', ' ', '$'
  ]
  
  const input = "boioka"

  const actual = generateHintSequence(haiku, censoredHaiku, input)
  const expected = "ahikou"

  expect(actual).toEqual(expected)
})