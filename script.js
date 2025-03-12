// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const petDisplay = document.getElementById('pet-display');
    const messageBox = document.getElementById('message-box');
    const hungerBar = document.getElementById('hunger-bar');
    const happinessBar = document.getElementById('happiness-bar');
    const energyBar = document.getElementById('energy-bar');
    const feedBtn = document.getElementById('feed-btn');
    const petBtn = document.getElementById('pet-btn');
    const playBtn = document.getElementById('play-btn');
    const sleepBtn = document.getElementById('sleep-btn');
    const cleanBtn = document.getElementById('clean-btn');
    const petName = document.getElementById('pet-name');
    const petAge = document.getElementById('pet-age');
    const renameBtn = document.getElementById('rename-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Pet states
    const STATES = {
        IDLE: 'idle',
        EATING: 'eating',
        PLAYING: 'playing',
        SLEEPING: 'sleeping',
        MOVING: 'moving',
        HAPPY: 'happy',
        HUNGRY: 'hungry',
        TIRED: 'tired',
        BORED: 'bored',
        DIRTY: 'dirty',
        CLEANING: 'cleaning'
    };

    // ASCII art for different states
    const ASCII_ART = {
        [STATES.IDLE]: [
            '  /\\_/\\  ',
            ' ( o.o ) ',
            ' > ^ <   ',
            '         '
        ],
        [STATES.EATING]: [
            '  /\\_/\\  ',
            ' ( o.o ) ',
            ' > ^ < 🍔 ',
            '  nomnom  '
        ],
        [STATES.PLAYING]: [
            '  /\\_/\\  ',
            ' ( ^.^ ) ',
            '   \\ /   ',
            '  bouncing!'
        ],
        [STATES.SLEEPING]: [
            '  /\\_/\\  ',
            ' ( -.- ) ',
            ' > z z < ',
            '         '
        ],
        [STATES.HAPPY]: [
            '  /\\_/\\  ',
            ' ( ^.^ ) ',
            ' > ^ <   ',
            '  purr~  '
        ],
        [STATES.HUNGRY]: [
            '  /\\_/\\  ',
            ' ( o.O ) ',
            ' > ~ <   ',
            ' *growl*  '
        ],
        [STATES.TIRED]: [
            '  /\\_/\\  ',
            ' ( o.o ) ',
            ' > - <   ',
            ' *yawn*  '
        ],
        [STATES.BORED]: [
            '  /\\_/\\  ',
            ' ( u.u ) ',
            ' > . <   ',
            '  sigh   '
        ],
        [STATES.DIRTY]: [
            '  /\\_/\\  ',
            ' ( >_< ) ',
            ' > ~ <   ',
            '  *ick*  '
        ],
        [STATES.CLEANING]: [
            '  /\\_/\\  ',
            ' ( o.o ) ',
            ' > ~ <   ',
            ' *splash*'
        ]
    };

    // Default pet data
    const DEFAULT_PET = {
        name: 'FluffBot',
        hunger: 100,
        happiness: 100,
        energy: 100,
        cleanliness: 100,
        state: STATES.IDLE,
        age: 0,
        lastSaved: Date.now(),
        position: { x: 0, y: 0 }
    };

    // Current pet data
    let pet = loadPet() || { ...DEFAULT_PET };

    // Initialize the display
    updateDisplay();
    updateStats();
    showMessage(`Welcome back to ${pet.name}!`);

    // Start the game loop
    setInterval(gameLoop, 5000);

    // Event listeners for buttons
    feedBtn.addEventListener('click', feedPet);
    petBtn.addEventListener('click', petPet);
    playBtn.addEventListener('click', playWithPet);
    sleepBtn.addEventListener('click', putPetToSleep);
    cleanBtn.addEventListener('click', cleanPet);
    renameBtn.addEventListener('click', renamePet);
    resetBtn.addEventListener('click', resetPet);

    // Game loop for automatic changes
    function gameLoop() {
        // Calculate time passed since last save
        const now = Date.now();
        const hoursPassed = (now - pet.lastSaved) / (1000 * 60 * 60);

        // Update age (1 day per real 6 hours)
        pet.age = Math.floor(hoursPassed / 6) + pet.age;

        // Decrease stats based on time passed (capped at minimum of 0)
        decreaseStat('hunger', 2 + Math.floor(hoursPassed * 5));
        decreaseStat('happiness', 1 + Math.floor(hoursPassed * 3));
        decreaseStat('energy', 1 + Math.floor(hoursPassed * 4));
        decreaseStat('cleanliness', 1 + Math.floor(hoursPassed * 2));

        // Update last saved time
        pet.lastSaved = now;

        // Check pet state based on stats
        updatePetState();

        // Random movement
        if (Math.random() < 0.3 && pet.state !== STATES.SLEEPING) {
            movePet();
        }

        // Update display and save
        updateDisplay();
        updateStats();
        savePet();
    }

    // Helper function to decrease a stat with a minimum of 0
    function decreaseStat(stat, amount) {
        pet[stat] = Math.max(0, pet[stat] - amount);
    }

    // Helper function to increase a stat with a maximum of 100
    function increaseStat(stat, amount) {
        pet[stat] = Math.min(100, pet[stat] + amount);
    }

    // Update the pet's state based on stats
    function updatePetState() {
        if (pet.state === STATES.EATING || pet.state === STATES.PLAYING ||
            pet.state === STATES.SLEEPING || pet.state === STATES.CLEANING) {
            return; // Don't interrupt activities
        }

        if (pet.hunger < 30) {
            pet.state = STATES.HUNGRY;
            showMessage(`${pet.name} is hungry!`);
        } else if (pet.energy < 30) {
            pet.state = STATES.TIRED;
            showMessage(`${pet.name} is tired!`);
        } else if (pet.happiness < 30) {
            pet.state = STATES.BORED;
            showMessage(`${pet.name} is bored!`);
        } else if (pet.cleanliness < 30) {
            pet.state = STATES.DIRTY;
            showMessage(`${pet.name} needs cleaning!`);
        } else if (pet.happiness > 70) {
            pet.state = STATES.HAPPY;
        } else {
            pet.state = STATES.IDLE;
        }
    }

    // Feed the pet
    function feedPet() {
        if (pet.hunger >= 100) {
            showMessage(`${pet.name} is not hungry now!`);
            return;
        }

        pet.state = STATES.EATING;
        updateDisplay();
        showMessage(`You feed ${pet.name}. Yum!`);

        increaseStat('hunger', 30);
        decreaseStat('cleanliness', 10);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 3000);
    }

    // Pet the pet
    function petPet() {
        pet.state = STATES.HAPPY;
        updateDisplay();
        showMessage(`You pet ${pet.name}. Purr~!`);

        increaseStat('happiness', 15);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 3000);
    }

    // Play with the pet
    function playWithPet() {
        if (pet.energy < 20) {
            showMessage(`${pet.name} is too tired to play!`);
            return;
        }

        pet.state = STATES.PLAYING;
        petDisplay.classList.add('moving');
        updateDisplay();
        showMessage(`You play with ${pet.name}. So fun!`);

        increaseStat('happiness', 25);
        decreaseStat('energy', 20);
        decreaseStat('cleanliness', 15);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            petDisplay.classList.remove('moving');
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 5000);
    }

    // Put the pet to sleep
    function putPetToSleep() {
        if (pet.energy >= 100) {
            showMessage(`${pet.name} is not tired and refuses to sleep!`);
            return;
        }

        pet.state = STATES.SLEEPING;
        updateDisplay();
        showMessage(`${pet.name} is sleeping. Zzz...`);

        // Disable buttons while sleeping
        disableButtons(true);

        // Set a timeout to wake up the pet after some time
        const sleepTime = 5000; // 5 seconds for demo
        setTimeout(() => {
            increaseStat('energy', 50);
            pet.state = STATES.IDLE;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
            showMessage(`${pet.name} woke up feeling refreshed!`);
            disableButtons(false);
        }, sleepTime);
    }

    // Clean the pet
    function cleanPet() {
        pet.state = STATES.CLEANING;
        updateDisplay();
        showMessage(`You clean ${pet.name}. Splash!`);

        increaseStat('cleanliness', 100);
        decreaseStat('happiness', 10); // Most pets don't like baths!

        setTimeout(() => {
            pet.state = STATES.IDLE;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 3000);
    }

    // Move the pet randomly
    function movePet() {
        // Only move if not already in an active state
        if (pet.state === STATES.IDLE || pet.state === STATES.HAPPY ||
            pet.state === STATES.HUNGRY || pet.state === STATES.BORED) {

            pet.position.x = Math.floor(Math.random() * (petDisplay.parentElement.clientWidth - 100));
            petDisplay.style.left = `${pet.position.x}px`;

            // Temporarily add movement class
            petDisplay.classList.add('moving');

            setTimeout(() => {
                petDisplay.classList.remove('moving');
            }, 10000);
        }
    }

    // Rename the pet
    function renamePet() {
        const newName = prompt('Enter a new name for your pet:', pet.name);
        if (newName && newName.trim() !== '') {
            pet.name = newName.trim();
            petName.textContent = pet.name;
            showMessage(`Pet renamed to ${pet.name}!`);
            savePet();
        }
    }

    // Reset the pet
    function resetPet() {
        if (confirm('Are you sure you want to reset your pet? All progress will be lost!')) {
            pet = { ...DEFAULT_PET };
            updateDisplay();
            updateStats();
            savePet();
            showMessage('Pet has been reset!');
        }
    }

    // Update the visual display of the pet
    function updateDisplay() {
        const art = ASCII_ART[pet.state];
        petDisplay.textContent = art.join('\n');
        petAge.textContent = pet.age;
        petName.textContent = pet.name;
    }

    // Update the stat bars
    function updateStats() {
        hungerBar.style.width = `${pet.hunger}%`;
        happinessBar.style.width = `${pet.happiness}%`;
        energyBar.style.width = `${pet.energy}%`;
    }

    // Show a message in the message box
    function showMessage(message) {
        messageBox.textContent = message;

        // Fade out message after a delay
        setTimeout(() => {
            messageBox.style.opacity = '0.7';
        }, 3000);

        setTimeout(() => {
            messageBox.style.opacity = '1';
        }, 100);
    }

    // Enable/disable buttons
    function disableButtons(disabled) {
        feedBtn.disabled = disabled;
        petBtn.disabled = disabled;
        playBtn.disabled = disabled;
        cleanBtn.disabled = disabled;
    }

    // Save pet data to localStorage
    function savePet() {
        localStorage.setItem('fluffbot-pet', JSON.stringify(pet));
    }

    // Load pet data from localStorage
    function loadPet() {
        const savedPet = localStorage.getItem('fluffbot-pet');
        if (savedPet) {
            return JSON.parse(savedPet);
        }
        return null;
    }
});