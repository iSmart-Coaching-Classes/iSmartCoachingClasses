// ======================================================
// TOP BAR TICKER PAUSE ON HOVER (JS EVENT LISTENERS)
// ======================================================

// 1. Ticker element ko HTML se pick kar rahe hain
const ticker = document.getElementById('ticker-text');

// 2. Jab mouse text ke upar aaye (MouseEnter Event)
ticker.addEventListener('mouseenter', function() {
    ticker.classList.add('paused'); // Scrolling ko rok do
});

// 3. Jab mouse text se hat jaye (MouseLeave Event)
ticker.addEventListener('mouseleave', function() {
    ticker.classList.remove('paused'); // Scrolling dobara shuru karo
});

// ======================================================
// CLEAN MOBILE MENU & DROPDOWN TOGGLE FIX
// ======================================================
document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle') || document.querySelector('.mobile-menu-btn') || document.querySelector('.hamburger');

    if (!navMenu) return;

    // 1. Hamburger Button Click: Menu Open/Close Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            // Clean inline styles to avoid white rectangle bugs
            navMenu.removeAttribute('style');
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // 2. Dropdown Parent Toggle (Click 1: Open, Click 2: Close)
    const allListItems = navMenu.querySelectorAll('li');
    allListItems.forEach(li => {
        const subMenu = li.querySelector('ul');
        const triggerLink = li.querySelector('a');

        if (subMenu && triggerLink) {
            triggerLink.addEventListener('click', function (e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Toggle active class on li element
                    li.classList.toggle('active');
                }
            });
        }
    });

    // 3. Click on Regular Link: Close Menu Cleanly
    const allLinks = navMenu.querySelectorAll('a');
    allLinks.forEach(link => {
        const hasSubMenu = link.nextElementSibling && link.nextElementSibling.tagName === 'UL';
        
        if (!hasSubMenu) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    // Close menu by removing active classes
                    navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                    
                    // Reset dropdown states
                    allListItems.forEach(li => li.classList.remove('active'));
                }
            });
        }
    });
});


// ======================================================
// ENQUIRY FORM PHONE VALIDATION BEFORE NETLIFY SUBMIT
// ======================================================
const enquiryForm = document.getElementById('enquiry-form');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        const phoneInput = document.getElementById('parent_phone');
        const phone = phoneInput.value.trim();

        // 10 digit phone check
        if (phone.length !== 10 || isNaN(phone)) {
            e.preventDefault(); // Agar number sahi nahi hai toh submit hone se roko
            alert('Kripya 10-digit ka valid mobile number darj karein.');
            return false;
        }
        
        // Form Netlify par submit hone ke liye aage badhega
    });
}

// ======================================================
// ANIMATED NUMBERS FOR TRUST COUNTERS
// ======================================================
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function runCounters() {
    counters.forEach(counter => {
        counter.innerText = '0';
        const target = +counter.getAttribute('data-target');
        const increment = target / 50;

        const updateCounter = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

// Trigger animation on Scroll
window.addEventListener('scroll', function() {
    const section = document.getElementById('trust-counters');
    if (section) {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !hasAnimated) {
            hasAnimated = true;
            runCounters();
        }
    }
});



// ======================================================
// TESTIMONIALS SLIDESHOW CAROUSEL SCRIPT
// ======================================================
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });

        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Buttons Click Event
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    // Dots Click Event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetTimer();
        });
    });

    // Automatic Slide every 4 Seconds
    function startTimer() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Start carousel only if slides exist
    if (slides.length > 0) {
        startTimer();
    }
});

// ======================================================
// FLOATING BACK TO TOP BUTTON SCRIPT
// ======================================================
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    // Scroll check to show/hide button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// ======================================================
// DEMO BUTTON SMOOTH SCROLL WITH HEADER HEIGHT OFFSET
// ======================================================
document.addEventListener('DOMContentLoaded', function () {
    // Select all buttons pointing to enquiry section or enquiry form
    const demoButtons = document.querySelectorAll('a[href="#enquiry-section"], a[href="#enquiry-form"]');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Target section by ID
            const targetSection = document.getElementById('enquiry-section');
            
            if (targetSection) {
                // Header ki height dynamic calculate karna
                const header = document.querySelector('header') || document.querySelector('.navbar');
                const headerOffset = header ? header.offsetHeight + 20 : 100; // Extra 20px breathing space
                
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Perfect Smooth Scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Footer Copyright Year Auto Update
document.getElementById('current-year').textContent = new Date().getFullYear();
