import { addHints, charactersTo2DStringArray } from "./util"

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
