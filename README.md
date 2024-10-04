Card Game Application

This is a simple card game application that allows players to engage in a game for a specified number of rounds. It checks for proper input values, sets up the game table, and manages the playing rounds based on the number of players and rounds provided.

Features

	•	Customizable Number of Players: The game supports 1 to 7 players or 52 players.
	•	Customizable Number of Rounds: Players can choose to play between 1 and 5 rounds.
	•	Error Handling: Built-in error handling ensures that invalid player counts, round numbers, and deck configurations trigger meaningful error messages and error codes.
	•	Card Table Setup: Automatically initializes a card table and handles the gameplay for the given rounds.

Usage

Starting the Game

The game is run via the command line, where the number of rounds and number of players can be passed as arguments.

Example Commands

	•	Start a game with default settings (1 round and 3 players)
  : node src/app.js
  	•	Start a game with a custom number of rounds (e.g., 4 rounds with 3 players):
  : node src/app.js 4
  	•	Start a game with custom players and rounds (e.g., 2 rounds with 5 players):
  : node src/app.js 2 5

  Error Handling

	•	If an invalid number of rounds (e.g., less than 1 or greater than 5) or invalid number of players is provided, an error will be thrown with a specific error code:
	•	Invalid number of rounds: Error code 26
	•	Invalid number of players: Error code 27
	•	Too few cards for 52 players: Error code 28

Constraints

	•	Rounds: The number of rounds must be between 1 and 5.
	•	Players: The number of players must be 1, 2, 3, 4, 5, 6, 7, or 52.
	•	Deck Size: A full deck contains 52 cards. A game with 52 players cannot have more than 1 round, as there aren’t enough cards to distribute for multiple rounds.

Error Codes

	•	26: Invalid number of rounds.
	•	27: Invalid number of players.
	•	28: Too few playing cards for the specified number of players.

Author

	•	Hao Chen
	•	Version: 2.0.0
	•	Contact: hc222ig@student.lnu.se

License

This project is licensed under the MIT License.