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
    function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar-fill');
    const raisedElement = document.getElementById('raised-amount'); 
    const currentRaised = 100; // These would be dynamic in a real app
    const goal = 35000;
    const actualPercentage = (currentRaised / goal) * 100; // Calculate percentage or actual math

    // 2. Visual logic: If they have raised money, show at least 3% 
    // so the bar doesn't "disappear"
    let visualPercentage = actualPercentage;
    if (currentRaised > 0 && actualPercentage < 3) {
        visualPercentage = 3; 
    }  
   
    //const raisedText = document.querySelector('#raised-amount'); 
    const isDesktop = window.innerWidth >= 768;
            
    // Animate the bar after a short delay
        setTimeout(() => {
    if (isDesktop) {
        // Desktop - Vertical Thermometer mode: Width is 100%, Height is the progress
        progressBar.style.height = visualPercentage + '%';
        progressBar.style.width = '100%'; // Ensure it fills the 35px width
    } else {
        // Mobile - Horizontal mode: Height is 100%, Width is the progress
        progressBar.style.width = visualPercentage + '%';
        progressBar.style.height = '100%'; // Ensure it fills the 25px height
    }

    // Keep the label showing the REAL number, not the visual tweak
    raisedElement.textContent = `R${currentRaised.toLocaleString()}`;
}, 500);
    }
    // Run on load
window.addEventListener('load', updateProgressBar);
// Run on resize so it fixes itself instantly if you rotate a phone
window.addEventListener('resize', updateProgressBar);
});

// Function to strip dangerous characters
function sanitizeInput(str) {
    return str.replace(/[<>;()]/g, "").trim();
}

document.getElementById('enquiry-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // 1. Final Sanity Check before sending
    const cleanName = sanitizeInput(nameInput.value);
    const cleanPhone = sanitizeInput(phoneInput.value);
    const cleanMessage = sanitizeInput(messageInput.value);

    // 2. Validate length again in JS
    if (cleanName.length < 2 || cleanPhone.length < 10) {
        alert("Please ensure your name and phone number are entered correctly.");
        return;
    }

    // 3. Prepare data for Formspree
    const formData = new FormData();
    formData.append('name', cleanName);
    formData.append('phone', cleanPhone);
    formData.append('message', cleanMessage);
    formData.append('subject', document.getElementById('subject').value);

    // 4. Submit to Formspree
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            handleSuccess(form);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        alert("Connection error. Please try again or call us directly.");
    }
});

function handleSuccess(formElement) {
    const wrapper = formElement.parentElement;
    wrapper.textContent = ''; 
    
    const heading = document.createElement('h3');
    heading.className = "text-primary";
    heading.textContent = 'Enquiry Received!';
    
    const text = document.createElement('p');
    text.textContent = 'Thank you. We have securely received your message and will be in touch shortly.';

    wrapper.appendChild(heading);
    wrapper.appendChild(text);
}
