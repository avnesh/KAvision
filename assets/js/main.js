// assets/js/main.js

/**
 * Function to asynchronously load external HTML components (Header/Footer)
 * into placeholder IDs using the Fetch API.
 */
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Log error but allow page to load unstyled content
            console.error(`Failed to load component ${url}: ${response.statusText}`);
            return;
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

/**
 * Initializes the Project Cost Estimator functionality on the pricing page.
 * This function calculates and updates the total cost in real-time.
 */
function setupCostEstimator() {
    // Defined rates from the pricing table (Editable here)
    const MANUAL_RATE = 800;    // Matches ₹800/hr
    const AUTOMATION_RATE = 1100; // Matches ₹1100/hr
    
    const manualInput = document.getElementById('manual_hours');
    const automationInput = document.getElementById('automation_hours');
    const totalCostDisplay = document.getElementById('total_cost');

    // Check if the required elements exist (i.e., we are on the pricing page)
    if (!manualInput || !automationInput || !totalCostDisplay) {
        return;
    }

    const calculateCost = () => {
        // Ensure inputs are treated as numbers, defaulting to 0 if invalid
        const manualHours = parseFloat(manualInput.value) || 0;
        const automationHours = parseFloat(automationInput.value) || 0;

        // Perform Calculation
        const manualCost = manualHours * MANUAL_RATE;
        const automationCost = automationHours * AUTOMATION_RATE;
        const totalCost = manualCost + automationCost;

        // Format the total cost with Indian Rupees symbol and thousands separators
        // Use Intl.NumberFormat for proper currency formatting (INR)
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0, // No decimal places
        });

        // Update the display element
        totalCostDisplay.textContent = formatter.format(totalCost);
    };

    // 1. Attach the calculation function to input events for real-time update
    manualInput.addEventListener('input', calculateCost);
    automationInput.addEventListener('input', calculateCost);

    // 2. Run once on page load to set the initial formatted value (₹ 0)
    calculateCost();
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Header component and then initialize mobile menu
    loadComponent('header-placeholder', 'header.html').then(() => {
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

            // Close menu on link click (for internal anchor jumps)
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    });

    // 2. Load Footer component
    loadComponent('footer-placeholder', 'footer.html');

    // 3. Initialize Cost Estimator (Runs only on pricing.html if elements are present)
    setupCostEstimator();

    // 4. Smooth Scroll for internal anchor links (CSS scroll-smooth handles most, but this is a fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if the target is actually on the current page
            if (this.pathname === window.location.pathname) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});