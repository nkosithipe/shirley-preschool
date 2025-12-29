document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle Logic ---
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

    // --- Fundraiser Progress Bar Logic ---
    // Example variables for the progress bar (will be updated manually)
    const targetGoal = 35000; // R 35,000.00
    let currentRaised = 12500; // R 12,500.00 (Example start amount - Number updated manually as donations come in!)
    
    const progressBar = document.querySelector('.progress-bar-fill');
    const raisedText = document.querySelector('#raised-amount'); 

    // --- Function to calculate and display progress ---
    if (progressBar) {
        // Calculate percentage
        const percentage = Math.floor((currentRaised / targetGoal) * 100);

    // Animate the bar after a short delay
        setTimeout(() => {
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
        // Thermometer mode: Width is 100%, Height is the progress
        progressBar.style.height = percentage + '%';
        progressBar.style.width = '100%';
    } else {
        // Traditional mode: Height is 100%, Width is the progress
        progressBar.style.width = percentage + '%';
        progressBar.style.height = '100%';
    }
}, 500);
    }
});