document.addEventListener('DOMContentLoaded', function() {
    const successMessage = document.getElementById('success-message');

    if (successMessage) {
        setTimeout(function() {
            successMessage.classList.add('hide'); // Add the hide class
        }, 3000);
    }
});
