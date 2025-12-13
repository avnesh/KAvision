// assets/js/main.js

/**
 * Function to asynchronously load external HTML components (Header/Footer)
 * into placeholder IDs using the Fetch API.
 */
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
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
    const MANUAL_RATE = 800;
    const AUTOMATION_RATE = 1100;

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
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        });

        // Update the display element
        totalCostDisplay.textContent = formatter.format(totalCost);
    };

    // Attach the calculation function to input events for real-time update
    manualInput.addEventListener('input', calculateCost);
    automationInput.addEventListener('input', calculateCost);

    // Run once on page load to set the initial formatted value (₹ 0)
    if (!manualInput.value) manualInput.value = 0;
    if (!automationInput.value) automationInput.value = 0;
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
    loadComponent('footer-placeholder', 'footer.html').then(() => {
        const scrollBtn = document.getElementById('scroll-to-top');
        if (scrollBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollBtn.classList.remove('opacity-0', 'translate-y-10', 'invisible');
                } else {
                    scrollBtn.classList.add('opacity-0', 'translate-y-10', 'invisible');
                }
            });

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });

    // 3. Initialize Cost Estimator (Runs only on pricing.html if elements are present)
    setupCostEstimator();

    // 4. Smooth Scroll (CSS scroll-smooth handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.pathname === window.location.pathname) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // whether animation should happen only once - while scrolling down
            offset: 100, // offset (in px) from the original trigger point
            duration: 800, // values from 0 to 3000, with step 50ms
            easing: 'ease-out-cubic', // default easing for AOS animations
        });
    }
});

function toggleFaq(button) {
    const faqItem = button.closest(".faq-item");
    const content = faqItem.querySelector(".faq-content");
    const icon = faqItem.querySelector(".faq-icon");

    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    // Close all FAQ items
    document.querySelectorAll(".faq-content").forEach(el => {
        el.style.maxHeight = "0px";
    });

    document.querySelectorAll(".faq-icon").forEach(ic => {
        ic.style.transform = "rotate(0deg)";
    });

    // Open clicked FAQ if it was closed
    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.style.transform = "rotate(45deg)"; // plus → X
    }
}
