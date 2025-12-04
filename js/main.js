// js/main.js

// --- Mobile Menu Functions ---

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    
    menu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    
    menu.classList.add('hidden');
    openIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}


// --- Modal Functions ---

function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

function closeModalOnOutsideClick(event) {
    const modal = document.getElementById('quoteModal');
    if (event.target === modal) {
        closeQuoteModal();
    }
}

function handleQuoteSubmit(event) {
    event.preventDefault(); // Stop the default form submission for now
    
    // Get the form that was submitted (either quoteForm or contactPageForm)
    const formId = event.currentTarget.id;
    const form = document.getElementById(formId);
    
    // Simulation: Show Success Message
    form.innerHTML = `
        <div class="text-center p-8 bg-ka-light rounded-lg">
            <h4 class="text-2xl font-bold text-ka-green mb-4">Request Submitted Successfully! 🎉</h4>
            <p class="text-gray-700">Thank you! We've received your quote request and one of our team members will be in touch within 24 hours.</p>
        </div>
    `;

    // Close the modal if it was submitted from the modal form
    if (formId === 'quoteForm') {
        setTimeout(closeQuoteModal, 3000); 
    }
}


// --- Particle Functions ---

function createParticles() {
    // Only run particle creation on the index.html page
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return; 

    const numberOfParticles = 15;
    
    particlesContainer.innerHTML = ''; 

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.left = Math.random() * 100 + '%';
        
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = Math.random() * 8 + 6 + 's'; 
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles and other DOM-related scripts when the page loads
document.addEventListener('DOMContentLoaded', createParticles);