// assets/js/main.js

/**
 * Function to load external HTML components (Header/Footer)
 * into placeholder IDs using the Fetch API.
 */
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Check for the correct response status when running locally (status 200)
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Header and Footer components
    loadComponent('header-placeholder', 'header.html').then(() => {
        // 2. Setup Mobile Menu Toggles ONLY after the header content is loaded
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMenuBtn = document.getElementById('close-menu-btn');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });

            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    });

    loadComponent('footer-placeholder', 'footer.html');

    // Optional: Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});