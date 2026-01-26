
// --- CONTACT FORM LOGIC ---
function handleContactSubmit(event) {
    event.preventDefault(); // Stop default form handling

    // Get input values
    const form = event.target;
    // We assume the inputs are in order: Name, Company, Role, Email
    // Best practice: add IDs/Names to inputs, but based on previous HTML they just had basic attributes.
    // Let's grab them by index or query selector for robustness if I can't change HTML now.
    // I previously replaced the HTML, let's assume I can querySelect inside the form.
    const inputs = form.querySelectorAll('input');
    const name = inputs[0].value;
    const company = inputs[1].value;
    const role = inputs[2].value;
    const email = inputs[3].value;

    // Construct Email Body
    // Using encodeURIComponent to ensure special characters work in mailto
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name} (${company})`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Role: ${role}\n` +
        `Email: ${email}\n\n` +
        `Hi Andrea,\n\nI'm interested in discussing...`
    );

    // Trigger Mailto
    window.location.href = `mailto:andreamoncada1405@gmail.com?subject=${subject}&body=${body}`;

    // Show Success UI (Opt-in: user still has to press send in their mail app, but this confirms the site did its part)
    const formContainer = document.getElementById('contact-form-container');
    const successMessage = document.getElementById('contact-success-message');

    if (formContainer && successMessage) {
        formContainer.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('flex');
    }
}

// Reset form when opening the contact modal
function resetContactForm() {
    const formContainer = document.getElementById('contact-form-container');
    const successMessage = document.getElementById('contact-success-message');
    const form = formContainer ? formContainer.querySelector('form') : null;

    if (formContainer && successMessage) {
        formContainer.classList.remove('hidden');
        successMessage.classList.add('hidden');
        successMessage.classList.remove('flex');
    }

    if (form) {
        form.reset();
    }
}
