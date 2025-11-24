// Simple, clean JavaScript - no excessive animations

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for internal links
    initSmoothScroll();
    
    // Simple scroll reveal
    initScrollReveal();
    
    // Track reading progress
    initProgressTracking();
    
    // Initialize analytics
    initAnalytics();
});

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Simple Scroll Reveal
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scenario-card, .process-card, .method-card, .feature, .benefit');
    
    const revealOnScroll = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
}

// Reading Progress
function initProgressTracking() {
    let timeOnPage = 0;
    let scrollDepth = 0;
    
    // Track time on page
    setInterval(() => {
        timeOnPage++;
        
        // Milestones
        if (timeOnPage === 30) {
            console.log('User engaged: 30 seconds');
        } else if (timeOnPage === 60) {
            console.log('User engaged: 1 minute');
        } else if (timeOnPage === 180) {
            console.log('User highly engaged: 3 minutes');
        }
    }, 1000);
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - winHeight;
        const scrolled = window.scrollY;
        const currentDepth = Math.floor((scrolled / docHeight) * 100);
        
        if (currentDepth > scrollDepth) {
            scrollDepth = currentDepth;
            
            // Track milestones
            if (scrollDepth === 25 || scrollDepth === 50 || scrollDepth === 75 || scrollDepth === 100) {
                console.log(`Scroll depth: ${scrollDepth}%`);
                trackEvent('Engagement', 'Scroll Depth', scrollDepth);
            }
        }
    });
}

// Analytics
function initAnalytics() {
    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'Click', buttonText);
        });
    });
    
    // Track video plays
    const videos = document.querySelectorAll('iframe');
    videos.forEach(video => {
        // Note: Limited tracking for YouTube embeds without API
        console.log('Video present on page');
    });
}

// Track Events
function trackEvent(category, action, label = null) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    // Console log for debugging
    console.log(`Event: ${category} - ${action}${label ? ' - ' + label : ''}`);
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle Purchase
function handlePurchase() {
    const paymentLink = 'https://your-payment-page.com';
    
    // Track event
    trackEvent('Conversion', 'Purchase Click', '₦2,500');
    
    // Open in new tab
    window.open(paymentLink, '_blank');
    
    // Optional: Show message in current tab
    const button = event.target.closest('.cta-button');
    if (button) {
        button.innerHTML = 'Opening payment page...';
    }
}

// Simple notification when user tries to leave
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        console.log('User showing exit intent');
        // Could show a simple modal here if needed
    }
});

// Page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left tab');
    } else {
        console.log('User returned to tab');
    }
});

console.log('Total Reboot System initialized');

// Add Countdown Timer for Special Offer
function initPriceCountdown() {
    // Set end time (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    // Create countdown element
    const countdownHTML = `
        <div class="price-countdown">
            <p class="countdown-label">🔥 Special Price Ends In:</p>
            <div class="countdown-timer">
                <span id="hours">23</span>h
                <span id="minutes">59</span>m
                <span id="seconds">59</span>s
            </div>
        </div>
    `;
    
    // Insert after price box
    const priceBox = document.querySelector('.price-box');
    if (priceBox) {
        priceBox.insertAdjacentHTML('beforeend', countdownHTML);
    }
    
    // Update timer
    setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            document.querySelector('.price-countdown').innerHTML = '<p>Offer Expired - Refresh for New Deal</p>';
        }
    }, 1000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    initPriceCountdown();
});
