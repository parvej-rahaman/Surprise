// Generate Floating Hearts Background
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15; // Number of floating hearts

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Randomize position, size, and animation duration
        const left = Math.random() * 100;
        const size = Math.random() * 15 + 10; // 10px to 25px
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 10; // 0s to 10s

        heart.style.left = `${left}vw`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        container.appendChild(heart);
    }
}

// Initialize Background Hearts
document.addEventListener('DOMContentLoaded', createHearts);

// Navigation State Management
function goToStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.classList.remove('active');
        step.classList.add('hidden');
    });

    // Show target step
    const targetStep = document.getElementById(`step-${stepNumber}`);
    if (targetStep) {
        targetStep.classList.remove('hidden');
        
        // Slight delay to ensure CSS transition triggers properly
        setTimeout(() => {
            targetStep.classList.add('active');
            if (stepNumber === 4) {
                // Scroll to top when going to scrollable section
                window.scrollTo(0,0);
            }
        }, 50);
    }
}

// Step 1: Open Envelope
let isEnvelopeOpen = false;
function handleEnvelopeClick() {
    const envelope = document.querySelector('.envelope-container');
    const text = envelope.querySelector('.instruction-text');
    
    if (!isEnvelopeOpen) {
        envelope.classList.add('open');
        isEnvelopeOpen = true;
        text.innerText = "Tap the letter to continue...";
        text.style.animation = "pulse 2s infinite";
    } else {
        text.style.opacity = '0';
        setTimeout(() => {
            goToStep(2);
        }, 500);
    }
}

// Step 2: Cut Cake and Blow Candles
let cakeCut = false;
function cutCake() {
    if (cakeCut) return;
    
    const cakeContainer = document.querySelector('.cake-container');
    cakeContainer.classList.add('cut');
    cakeCut = true;

    // Change instruction text
    const text = document.getElementById('cake-text');
    text.innerText = "Yay! Happy Birthday!";
    
    // Trigger Confetti
    triggerConfetti();

    // Show continue button or auto transition
    setTimeout(() => {
        const btn = document.getElementById('cake-continue');
        btn.classList.remove('hidden');
        btn.style.opacity = 1;
        btn.style.visibility = 'visible';
        
        // Auto transition after a short delay for better UX
        setTimeout(() => {
            goToStep(3);
        }, 2000);

    }, 1500);
}

// Confetti Effect
function triggerConfetti() {
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffb6c1', '#d1495b', '#fca311', '#fff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffb6c1', '#d1495b', '#fca311', '#fff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
