// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate feature cards
const featureCards = document.querySelectorAll('.goal-card, .tech-card');
featureCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Typewriter effect for the main title
const mainTitle = document.querySelector('.main-title');
const mainTitleText = mainTitle.textContent;
mainTitle.textContent = '';

function typeWriter(text, index) {
    if (index < text.length) {
        mainTitle.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, index + 1), 100);
    }
}

setTimeout(() => typeWriter(mainTitleText, 0), 1000);

// Animated counter for key statistics
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const stats = [
    { id: 'cities-optimized', end: 50 },
    { id: 'traffic-reduction', end: 30 },
    { id: 'co2-reduction', end: 25 }
];

function animateStats() {
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        animateValue(element, 0, stat.end, 2000);
    });
}

// Trigger stat animation when the impact section is in view
const impactSection = document.querySelector('#impact');
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

impactObserver.observe(impactSection);

// Traffic simulation
const trafficCanvas = document.getElementById('trafficCanvas');
const trafficCtx = trafficCanvas.getContext('2d');

class Vehicle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 10 + 5;
    }

    update() {
        this.x += this.speed;
        if (this.x > trafficCanvas.width + this.size) {
            this.x = -this.size;
        }
    }

    draw() {
        trafficCtx.fillStyle = 'rgba(52, 152, 219, 0.7)';
        trafficCtx.beginPath();
        trafficCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        trafficCtx.fill();
    }
}

const vehicles = [];
for (let i = 0; i < 50; i++) {
    vehicles.push(new Vehicle(Math.random() * trafficCanvas.width, Math.random() * trafficCanvas.height));
}

function animateTraffic() {
    trafficCtx.clearRect(0, 0, trafficCanvas.width, trafficCanvas.height);
    vehicles.forEach(vehicle => {
        vehicle.update();
        vehicle.draw();
    });
    requestAnimationFrame(animateTraffic);
}

// Optimization visualization
const optimizationCanvas = document.getElementById('optimizationCanvas');
const optimizationCtx = optimizationCanvas.getContext('2d');

class TrafficLight {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.state = 'red';
        this.timer = 0;
    }

    update() {
        this.timer++;
        if (this.timer > 100) {
            this.timer = 0;
            this.state = this.state === 'red' ? 'green' : 'red';
        }
    }

    draw() {
        optimizationCtx.fillStyle = this.state;
        optimizationCtx.beginPath();
        optimizationCtx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        optimizationCtx.fill();
    }
}

const trafficLights = [
    new TrafficLight(100, 100),
    new TrafficLight(300, 100),
    new TrafficLight(100, 300),
    new TrafficLight(300, 300)
];

function drawRoads() {
    optimizationCtx.fillStyle = '#333';
    optimizationCtx.fillRect(0, 175, 400, 50);
    optimizationCtx.fillRect(175, 0, 50, 400);
}

function animateOptimization() {
    optimizationCtx.clearRect(0, 0, optimizationCanvas.width, optimizationCanvas.height);
    drawRoads();
    trafficLights.forEach(light => {
        light.update();
        light.draw();
    });
    requestAnimationFrame(animateOptimization);
}

// Start animations
animateTraffic();
animateOptimization();

// Demo controls
const startDemoBtn = document.getElementById('startDemo');
const pauseDemoBtn = document.getElementById('pauseDemo');
const resetDemoBtn = document.getElementById('resetDemo');

let isRunning = true;

startDemoBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        animateTraffic();
        animateOptimization();
    }
});

pauseDemoBtn.addEventListener('click', () => {
    isRunning = false;
});

resetDemoBtn.addEventListener('click', () => {
    vehicles.forEach(vehicle => {
        vehicle.x = Math.random() * trafficCanvas.width;
        vehicle.y = Math.random() * trafficCanvas.height;
    });
    trafficLights.forEach(light => {
        light.state = 'red';
        light.timer = 0;
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});