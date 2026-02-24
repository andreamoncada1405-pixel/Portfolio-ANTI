// --- CONTACT FORM LOGIC ---
// --- CONTACT FORM LOGIC ---
// --- CONTACT FORM LOGIC (Iframe Submission - The most reliable method) ---

// 1. Handle the "Loading" state when the user clicks Send
function handleFormLoading(event) {
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // Immediate feedback
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="opacity-40 tracking-widest">...</span>';

    // Optimistic UI: Trigger success after a tiny "think" delay
    // This removes all perceived lag and makes the form feel extremely fast.
    setTimeout(() => {
        handleFormSuccess();
    }, 600);
}

// 2. Handle the "Success" UI when the hidden iframe finishes loading
function handleFormSuccess() {
    if (!window.submitted) return;

    const formContainer = document.getElementById('contact-form-container');
    const successMessage = document.getElementById('contact-success-message');
    const form = formContainer ? formContainer.querySelector('form') : null;

    if (formContainer && successMessage) {
        formContainer.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('flex');
    }

    if (form) {
        form.reset();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalText || 'Send Message';
        }
    }

    // Reset state
    window.submitted = false;
    clearTimeout(window.contactTimeout);
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
