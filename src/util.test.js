import { addHints, charactersTo2DStringArray, addInputToHaiku, generateHintSequence, isSolved, isHintAllowed, incrementWinStats, canAddInput, subtractDays, getRandomHint, GIVEN, GUESSED } from './util'

test('addHints', () => {
  const rawHaiku = "test / haiku / ai'nt one. $"
  const haikuArray = rawHaiku.split('')
  const hints = 'neorst'

  const actual = addHints(haikuArray, hints)
  const expected = [
    't', 'e', 's', 't', ' ', '/', ' ',
    '*', '*', '*', '*', '*', ' ', '/', ' ',
    '*', '*', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
  ]

  expect(actual).toEqual(expected)
})

test('charactersTo2DArray', () => {
  const characters = [
    't', 'e', 's', 't', ' ', '/', ' ',
    '*', '*', '*', '*', '*', ' ', '/', ' ',
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

test('addInput', () => {
  const haiku = [
    '*', '*', 's', 't', ' ', '/', ' ',
    '*', '*', '*', '*', '*', ' ', '/', ' ',
    '*', '*', '\'', 'n', 't', ' ', 'o', '*', 'e', '.', ' ', '$'
  ]
  const input = 'tehaikuai'

  const actual = addInputToHaiku(haiku, input)
  const expectedCharacters = [
    't', 'e', 's', 't', ' ', '/', ' ',
    'h', 'a', 'i', 'k', 'u', ' ', '/', ' ',
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

describe('generateHintSequence', () => {
  it('works with no input', () => {
    const haiku = [
      't', 'e', 's', 't'
    ]

    const censoredHaiku = [
      't', '*', 's', 't'
    ]

    const actual = generateHintSequence(haiku, censoredHaiku, '')
    const expected = 'e'

    expect(actual).toEqual(expected)
  })

  it('provides the first 3 incorrectly guessed letters', () => {
    const haiku = [
      't', 'e', 's', 't', ' ', '/', ' ',
      'h', 'a', 'i', 'k', 'u', ' ', '/', ' ',
      'a', 'i', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
    ]

    const censoredHaiku = [
      't', 'e', 's', 't', ' ', '/', ' ',
      '*', '*', '*', '*', '*', ' ', '/', ' ',
      '*', '*', '\'', 'n', 't', ' ', '*', 'n', 'e', '.', ' ', '$'
    ]

    {
      const input = 'abc'
      const actual = generateHintSequence(haiku, censoredHaiku, input)
      const expected = 'ahi'
      expect(actual).toEqual(expected)
    }

    {
      const input = 'haiku'
      const actual = generateHintSequence(haiku, censoredHaiku, input)
      const expected = 'aio'
      expect(actual).toEqual(expected)
    }

    {
      const input = 'aaa'
      const actual = generateHintSequence(haiku, censoredHaiku, input)
      const expected = 'hik'
      expect(actual).toEqual(expected)
    }

    {
      const input = 'haikxx'
      const actual = generateHintSequence(haiku, censoredHaiku, input)
      const expected = 'aiu'
      expect(actual).toEqual(expected)
    }
  })
})

describe('isSolved', () => {
  const haiku = "test / haiku / ai'nt one. $"

  it('returns true when all characters are entered correctly', () => {
    const censoredHaiku = [
      't', 'e', 's', 't', ' ', '/', ' ',
      'h', 'a', 'i', 'k', 'u', ' ', '/', ' ',
      'a', 'i', '\'', 'n', 't', ' ', 'o', 'n', 'e', '.', ' ', '$'
    ]

    const actual = isSolved(censoredHaiku, haiku)

    expect(actual).toEqual(true)
  })

  it('returns false when a character is entered incorrectly', () => {
    const censoredHaiku = [
      'b', 'e', 's', 't', ' ', '/', ' ',
      'h', 'a', 'i', 'k', 'u', ' ', '/', ' ',
      'a', 'i', '\'', 'n', 't', ' ', 'b', 'a', 'd', '.', ' ', '$'
    ]

    const actual = isSolved(censoredHaiku, haiku)

    expect(actual).toEqual(false)
  })

  it("returns false when any '*' is present", () => {
    const censoredHaiku = [
      't', 'e', 's', 't', ' ', '/', ' ',
      '*', '*', '*', '*', '*', ' ', '/', ' ',
      '*', '*', '\'', 'n', 't', ' ', '*', 'n', 'e', '.', ' ', '$'
    ]

    const actual = isSolved(censoredHaiku, haiku)

    expect(actual).toEqual(false)
  })
})

describe('isHintAlowed', () => {
  const haiku = "test / haiku / ai'nt one. $"

  it('provides a hint when more than 5 distinct characters are remaining', () => {
    const censoredHaiku = [
      '*', '*', '*', 't', ' ', '/', ' ',
      '*', 'a', 'i', 'k', 'u', ' ', '/', ' ',
      '*', '*', '\'', 'n', 't', ' ', '*', 'n', 'e', '.', ' ', '$'
    ]

    const actual = isHintAllowed(haiku, censoredHaiku)
    expect(actual).toEqual(true)
  })

  it('does not provide a hint when 5 distinct characters are remaining', () => {
    const censoredHaiku = [
      '*', 'e', 's', 't', ' ', '/', ' ',
      '*', 'a', 'i', 'k', 'u', ' ', '/', ' ',
      '*', '*', '\'', 'n', 't', ' ', '*', 'n', 'e', '.', ' ', '$'
    ]

    const actual = isHintAllowed(haiku, censoredHaiku)
    expect(actual).toEqual(false)
  })
})

describe('incrementWinStats', () => {
  it('increases the total wins by one', () => {
    expect(incrementWinStats({ today: '2023-01-01' }).totalWins).toEqual(1)
    expect(incrementWinStats({ today: '2023-02-01', streakStart: '2023-01-01', streakEnd: '2023-01-06', totalWins: 15 }).totalWins).toEqual(16)
  })

  it('sets a new streak', () => {
    const { streakStart, streakEnd } = incrementWinStats({ today: '2023-01-01' })

    expect(streakStart).toEqual('2023-01-01')
    expect(streakEnd).toEqual('2023-01-01')
  })

  it('resets an old streak', () => {
    const oldStreakStart = '2023-01-01'
    const oldStreakEnd = '2023-01-05'
    const today = '2023-06-01'

    const { streakStart, streakEnd } = incrementWinStats({ today, streakStart: oldStreakStart, streakEnd: oldStreakEnd })

    expect(streakStart).toEqual(today)
    expect(streakEnd).toEqual(today)
  })

  it('continues an existing streak', () => {
    const oldStreakStart = '2023-06-01'
    const oldStreakEnd = '2023-06-05'
    const today = '2023-06-06'

    const { streakStart, streakEnd } = incrementWinStats({ today, streakStart: oldStreakStart, streakEnd: oldStreakEnd })

    expect(streakStart).toEqual(oldStreakStart)
    expect(streakEnd).toEqual(today)
  })

  it('increments total wins idempotently', () => {
    const stats = {
      streakStart: '2023-06-01',
      streakEnd: '2023-06-05',
      today: '2023-06-06',
      totalWins: 5
    }

    const newStats = incrementWinStats(stats)
    expect(newStats.totalWins).toEqual(6)
    expect(incrementWinStats(newStats).totalWins).toEqual(6)
  })
})

test('subtractDays', () => {
  expect(subtractDays('2000-01-01', '2000-01-02')).toEqual(1)
  expect(subtractDays('2000-01-01', '2000-02-01')).toEqual(31)
})

describe('canAddInput', () => {
  it('returns true when space for an input remains', () => {
    const censoredHaiku = [
      '*', 'e', 's', 't', ' ', '/', ' ',
      '*', '*', 'i', 'k', '*', ' ', '/', ' ',
      '*', 'i', '\'', 'n', '*', ' ', 'o', 'n', 'e', '.', ' ', '$'
    ]

    const actual = canAddInput(censoredHaiku, 'thx')
    expect(actual).toBeTruthy()
  })

  it('returns false when the no space for an input remains', () => {
    const censoredHaiku = [
      '*', 'e', 's', 't', ' ', '/', ' ',
      '*', '*', 'i', 'k', '*', ' ', '/', ' ',
      '*', 'i', '\'', 'n', '*', ' ', 'o', 'n', 'e', '.', ' ', '$'
    ]

    const actual = canAddInput(censoredHaiku, 'thxxat')
    expect(actual).toBeFalsy()
  })
})

test('getRandomHint', () => {
  {
    const actual = getRandomHint('a')
    expect(actual).toEqual('a')
  }
  {
    const actual = getRandomHint('xyz')
    expect(actual).toMatch(/[xyz]/)
  }
})
