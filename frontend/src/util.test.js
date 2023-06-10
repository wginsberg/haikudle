import { censorHaiku, addHints } from "./util"

test('censorHaiku', () => {
    const rawHaiku = "test / haiku / ai'nt one. $"
    const haikuArray = rawHaiku.split("")

    const actual = censorHaiku(haikuArray)
    const expected = [
        '*', '*', '*', '*', ' ', '/', ' ',
        '*', '*', '*', '*', '*', ' ', '/',' ',
        '*', '*', '\'', '*', '*', ' ', '*', '*', '*', '.', ' ', '$'
      ]
    
      expect(actual).toEqual(expected)
});

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
