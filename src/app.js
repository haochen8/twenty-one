/**
 * @file The starting point of the application.
 * @module src/app.js
 * @author Hao Chen <hc222ig@student.lnu.se>
 * @version 2.0.0
 */

import { CardTable } from './cardTable.js'

/**
 *
 */
class Error extends global.Error {
  /**
   * Creates an instance of GameError.
   *
   * @param {string} message - The error message.
   * @param {number} errorCode - The error code.
   */
  constructor (message, errorCode) {
    super(message)
    this.errorCode = errorCode
  }
}

const args = process.argv.slice(2)

let numberOfPlayers = 3
let numberOfRounds

if (args.length === 0) {
  numberOfRounds = 1
} else if (args.length === 1) {
  numberOfRounds = Number(args[0])
  numberOfPlayers = 3
} else {
  numberOfRounds = Number(args[0])
  numberOfPlayers = Number(args[1])
}

if (numberOfRounds < 1 || numberOfRounds > 5 || !Number.isInteger(numberOfRounds)) {
  throw new Error('Invalid number of rounds', 26)
}

if (![1, 2, 3, 4, 5, 6, 7, 52].includes(numberOfPlayers) || !Number.isInteger(numberOfPlayers)) {
  throw new Error('Invalid number of players', 27)
}

if (numberOfPlayers === 52 && numberOfRounds >= 1) {
  throw new Error('Too few playing cards in the deck', 28)
}

try {
  const cardTable = new CardTable(numberOfPlayers)
  cardTable.playRounds(numberOfRounds)
} catch (e) {
  if (e instanceof Error) {
    console.error('\nError:', e.message)
    console.error(`errorCode: ${e.errorCode}`)
    process.exit(e.errorCode)
  } else {
    console.error(e)
    process.exit(1)
  }
}
process.exit(0)
