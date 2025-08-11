// Cryptocurrency data
const cryptocurrencies = [
    {
        "name": "Bitcoin",
        "symbol": "BTC",
        "color": "#f69c3d",
        "secondary_color": "#ff9500",
        "description": "Digital gold and the first cryptocurrency",
        "current_price": "$108,500",
        "change_24h": "+2.5%",
        "market_cap": "$2.1T"
    },
    {
        "name": "Ethereum", 
        "symbol": "ETH",
        "color": "#497493",
        "secondary_color": "#627eea",
        "description": "Leading platform for smart contracts and dApps",
        "current_price": "$4,850",
        "change_24h": "+1.8%",
        "market_cap": "$583B"
    },
    {
        "name": "XRP",
        "symbol": "XRP", 
        "color": "#1b95ca",
        "secondary_color": "#00aae4",
        "description": "Fast cross-border payment solution",
        "current_price": "$3.14",
        "change_24h": "+5.2%",
        "market_cap": "$181B"
    },
    {
        "name": "BNB",
        "symbol": "BNB",
        "color": "#f0b90b", 
        "secondary_color": "#fcd535",
        "description": "Binance ecosystem token",
        "current_price": "$805",
        "change_24h": "+1.2%",
        "market_cap": "$112B"
    },
    {
        "name": "Solana",
        "symbol": "SOL",
        "color": "#9945ff",
        "secondary_color": "#14f195",
        "description": "High-speed blockchain for DeFi and NFTs",
        "current_price": "$235",
        "change_24h": "+3.4%",
        "market_cap": "$115B"
    },
    {
        "name": "Cardano",
        "symbol": "ADA",
        "color": "#0033ad",
        "secondary_color": "#3468dc", 
        "description": "Research-driven blockchain platform",
        "current_price": "$0.78",
        "change_24h": "+2.1%",
        "market_cap": "$27B"
    },
    {
        "name": "Dogecoin",
        "symbol": "DOGE",
        "color": "#c2a633",
        "secondary_color": "#ba9f33",
        "description": "The original meme cryptocurrency",
        "current_price": "$0.22",
        "change_24h": "+4.5%",
        "market_cap": "$33B"
    },
    {
        "name": "Polkadot",
        "symbol": "DOT",
        "color": "#e6007a",
        "secondary_color": "#ff1b8d",
        "description": "Multi-chain interoperability protocol",
        "current_price": "$8.45",
        "change_24h": "+1.7%",
        "market_cap": "$12B"
    }
];

// DOM elements
let cryptoGrid;
let themeToggle;
let currentCrypto = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    cryptoGrid = document.getElementById('cryptoGrid');
    themeToggle = document.getElementById('themeToggle');
    
    // Populate cryptocurrency cards
    populateCryptoCards();
    
    // Setup theme toggle
    setupThemeToggle();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup animations
    setupScrollAnimations();
    
    // Set default theme (Ethereum)
    changeTheme(cryptocurrencies[1]); // Ethereum as default
});

// Populate cryptocurrency cards
function populateCryptoCards() {
    if (!cryptoGrid) return;
    
    cryptoGrid.innerHTML = '';
    
    cryptocurrencies.forEach((crypto, index) => {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.setAttribute('data-crypto', index);
        
        // Determine if change is positive or negative
        const changeClass = crypto.change_24h.startsWith('+') ? 'positive' : 'negative';
        
        card.innerHTML = `
            <div class="crypto-card__content">
                <div class="crypto-card__header">
                    <h3 class="crypto-card__name">${crypto.name}</h3>
                    <span class="crypto-card__symbol">${crypto.symbol}</span>
                </div>
                <div class="crypto-card__price">${crypto.current_price}</div>
                <div class="crypto-card__stats">
                    <span class="crypto-card__change ${changeClass}">${crypto.change_24h}</span>
                    <span class="crypto-card__market-cap">${crypto.market_cap}</span>
                </div>
                <p class="crypto-card__description">${crypto.description}</p>
            </div>
        `;
        
        // Add click event listener for theme change
        card.addEventListener('click', () => {
            changeTheme(crypto);
            highlightSelectedCard(card);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.setProperty('--hover-glow', `rgba(${hexToRgb(crypto.color)}, 0.3)`);
            card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(${hexToRgb(crypto.color)}, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            if (currentCrypto !== crypto) {
                card.style.boxShadow = '';
            }
        });
        
        cryptoGrid.appendChild(card);
    });
}

// Change theme based on selected cryptocurrency
function changeTheme(crypto) {
    currentCrypto = crypto;
    
    // Add transition class
    document.body.classList.add('theme-transition');
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--theme-primary', crypto.color);
    document.documentElement.style.setProperty('--theme-secondary', crypto.secondary_color);
    document.documentElement.style.setProperty('--theme-gradient', 
        `linear-gradient(135deg, ${crypto.color}, ${crypto.secondary_color})`);
    document.documentElement.style.setProperty('--theme-glow', 
        `rgba(${hexToRgb(crypto.color)}, 0.3)`);
    
    // Update page title
    document.title = `CryptoAI Hub - ${crypto.name} Theme`;
    
    // Add animation effect
    createThemeChangeAnimation(crypto.color);
    
    // Remove transition class after animation
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
    
    // Update ticker with current crypto highlight
    updateTicker(crypto);
}

// Highlight selected crypto card
function highlightSelectedCard(selectedCard) {
    // Remove previous selection
    document.querySelectorAll('.crypto-card').forEach(card => {
        card.classList.remove('selected');
        card.style.boxShadow = '';
    });
    
    // Add selection to clicked card
    selectedCard.classList.add('selected');
    const cryptoIndex = selectedCard.getAttribute('data-crypto');
    const crypto = cryptocurrencies[cryptoIndex];
    selectedCard.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(${hexToRgb(crypto.color)}, 0.5)`;
    selectedCard.style.borderColor = crypto.color;
}

// Create theme change animation
function createThemeChangeAnimation(color) {
    const animation = document.createElement('div');
    animation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle at center, ${color}20, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        animation: themeWave 0.8s ease-out forwards;
    `;
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes themeWave {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0; transform: scale(1.2); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(animation);
    
    // Remove animation elements after completion
    setTimeout(() => {
        document.body.removeChild(animation);
        document.head.removeChild(style);
    }, 800);
}

// Update ticker to highlight current crypto
function updateTicker(selectedCrypto) {
    const tickerContent = document.getElementById('tickerContent');
    if (!tickerContent) return;
    
    const tickerItems = tickerContent.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
        item.style.color = '';
        item.style.fontWeight = '';
    });
    
    // Find and highlight the selected crypto in ticker
    tickerItems.forEach(item => {
        if (item.textContent.includes(selectedCrypto.symbol)) {
            item.style.color = selectedCrypto.color;
            item.style.fontWeight = 'bold';
            item.style.textShadow = `0 0 10px ${selectedCrypto.color}40`;
        }
    });
}

// Setup theme toggle functionality
function setupThemeToggle() {
    if (!themeToggle) return;
    
    let isDarkMode = true; // Start with dark mode
    
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.removeAttribute('data-color-scheme');
            themeToggle.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            themeToggle.textContent = '☀️';
        }
        
        // Add bounce animation
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.crypto-card, .feature-card, .market-card, .portfolio-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Utility function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        null;
}

// Add particle effect for enhanced visuals
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2,
            opacity: Math.random() * 0.5
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = currentCrypto ? 
                `rgba(${hexToRgb(currentCrypto.color)}, ${particle.opacity})` : 
                `rgba(73, 116, 147, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();
}

// Enhanced button interactions
function setupButtonInteractions() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupButtonInteractions();
    createParticleEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1;
        if (cryptocurrencies[index]) {
            changeTheme(cryptocurrencies[index]);
            const card = document.querySelector(`[data-crypto="${index}"]`);
            if (card) {
                highlightSelectedCard(card);
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle resize-dependent functionality here
    }, 250);
});

// Add error handling for theme changes
window.addEventListener('error', function(e) {
    console.warn('Theme change error:', e);
    // Fallback to default theme if error occurs
    if (currentCrypto === null) {
        changeTheme(cryptocurrencies[1]); // Default to Ethereum
    }
});