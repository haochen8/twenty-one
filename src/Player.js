/**
 * @file Module for the class Player.
 * @module src/Player.js
 * @author Hao Chen <hc222ig@student.lnu.se>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'

/**
 * Represents number of players.
 */
export class Player {
  /**
   * Number of card in player hand.
   *
   * @type {PlayingCard[]}
   */
  #hand

  /**
   * Name of player
   *
   * @type {string} The name of player
   */
  #nickname

  /**
   * Value of player standing hand.
   *
   * @type {number} Standing hand value
   */
  #standValue

  /**
   * Initializes a new instance of the Player class.
   *
   * @param {string} nickname - The player's nickname
   * @param {number} standValue - The player's standing hand value
   */
  constructor (nickname, standValue = 14) {
    this.#hand = []
    this.#nickname = nickname
    this.#standValue = standValue
  }

  /**
   * Gets true or false if player continues playing.
   *
   * @returns {boolean} True/false if continue playing.
   */
  get canHit () {
    return this.valueOf() <= this.#standValue
  }

  /**
   * Gets true if player's hand bigger than 21, otherwise false.
   *
   * @returns {boolean} True/false if player's hand bigger than 21.
   */
  get isBusted () {
    return this.valueOf() > 21
  }

  /**
   * Gets true if player is natural winner, otherwise false.
   *
   * @returns {boolean} True/false if player is natural winner.
   */
  get isNaturalWinner () {
    return this.valueOf() === 21 || (this.#hand.length === 5 && this.valueOf() < 21)
  }

  /**
   * Gets the player's nickname.
   *
   * @returns {string} The player's nickname.
   */
  get nickname () {
    return this.#nickname
  }

  /**
   * Adds card to player's hand.
   *
   * @param {PlayingCard} card - Card adds to player's hand.
   */
  addToHand (card) {
    if (card instanceof PlayingCard) {
      this.#hand.push(card)
    } else {
      throw new Error('Invalid card. Card must be of playing cards.')
    }
  }

  /**
   * Discard all cards from player's hand and returns them.
   *
   * @returns {PlayingCard[]} Array of discarded cards.
   */
  discardHand () {
    const discardHands = this.#hand.splice(0, this.#hand.length)
    return discardHands
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    if (this.#hand.length === 0) {
      return '-'
    } else {
      return `${this.#hand.join(' ')}`
    }
  }

  /**
   * Calculates the value of the player's hand.
   *
   * @returns {number} The value of the player's hand.
   */
  valueOf () {
    let totalHandValue = 0
    let numOfAces = 0
    for (const card of this.#hand) {
      const cardValue = card.valueOf()
      totalHandValue += cardValue
      if (cardValue === 1) {
        numOfAces++
      }
    }
    while (numOfAces > 0 && totalHandValue <= 7) {
      totalHandValue += 13
      numOfAces--
    }
    return totalHandValue
  }
}
