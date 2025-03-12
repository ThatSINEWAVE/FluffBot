// Import the ASCII art from animations.js
import ASCII_ART from './animations.js';

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
        IDLE: 'IDLE',
        EATING: 'EATING',
        PLAYING: 'PLAYING',
        SLEEPING: 'SLEEPING',
        MOVING: 'MOVING',
        HAPPY: 'HAPPY',
        HUNGRY: 'HUNGRY',
        TIRED: 'TIRED',
        BORED: 'BORED',
        DIRTY: 'DIRTY',
        CLEANING: 'CLEANING',
        PLAYFUL: 'PLAYFUL',
        RELAXED: 'RELAXED',
        FOLLOWING_MOUSE: 'FOLLOWING_MOUSE',
        PLAYING_WITH_MOUSE: 'PLAYING_WITH_MOUSE',
        SURPRISED: 'SURPRISED'
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
        position: {
            x: 0,
            y: 0
        },
        currentFrame: 0
    };

    // Current pet data
    let pet = loadPet() || {
        ...DEFAULT_PET
    };

    // Animation frame rate
    const FRAME_RATE = 500; // milliseconds
    let animationInterval;

    // Initialize the display
    updateDisplay();
    updateStats();
    showMessage(`Welcome back to ${pet.name}!`);
    startAnimation();

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

    // Set up mouse tracking in the pet container
    const petContainer = document.querySelector('.pet-container');
    petContainer.addEventListener('mousemove', handleMouseMove);
    petContainer.addEventListener('mouseenter', handleMouseEnter);
    petContainer.addEventListener('mouseleave', handleMouseLeave);
    petContainer.addEventListener('click', handleMouseClick);

    // Mouse movement tracker
    let mousePosition = {
        x: 0,
        y: 0
    };
    let isMouseInContainer = false;
    let mouseFollowTimeout = null;
    let mousePlayTimeout = null;

    // Animation function
    function startAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        animationInterval = setInterval(() => {
            // Cycle through animation frames
            pet.currentFrame = (pet.currentFrame + 1) % ASCII_ART[pet.state].length;
            updateDisplay();
        }, FRAME_RATE);
    }

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

        // Idle animations - random behaviors when idle
        if (pet.state === STATES.IDLE && Math.random() < 0.2) {
            const randomBehaviors = [
                () => {
                    petDisplay.style.transform = 'rotate(5deg)';
                },
                () => {
                    petDisplay.style.transform = 'rotate(-5deg)';
                },
                () => {
                    petDisplay.style.transform = 'translateY(-5px)';
                },
                () => {
                    petDisplay.style.transform = 'scale(1.05)';
                }
            ];

            const randomBehavior = randomBehaviors[Math.floor(Math.random() * randomBehaviors.length)];
            randomBehavior();

            setTimeout(() => {
                petDisplay.style.transform = 'none';
            }, 1000);
        }

        // Update display and save
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
        const previousState = pet.state;

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

        // If state changed, reset the animation frame
        if (previousState !== pet.state) {
            pet.currentFrame = 0;
            updateDisplay();
        }
    }

    // Feed the pet
    function feedPet() {
        if (pet.hunger >= 100) {
            showMessage(`${pet.name} is not hungry now!`);
            return;
        }

        pet.state = STATES.EATING;
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`You feed ${pet.name}. Yum!`);

        // Add feeding animation effects
        petDisplay.style.transform = 'scale(1.1)';
        setTimeout(() => {
            petDisplay.style.transform = 'none';
        }, 300);

        increaseStat('hunger', 30);
        decreaseStat('cleanliness', 10);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 3000);
    }

    // Pet the pet
    function petPet() {
        pet.state = STATES.HAPPY;
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`You pet ${pet.name}. Purr~!`);

        // Add petting animation effects
        const petAnimation = [
            () => {
                petDisplay.style.transform = 'translateY(-3px)';
            },
            () => {
                petDisplay.style.transform = 'none';
            },
            () => {
                petDisplay.style.transform = 'translateY(-2px)';
            },
            () => {
                petDisplay.style.transform = 'none';
            }
        ];

        let petFrame = 0;
        const petInterval = setInterval(() => {
            petAnimation[petFrame]();
            petFrame = (petFrame + 1) % petAnimation.length;
        }, 200);

        setTimeout(() => {
            clearInterval(petInterval);
            petDisplay.style.transform = 'none';
        }, 2000);

        increaseStat('happiness', 15);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
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
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`You play with ${pet.name}. So fun!`);

        // Add bouncing animation
        petDisplay.classList.add('bouncing');

        increaseStat('happiness', 25);
        decreaseStat('energy', 20);
        decreaseStat('cleanliness', 15);

        setTimeout(() => {
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
            petDisplay.classList.remove('bouncing');
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
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`${pet.name} is sleeping. Zzz...`);

        // Add sleepy animation effect - slow down the frame rate
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        animationInterval = setInterval(() => {
            pet.currentFrame = (pet.currentFrame + 1) % ASCII_ART[pet.state].length;
            updateDisplay();
        }, FRAME_RATE * 2); // Slower animation when sleeping

        // Disable buttons while sleeping
        disableButtons(true);

        // Set a timeout to wake up the pet after some time
        const sleepTime = 5000; // 5 seconds for demo
        setTimeout(() => {
            increaseStat('energy', 50);
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
            startAnimation(); // Reset to normal animation speed
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
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`You clean ${pet.name}. Splash!`);

        // Add cleaning animation effects
        const shakeAnimation = [
            () => {
                petDisplay.style.transform = 'translateX(-5px)';
            },
            () => {
                petDisplay.style.transform = 'translateX(5px)';
            },
            () => {
                petDisplay.style.transform = 'translateX(-3px)';
            },
            () => {
                petDisplay.style.transform = 'translateX(3px)';
            },
        ];

        let shakeFrame = 0;
        const shakeInterval = setInterval(() => {
            shakeAnimation[shakeFrame]();
            shakeFrame = (shakeFrame + 1) % shakeAnimation.length;
        }, 150);

        setTimeout(() => {
            clearInterval(shakeInterval);
            petDisplay.style.transform = 'none';
        }, 3000);

        increaseStat('cleanliness', 100);
        decreaseStat('happiness', 10); // Most pets don't like baths!

        setTimeout(() => {
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
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

            // Set a random position within the container
            const availableWidth = petDisplay.parentElement.clientWidth - 100;
            const randomDirection = Math.random() > 0.5 ? 1 : -1;
            const targetX = Math.min(Math.max(0, pet.position.x + (randomDirection * (Math.floor(Math.random() * 150) + 50))), availableWidth);

            // Smooth transition using CSS
            petDisplay.style.transition = 'left 2s ease-in-out';
            pet.position.x = targetX;
            petDisplay.style.left = `${targetX}px`;

            // Add a slight bounce effect
            const bounceAnimation = [
                () => {
                    petDisplay.style.transform = 'translateY(0)';
                },
                () => {
                    petDisplay.style.transform = 'translateY(-5px)';
                },
                () => {
                    petDisplay.style.transform = 'translateY(0)';
                },
                () => {
                    petDisplay.style.transform = 'translateY(-3px)';
                },
                () => {
                    petDisplay.style.transform = 'translateY(0)';
                }
            ];

            let bounceFrame = 0;
            const bounceInterval = setInterval(() => {
                if (bounceFrame < bounceAnimation.length) {
                    bounceAnimation[bounceFrame]();
                    bounceFrame++;
                } else {
                    clearInterval(bounceInterval);
                }
            }, 200);
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
            pet = {
                ...DEFAULT_PET
            };
            updateDisplay();
            updateStats();
            savePet();
            showMessage('Pet has been reset!');
        }
    }

    // Update the visual display of the pet
    function updateDisplay() {
        // Ensure that the pet's state exists in ASCII_ART
        if (!ASCII_ART[pet.state]) {
            console.error(`State '${pet.state}' does not exist in ASCII_ART`);
            pet.state = STATES.IDLE; // Reset to idle state
        }

        // Get the current animation frame for the current state
        const artFrames = ASCII_ART[pet.state];

        // Ensure currentFrame index is valid
        if (pet.currentFrame >= artFrames.length) {
            pet.currentFrame = 0;
        }

        const currentFrame = artFrames[pet.currentFrame];

        // Display the current frame (with a safety check)
        if (currentFrame) {
            petDisplay.textContent = currentFrame.join('\n');
        } else {
            console.error(`Frame ${pet.currentFrame} for state '${pet.state}' is undefined`);
            petDisplay.textContent = ASCII_ART[STATES.IDLE][0].join('\n'); // Fallback to first idle frame
        }

        petAge.textContent = pet.age;
        petName.textContent = pet.name;
    }

    // Update the stat bars
    function updateStats() {
        // Add smooth transitions for stat bars
        hungerBar.style.transition = 'width 0.5s ease-in-out';
        happinessBar.style.transition = 'width 0.5s ease-in-out';
        energyBar.style.transition = 'width 0.5s ease-in-out';

        // Update widths
        hungerBar.style.width = `${pet.hunger}%`;
        happinessBar.style.width = `${pet.happiness}%`;
        energyBar.style.width = `${pet.energy}%`;

        // Add color changing based on levels
        if (pet.hunger < 30) hungerBar.style.backgroundColor = '#ff0000';
        else hungerBar.style.backgroundColor = '#f44336';

        if (pet.happiness < 30) happinessBar.style.backgroundColor = '#8bc34a';
        else happinessBar.style.backgroundColor = '#4caf50';

        if (pet.energy < 30) energyBar.style.backgroundColor = '#90caf9';
        else energyBar.style.backgroundColor = '#2196f3';
    }

    // Show a message in the message box with better animation
    function showMessage(message) {
        // Add fade out/in transition
        messageBox.style.opacity = '0';

        setTimeout(() => {
            messageBox.textContent = message;
            messageBox.style.opacity = '1';

            // Fade out message after a delay
            setTimeout(() => {
                messageBox.style.opacity = '0.7';
            }, 3000);
        }, 300);
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

    // Handle mouse movement within the pet container
    function handleMouseMove(event) {
        // Get relative position inside container
        const rect = petContainer.getBoundingClientRect();
        mousePosition.x = event.clientX - rect.left;
        mousePosition.y = event.clientY - rect.top;

        // Make pet look at the mouse if not in an active state
        if (!isInActiveState() && isMouseInContainer) {
            lookAtMouse();
        }
    }

    // Handle mouse entering the container
    function handleMouseEnter(event) {
        isMouseInContainer = true;

        // Don't interrupt if pet is in an active state
        if (isInActiveState()) return;

        // Random chance to notice the mouse
        if (Math.random() < 0.7) {
            pet.state = STATES.SURPRISED;
            pet.currentFrame = 0;
            updateDisplay();
            showMessage(`${pet.name} noticed you!`);

            // After being surprised, start following the mouse
            mouseFollowTimeout = setTimeout(() => {
                if (isMouseInContainer && !isInActiveState()) {
                    pet.state = STATES.FOLLOWING_MOUSE;
                    pet.currentFrame = 0;
                    updateDisplay();
                    showMessage(`${pet.name} is curious about your cursor!`);
                }
            }, 1000);
        }
    }

    // Handle mouse leaving the container
    function handleMouseLeave() {
        isMouseInContainer = false;

        // Clear any mouse-related timeouts
        if (mouseFollowTimeout) {
            clearTimeout(mouseFollowTimeout);
            mouseFollowTimeout = null;
        }

        if (mousePlayTimeout) {
            clearTimeout(mousePlayTimeout);
            mousePlayTimeout = null;
        }

        // Return to idle state if currently following or playing with mouse
        if (pet.state === STATES.FOLLOWING_MOUSE || pet.state === STATES.PLAYING_WITH_MOUSE) {
            pet.state = STATES.IDLE;
            pet.currentFrame = 0;
            updatePetState();
            updateDisplay();
            savePet();
        }
    }

    // Handle mouse clicks on the pet
    function handleMouseClick(event) {
        // Check if click is on or near the pet
        const petRect = petDisplay.getBoundingClientRect();
        const clickX = event.clientX;
        const clickY = event.clientY;

        // Expand the pet's hitbox slightly for easier clicking
        const expandedRect = {
            left: petRect.left - 20,
            right: petRect.right + 20,
            top: petRect.top - 20,
            bottom: petRect.bottom + 20
        };

        if (
            clickX >= expandedRect.left &&
            clickX <= expandedRect.right &&
            clickY >= expandedRect.top &&
            clickY <= expandedRect.bottom
        ) {
            // If not in an active state, play with the mouse
            if (!isInActiveState() || pet.state === STATES.FOLLOWING_MOUSE) {
                playWithMouse();
            }
        }
    }

    // Make the pet look at the mouse
    function lookAtMouse() {
        // Only follow if in following state or with random chance when idle
        if (pet.state !== STATES.FOLLOWING_MOUSE && Math.random() > 0.1) return;

        // Calculate target position (with a slight lag for more natural movement)
        const targetX = Math.min(
            Math.max(0, mousePosition.x - 50),
            petContainer.clientWidth - 100
        );

        // Move the pet toward the mouse
        const moveStep = 3;
        const distanceX = targetX - pet.position.x;

        if (Math.abs(distanceX) > 5) {
            // Determine direction and move
            const direction = distanceX > 0 ? 1 : -1;
            pet.position.x += moveStep * direction;

            // Update position with smooth transition
            petDisplay.style.transition = 'left 0.3s ease-out';
            petDisplay.style.left = `${pet.position.x}px`;

            // Add a slight bounce for movement
            if (Math.random() < 0.2) {
                petDisplay.style.transform = 'translateY(-2px)';
                setTimeout(() => {
                    petDisplay.style.transform = 'none';
                }, 200);
            }
        }
    }

    // Play with the mouse cursor
    function playWithMouse() {
        // Don't play if already in an active state (except following)
        if (isInActiveState() && pet.state !== STATES.FOLLOWING_MOUSE) return;

        pet.state = STATES.PLAYING_WITH_MOUSE;
        pet.currentFrame = 0;
        updateDisplay();
        showMessage(`${pet.name} is playing with your cursor!`);

        // Add playful animation effects
        const playAnimation = [
            () => {
                petDisplay.style.transform = 'translateY(-5px) rotate(5deg)';
            },
            () => {
                petDisplay.style.transform = 'translateY(-3px) rotate(-5deg)';
            },
            () => {
                petDisplay.style.transform = 'translateY(-4px) scale(1.05)';
            },
            () => {
                petDisplay.style.transform = 'none';
            }
        ];

        let playFrame = 0;
        const playInterval = setInterval(() => {
            playAnimation[playFrame]();
            playFrame = (playFrame + 1) % playAnimation.length;
        }, 200);

        increaseStat('happiness', 10);
        decreaseStat('energy', 5);

        setTimeout(() => {
            clearInterval(playInterval);
            petDisplay.style.transform = 'none';

            // Return to following or idle
            pet.state = isMouseInContainer ? STATES.FOLLOWING_MOUSE : STATES.IDLE;
            pet.currentFrame = 0;
            updatePetState();
            updateDisplay();
            updateStats();
            savePet();
        }, 3000);
    }

    // Helper function to check if pet is in an active state that shouldn't be interrupted
    function isInActiveState() {
        const activeStates = [
            STATES.EATING,
            STATES.PLAYING,
            STATES.SLEEPING,
            STATES.CLEANING,
            STATES.PLAYING_WITH_MOUSE
        ];

        return activeStates.includes(pet.state);
    }
});