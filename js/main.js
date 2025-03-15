/**
 * Welldonewood Website JavaScript
 * Handles interactive elements like navigation, sliders, and form submissions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileNavigation();
    
    // Newsletter Form Handling
    initNewsletterForm();
    
    // Simple Testimonial Slider
    initTestimonialSlider();
    
    // Add smooth scrolling to all links
    initSmoothScrolling();
});

/**
 * Initialize Mobile Navigation
 */
function initMobileNavigation() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.innerHTML = '<span>&#9776;</span>';
    
    const nav = document.querySelector('nav');
    const headerContainer = document.querySelector('header .container');
    
    // Only add the toggle button if we found the navigation
    if (nav && headerContainer) {
        headerContainer.insertBefore(menuToggle, nav);
        
        // Toggle navigation when menu button is clicked
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const expanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
        
        // Add clickable dropdown toggles for submenus on mobile
        const hasChildrenMenus = document.querySelectorAll('nav > ul > li:has(ul)');
        
        hasChildrenMenus.forEach(item => {
            const dropdownToggle = document.createElement('button');
            dropdownToggle.className = 'dropdown-toggle';
            dropdownToggle.setAttribute('aria-label', 'Toggle submenu');
            dropdownToggle.innerHTML = '+';
            
            item.insertBefore(dropdownToggle, item.querySelector('ul'));
            
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                submenu.classList.toggle('active');
                this.innerHTML = submenu.classList.contains('active') ? '-' : '+';
            });
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = nav.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInside && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Initialize Newsletter Form
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // For Netlify forms, we'd normally let the form submit naturally
                // This is for demo purposes if not using Netlify
                const formData = new FormData(form);
                
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual submission code)
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('p');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Thank you for subscribing!';
                    form.appendChild(successMessage);
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Remove success message after a delay
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            } else {
                // Show error for invalid email
                const errorMessage = document.createElement('p');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Please enter a valid email address.';
                form.appendChild(errorMessage);
                
                // Remove error message after a delay
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        });
    }
}

/**
 * Validate Email Helper
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    
    if (slider && slider.children.length > 1) {
        let currentSlide = 0;
        const slides = slider.children;
        const slideCount = slides.length;
        
        // Hide all slides except the first one
        for (let i = 1; i < slideCount; i++) {
            slides[i].style.display = 'none';
        }
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('button');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        slider.parentNode.appendChild(dotsContainer);
        
        // Auto-advance slides every 6 seconds
        setInterval(nextSlide, 6000);
        
        function nextSlide() {
            goToSlide((currentSlide + 1) % slideCount);
        }
        
        function goToSlide(n) {
            // Hide current slide
            slides[currentSlide].style.display = 'none';
            dotsContainer.children[currentSlide].classList.remove('active');
            
            // Show new slide
            currentSlide = n;
            slides[currentSlide].style.display = 'block';
            dotsContainer.children[currentSlide].classList.add('active');
        }
    }
}

/**
 * Initialize Smooth Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
} 