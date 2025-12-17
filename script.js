document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('#main-nav');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide the menu
            navLinks.classList.toggle('active');

            // Accessibility: Update the aria-expanded attribute
            let isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- Fundraiser Progress Bar Logic (We will build this later) ---
    // Example variables for the progress bar (will be updated manually)
    const targetGoal = 35000; // R 35,000.00
    let currentRaised = 12500; // R 12,500.00 (Example start amount)
    
    // Function to calculate and display progress... (To be added in Phase 3 of build)
});