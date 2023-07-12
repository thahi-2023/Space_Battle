
// Alien ship class
class AlienShip {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
  
    // Alien ship attacks the player
    attackPlayer(player) {
      if (Math.random() < this.accuracy) {
        player.hull -= this.firepower;
        return true; // Attack successful
      } else {
        return false; // Attack missed
      }
    }
  }
  
  // Player spaceship class
  class PlayerShip {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
  
    // Player spaceship attacks an alien ship
    attackAlien(alien) {
      if (Math.random() < this.accuracy) {
        alien.hull -= this.firepower;
        return true; // Attack successful
      } else {
        return false; // Attack missed
      }
    }
  }
  
  // Initialize the game
  function startGame() {
    const playerShip = new PlayerShip(20, 5, 0.7);
    const alienShips = generateAlienShips(6);
    let currentShipIndex = 0;
  
    console.log("Alien Battle Game - Console Edition");
    console.log("----------------------------------");
    console.log("Player's ship: Hull:", playerShip.hull, "Firepower:", playerShip.firepower, "Accuracy:", playerShip.accuracy.toFixed(2));
    console.log("Alien ships to destroy:", alienShips.length);
    console.log("----------------------------------");
  
    playRound();
  
    // Play a round of the game
    function playRound() {
      const currentAlien = alienShips[currentShipIndex];
  
      // Player attacks the current alien ship
      const playerAttackSuccess = playerShip.attackAlien(currentAlien);
      console.log("Player attacks Alien", currentShipIndex + 1);
  
      if (playerAttackSuccess) {
        console.log("Player hits Alien", currentShipIndex + 1);
  
        // Check if the alien ship is destroyed
        if (currentAlien.hull <= 0) {
          console.log("Alien", currentShipIndex + 1, "destroyed!");
  
          // Check if all alien ships are destroyed
          if (currentShipIndex === alienShips.length - 1) {
            console.log("Congratulations! You destroyed all alien ships. You win!");
            return;
          }
  
          // Ask the player if they want to attack the next ship or retreat
          const attackNext = confirm("Alien ship destroyed! Do you want to attack the next ship?");
          if (attackNext) {
            currentShipIndex++;
            playRound();
          } else {
            console.log("You decided to retreat. Game over!");
            return;
          }
        } else {
          // Alien ship attacks the player
          const alienAttackSuccess = currentAlien.attackPlayer(playerShip);
          console.log("Alien", currentShipIndex + 1, "attacks Player");
  
          if (alienAttackSuccess) {
            console.log("Player hit by the alien ship!");
          } else {
            console.log("Alien ship missed the Player");
          }
  
          // Check if the player's ship is destroyed
          if (playerShip.hull <= 0) {
            console.log("Player's ship destroyed! Game over!");
            return;
          }
  
          // Play the next round
          playRound();
        }
      } else {
        console.log("Player missed the Alien ship");
  
        // Alien ship attacks the player
        const alienAttackSuccess = currentAlien.attackPlayer(playerShip);
        console.log("Alien", currentShipIndex + 1, "attacks Player");
  
        if (alienAttackSuccess) {
          console.log("Player hit by the alien ship!");
        } else {
          console.log("Alien ship missed the Player");
        }
  
        // Check if the player's ship is destroyed
        if (playerShip.hull <= 0) {
          console.log("Player's ship destroyed! Game over!");
          return;
        }
  
        // Play the next round
        playRound();
      }
    }
  
    // Generate an array of random alien ships
    function generateAlienShips(numShips) {
      const ships = [];
      for (let i = 0; i < numShips; i++) {
        const hull = getRandomValue(3, 6);
        const firepower = getRandomValue(2, 4);
        const accuracy = getRandomValue(0.6, 0.8);
        ships.push(new AlienShip(hull, firepower, accuracy));
      }
      return ships;
    }
  
    // Generate a random value within a range
    function getRandomValue(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
  
  // Start the game
  startGame();
  