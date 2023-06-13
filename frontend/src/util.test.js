import { addHints, charactersTo2DStringArray, addInputToHaiku } from "./util"

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
  const expected = [
    't', 'e', 's', 't', ' ', '/', ' ',
    'h', 'a', 'i', 'k', 'u', ' ', '/',' ',
    'a', 'i', '\'', 'n', 't', ' ', 'o', '*', 'e', '.', ' ', '$'
  ]

  expect(actual).toEqual(expected)
})
