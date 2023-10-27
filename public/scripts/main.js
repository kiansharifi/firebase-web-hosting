class Main {
    constructor() {
        this.pageViewsKey = 'pageViewsCount';
        this.darkMode = false;
        this.initializeCounter();
        this.displayCount();
        this.initializeEventBindings();
    }

    initializeCounter() {
        if (!localStorage.getItem(this.pageViewsKey)) {
            localStorage.setItem(this.pageViewsKey, '0');
        }
    }

    incrementCount() {
        let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
        currentCount++;
        localStorage.setItem(this.pageViewsKey, currentCount.toString());
    }

    displayCount() {
        this.incrementCount();
        document.getElementById('count').innerHTML = 'You have visited this page ' + localStorage.getItem(this.pageViewsKey) + ' times.';
    }

    // Custom function 1: Reset the page views counter
    resetCounter() {
        localStorage.setItem(this.pageViewsKey, '0');
        this.displayCount();
    }

    // Custom function 2: Log the current page views
    logPageViews() {
        console.log(`Current page views: ${localStorage.getItem(this.pageViewsKey)}`);
    }

    // Custom function 3: Update a greeting message based on the number of page views
    updateGreeting() {
        let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
        let greeting = document.getElementById('greeting');

        if (currentCount <= 5) {
            greeting.innerHTML = 'Welcome back, new visitor!';
        } else if (currentCount > 5 && currentCount <= 20) {
            greeting.innerHTML = 'You seem to like this page!';
        } else {
            greeting.innerHTML = 'You are a frequent visitor!';
        }
    }
    // Theme Switcher Logic
    switchTheme() {
        if (this.darkMode) {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        } else {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#FFF';
        }
        this.darkMode = !this.darkMode;
    }

    gradientBackgroundEffect() {
        document.body.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const width = window.innerWidth;
            const height = window.innerHeight;

            const hueRotation = (mouseX / width) * 360;
            const saturation = (mouseY / height) * 100;

            document.body.style.backgroundImage = `
            radial-gradient(
                circle at ${mouseX}px ${mouseY}px,
                hsl(${hueRotation}, ${saturation}%, 50%),
                hsl(${(hueRotation + 120) % 360}, ${saturation}%, 50%),
                hsl(${(hueRotation + 240) % 360}, ${saturation}%, 50%)
            )
        `;
        });
    }
    // Updated method for the "Click me!" button
    incrementClickCounter() {
        let clickCountSpan = document.getElementById("clickCount");
        let currentClickCount = parseInt(clickCountSpan.innerText.trim());

        if (!isNaN(currentClickCount)) {
            clickCountSpan.innerText = currentClickCount + 1;
        } else {
            clickCountSpan.innerText = 0; // Reset to zero if unexpected value
        }

        // Play "boop" sound on count
        const boopSound = document.getElementById('boop');
        boopSound.play();
    }

    // Initializing your event bindings
    initializeEventBindings() {
        let resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                this.resetCounter();
            });
        }

        let logButton = document.getElementById('logButton');
        if (logButton) {
            logButton.addEventListener('click', () => {
                this.logPageViews();
            });
        }
        // Binding the gradient background effect
        this.gradientBackgroundEffect();

        // Binding the theme switcher logic
        const themeSwitchButton = document.getElementById('themeSwitchButton');
        if (themeSwitchButton) {
            themeSwitchButton.addEventListener('click', () => {
                this.switchTheme();
            });
        }

        // Counter Logic for page visits
        const counterButton = document.getElementById('clickCounterButton');
        if (counterButton) {
            counterButton.addEventListener('click', () => {
                this.incrementCount();
                this.displayCount();
                this.incrementClickCounter(); // Add click counter logic here too
            });
        }

        let gameButton = document.getElementById('gameButton');
if (gameButton) {
    gameButton.addEventListener('click', () => {
        // Assuming the game page is named "game.html"
        window.location.href = "game.html";
    });
}

    }
}
// Construct the class
document.mainClass = new Main();
