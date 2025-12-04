// ===================================
// STUDENT ORBIT - INTERACTIVE FEATURES
// ===================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFilters();
    initFavorites();
    initSearch();
});

// ===================================
// NAVIGATION
// ===================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Sticky navigation on scroll
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for shadow
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for modal triggers
            if (href === '#' || href === '#login' || href === '#signup' || href === '#video') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// SCROLL EFFECTS
// ===================================

function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .school-card, .testimonial-card, .step');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// ANIMATIONS
// ===================================

function initAnimations() {
    // Animate hero stats on load
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = stat.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                stat.textContent = stat.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    });
    
    // Animate progress bar
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = progressBar.style.width || '85%';
        }, 500);
    }
}

// ===================================
// FILTERS
// ===================================

function initFilters() {
    const filterPills = document.querySelectorAll('.pill');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked pill
            this.classList.add('active');
            
            // Filter schools (placeholder - would connect to actual filtering logic)
            const filter = this.textContent.trim();
            console.log('Filtering by:', filter);
            
            // Add animation to school cards
            const schoolCards = document.querySelectorAll('.school-card');
            schoolCards.forEach((card, index) => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = `fadeInUp 0.6s ease forwards`;
                    card.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });
        });
    });
}

// ===================================
// FAVORITES
// ===================================

function initFavorites() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const svg = this.querySelector('svg');
            const isFavorited = svg.getAttribute('fill') === 'currentColor';
            
            if (isFavorited) {
                svg.removeAttribute('fill');
                this.setAttribute('aria-label', 'Add to favorites');
                showNotification('Removed from favorites', 'info');
            } else {
                svg.setAttribute('fill', 'currentColor');
                this.setAttribute('aria-label', 'Remove from favorites');
                showNotification('Added to favorites!', 'success');
            }
            
            // Add animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ===================================
// SEARCH
// ===================================

function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        let debounceTimer;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            
            debounceTimer = setTimeout(() => {
                const query = this.value.toLowerCase();
                console.log('Searching for:', query);
                
                // Placeholder for actual search logic
                if (query.length > 0) {
                    showNotification(`Searching for "${query}"...`, 'info');
                }
            }, 500);
        });
    }
}

// ===================================
// NOTIFICATIONS
// ===================================

function showNotification(message, type = 'info') {
    // Check if notification container exists
    let container = document.getElementById('notification-container');
    
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        padding: 16px 24px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    notification.innerHTML = `
        <div style="
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${colors[type]};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        ">${icons[type]}</div>
        <span style="flex: 1; font-size: 14px; color: #1A1A1A;">${message}</span>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
            
            // Remove container if empty
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000);
}

// ===================================
// VIEW OPTIONS
// ===================================

document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from all buttons
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        
        // Add active to clicked button
        this.classList.add('active');
        
        const isGrid = this.textContent.includes('Grid');
        const schoolsGrid = document.querySelector('.schools-grid');
        
        if (schoolsGrid) {
            if (isGrid) {
                schoolsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(380px, 1fr))';
            } else {
                schoolsGrid.style.gridTemplateColumns = '1fr';
            }
        }
    });
});

// ===================================
// SCHOOL CARD INTERACTIONS
// ===================================

document.querySelectorAll('.school-card').forEach(card => {
    // Prevent card click when clicking buttons
    const buttons = card.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.classList.contains('btn-primary-sm')) {
                showNotification('Opening application form...', 'info');
            } else if (this.classList.contains('btn-outline-sm')) {
                showNotification('Loading school details...', 'info');
            }
        });
    });
});

// ===================================
// FORM VALIDATION (for future use)
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.getElementById('mobileMenuBtn').setAttribute('aria-expanded', 'false');
        }
    }
});

// ===================================
// LAZY LOADING IMAGES (for future use)
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// ANALYTICS (placeholder)
// ===================================

function trackEvent(category, action, label) {
    console.log('Analytics:', category, action, label);
    // Would integrate with Google Analytics, Mixpanel, etc.
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('CTA', 'Click', this.textContent.trim());
    });
});

// ===================================
// PERFORMANCE MONITORING
// ===================================

window.addEventListener('load', function() {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// ===================================
// EXPORT FOR TESTING (if using modules)
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        validateEmail,
        validatePhone,
        debounce,
        throttle,
        trackEvent
    };
}