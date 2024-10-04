/**
 * @file Module for the CardTable.
 * @module src/cardTable.js
 * @author Hao Chen <hc222ig@student.lnu.se>
 * @version 2.0.0
 */

import { PlayingCard } from './PlayingCard.js'
import { Player } from './Player.js'
import { Deck } from './Deck.js'

/**
 * Represents a card table.
 */
export class CardTable {
  /**
   * Represent the dealer.
   *
   * @type {Player}
   */
  #dealer

  /**
   * Represent the card deck.
   *
   * @type {Deck}
   */
  #deck

  /**
   * Represent the discard pile.
   *
   * @type {PlayingCard[]}
   */
  #discardPile

  /**
   * Represent the players.
   *
   * @type {Player[]}
   */
  #players

  /**
   * Initializes a new instance of the CardTable class.
   *
   * @param {number} numberOfPlayers - The number of players.
   */
  constructor (numberOfPlayers) {
    if (typeof numberOfPlayers !== 'number' || numberOfPlayers < 1) {
      throw new Error('Invalid number of players.')
    }

    this.#dealer = new Player('Dealer')
    this.#deck = new Deck()
    this.#discardPile = []
    this.#players = []

    for (let i = 0; i < numberOfPlayers; i++) {
      this.#players.push(new Player(`Player #${i + 1}`))
    }
  }

  /**
   * Compare the hands of dealer and the player.
   *
   * @param {Player} player - The player object.
   * @param {Player} dealer - The dealer (player) object.
   * @returns {Player} - Returns the player with highest value, if tie return the dealer.
   */
  #compareHands (player, dealer) {
    if (!(dealer instanceof Player) || !(player instanceof Player)) {
      throw new Error('The player and dealer must be instances of the Player class.')
    }
    if ((player.valueOf() > dealer.valueOf() && !player.isBusted)) {
      return player
    }
    if (player.valueOf() === dealer.valueOf()) {
      return dealer
    }
    if (dealer.isBusted && !player.isBusted) {
      return player
    }
    return dealer
  }

  /**
   * Deals the top card of deck.
   *
   * @returns {PlayingCard[]} - Top card of deck.
   */
  #deal () {
    return this.#deck.deal()
  }

  /**
   * A play out round.
   *
   * @param {Player} player - The player object.
   * @param {Player} dealer - The dealer (player) object.
   */
  #playOut (player, dealer) {
    while (player.canHit && !player.isNaturalWinner) {
      if (this.#deck.count === 1) {
        this.#deck.add(this.#discardPile)
        this.#deck.shuffle()
      }
      player.addToHand(this.#deal())
      if (player.isBusted || player.isNaturalWinner) {
        break
      }
    }

    this.#discardPile.push(...this.#dealer.discardHand())
    if (!player.isBusted && !player.isNaturalWinner) {
      while (dealer.canHit && !dealer.isNaturalWinner) {
        if (this.#deck.count === 1) {
          this.#deck.add(this.#discardPile)
          this.#deck.shuffle()
        }
        dealer.addToHand(this.#deal())
        if (dealer.isBusted || dealer.isNaturalWinner) {
          break
        }
      }
    }
  }

  /**
   * Play a number of rounds.
   *
   * @param {number} numberOfRounds - The number of rounds to play.
   */
  playRounds (numberOfRounds) {
    this.#deck.add(this.#discardPile)
    this.#deck.shuffle()

    for (let i = 0; i < numberOfRounds; i++) {
      const roundResult = []
      if (this.#deck.count === 1) {
        this.#deck.add(this.#discardPile)
        this.#deck.shuffle()
      }

      for (const player of this.#players) {
        this.#discardPile.push(...player.discardHand())
      }
      console.log(`--- Round #${i + 1} ---------------\n`)

      for (const player of this.#players) {
        this.#playOut(player, this.#dealer)
        const winner = this.#compareHands(player, this.#dealer)
        roundResult.push(winner)

        if (player.isBusted) {
          console.log(`${player.nickname}:`, player.toString(), `(${player.valueOf()}) BUSTED!`)
        } else {
          console.log(`${player.nickname}:`, player.toString(), `(${player.valueOf()})`)
        }
        if (this.#dealer.isBusted) {
          console.log(`${this.#dealer.nickname}:`, this.#dealer.toString(), `(${this.#dealer.valueOf()}) BUSTED!`)
        } else {
          console.log(`${this.#dealer.nickname}:`, this.#dealer.toString(), `(${this.#dealer.valueOf()})`)
        }
        if (winner === player) {
          console.log(`${player.nickname} wins! 🎉\n`)
        } else {
          console.log('Dealer wins! 😕 \n')
        }
      }
    }
  }
}
