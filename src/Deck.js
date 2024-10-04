/**
 * @file Module for the class Deck.
 * @module src/Deck.js
 * @author Hao Chen <hc222ig@student.lnu.se>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a deck.
 */
export class Deck {
  /**
   * Array of playing cards.
   *
   * @type {PlayingCard[]}
   */
  #playingCards

  /**
   * Initializes a new instance of the Deck class.
   */
  constructor () {
    this.#playingCards = []

    for (const suit of PlayingCard.suits) {
      for (const rank of PlayingCard.ranks) {
        this.#playingCards.push(new PlayingCard(rank, suit))
      }
    }
  }

  /**
   * Gets numbers of card in deck.
   *
   * @returns {number} - Number of card in deck.
   */
  get count () {
    return this.#playingCards.length
  }

  /**
   * Shuffles the array of playing cards in place.
   */
  shuffle () {
    for (let i = this.#playingCards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.#playingCards[i], this.#playingCards[randomIndex]] = [this.#playingCards[randomIndex], this.#playingCards[i]]
    }
  }

  /**
   * Deals the top card of deck.
   *
   * @returns {PlayingCard[]} - Top card of deck.
   */
  deal () {
    return this.#playingCards.pop()
  }

  /**
   * Adds card to deck.
   *
   * @param {PlayingCard[]} cards - Card adds to deck.
   */
  add (cards) {
    if (cards instanceof PlayingCard) {
      this.#playingCards.push(cards)
    } else if (Array.isArray(cards) && cards.every(card => card instanceof PlayingCard)) {
      this.#playingCards.push(...cards)
    } else {
      console.error('Invalid card. Card must be of playing cards.')
    }
  }

  /**
   * Returns a string representing the object.
   *
   * @returns {string} A string that represents the current object.
   */
  toString () {
    return this.#playingCards.join(' ')
  }
}
