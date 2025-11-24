// ============================================
// PAYMENT CONFIGURATION
// ============================================
const PAYMENT_URL = 'https://selar.co/9qa1x9kt26'; // Your Selar link

// ============================================
// MAIN INITIALIZATION
// ============================================
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

// ============================================
// HANDLE PURCHASE - REDIRECTS TO SELAR
// ============================================
function handlePurchase() {
    // Get the button that was clicked
    const button = event.target.closest('.cta-button');
    
    // Track conversion attempt
    trackEvent('Conversion', 'Purchase Click', '₦2,500');
    
    // Option 1: Direct redirect (same tab)
    // window.location.href = PAYMENT_URL;
    
    // Option 2: Open in new tab (recommended for Selar)
    window.open(PAYMENT_URL, '_blank');
    
    // Optional: Update button to show action was taken
    if (button) {
        const originalContent = button.innerHTML;
        button.innerHTML = '✓ Opening payment page...';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalContent;
        }, 3000);
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================
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

// ============================================
// SCROLL REVEAL
// ============================================
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

// ============================================
// PROGRESS TRACKING
// ============================================
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

// ============================================
// ANALYTICS
// ============================================
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
        console.log('Video present on page');
    });
}

// ============================================
// TRACK EVENTS
// ============================================
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

// ============================================
// SCROLL TO SECTION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// EXIT INTENT DETECTION
// ============================================
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        console.log('User showing exit intent');
        // Could show an exit modal here if needed
    }
});

// ============================================
// PAGE VISIBILITY TRACKING
// ============================================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left tab');
    } else {
        console.log('User returned to tab');
    }
});

// ============================================
// SPECIAL OFFER HANDLER (if using exit intent)
// ============================================
function handleSpecialOffer() {
    // Redirect to Selar with special offer if you have one
    window.open(PAYMENT_URL, '_blank');
    trackEvent('Conversion', 'Special Offer Click', '₦2,500');
}

console.log('Total Reboot System initialized');
console.log('Payment URL configured:', PAYMENT_URL);

// ============================================
// PAYMENT CONFIGURATION
// ============================================
const PAYMENT_URL = 'https://selar.co/9qa1x9kt26';

// ============================================
// DETECT MOBILE DEVICE
// ============================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================
// HANDLE PURCHASE - WORKS ON ALL DEVICES
// ============================================
function handlePurchase(event) {
    // Prevent default action
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    // Track conversion
    try {
        trackEvent('Conversion', 'Purchase Click', '₦2,500');
    } catch (e) {
        console.log('Tracking error:', e);
    }
    
    // Mobile devices: Use direct redirect
    if (isMobile()) {
        window.location.href = PAYMENT_URL;
    } else {
        // Desktop: Try to open in new tab, fallback to redirect
        const newWindow = window.open(PAYMENT_URL, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Pop-up blocked, use redirect instead
            window.location.href = PAYMENT_URL;
        }
    }
    
    return false;
}

// ============================================
// INITIALIZE ALL CTA BUTTONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Find all CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        // Remove any existing onclick attribute
        button.removeAttribute('onclick');
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handlePurchase(e);
        });
        
        // Add touch event for mobile
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            handlePurchase(e);
        });
    });
});
