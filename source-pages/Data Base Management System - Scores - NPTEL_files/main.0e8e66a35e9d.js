/**
 * NPTEL Candidate Portal - Main JavaScript
 *
 * This file contains common JavaScript functionality used across the application.
 * We use Alpine.js for reactive components and HTMX for dynamic updates.
 */

let mainUiBootstrapped = false;

function bootstrapMainUi() {
    if (mainUiBootstrapped) return;
    mainUiBootstrapped = true;
    const alerts = document.querySelectorAll('.alert:not(.alert-permanent)');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
    initFilePreviews();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapMainUi);
}

bootstrapMainUi();

window.openFilePreview = function(event, inputId) {
    if (event) {
        event.preventDefault();
    }

    const input = document.getElementById(inputId);
    const file = input && input.files && input.files[0];
    if (!file) {
        return false;
    }

    const objectUrl = URL.createObjectURL(file);
    window.open(objectUrl, '_blank', 'noopener,noreferrer');
    setTimeout(function() {
        URL.revokeObjectURL(objectUrl);
    }, 60 * 1000);
    return false;
};

// HTMX configuration
document.addEventListener('htmx:configRequest', function(event) {
    // Add CSRF token to all HTMX requests
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    if (csrfToken) {
        event.detail.headers['X-CSRFToken'] = csrfToken.value;
    }
});

// Show loading indicator for HTMX requests
document.addEventListener('htmx:beforeRequest', function(event) {
    const target = event.detail.target;
    if (target.classList.contains('htmx-indicator-target')) {
        const indicator = target.querySelector('.htmx-indicator');
        if (indicator) {
            indicator.style.display = 'inline-block';
        }
    }
});

document.addEventListener('htmx:afterRequest', function(event) {
    const target = event.detail.target;
    if (target.classList.contains('htmx-indicator-target')) {
        const indicator = target.querySelector('.htmx-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }
});

// Confirm before delete actions
document.addEventListener('click', function(event) {
    const confirmBtn = event.target.closest('[data-confirm]');
    if (confirmBtn) {
        const message = confirmBtn.getAttribute('data-confirm') || 'Are you sure?';
        if (!confirm(message)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
});

function initFilePreviews() {
    document.querySelectorAll('[data-file-preview]').forEach(function(container) {
        const inputId = container.getAttribute('data-file-preview');
        const input = document.getElementById(inputId);
        if (!input) return;
        const meta = container.querySelector('[data-file-preview-meta]');
        const image = container.querySelector('[data-file-preview-image]');
        const pdf = container.querySelector('[data-file-preview-pdf]');
        const openLink = container.querySelector('[data-file-preview-open]');
        let objectUrl = '';
        let isVisible = false;

        function revokeObjectUrl() {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrl = '';
            }
        }

        function hideAll() {
            if (meta) meta.textContent = '';
            if (image) {
                image.src = '';
                image.classList.add('d-none');
            }
            if (pdf) {
                pdf.src = '';
                pdf.classList.add('d-none');
            }
            if (openLink) {
                openLink.classList.add('d-none');
                openLink.removeAttribute('href');
            }
            container.classList.add('d-none');
            isVisible = false;
        }

        function render() {
            revokeObjectUrl();
            const file = input.files && input.files[0];
            if (!file) {
                hideAll();
                return;
            }

            container.classList.remove('d-none');
            isVisible = true;
            if (meta) {
                const typeLabel = file.type || 'unknown type';
                meta.textContent = `${file.name} · ${typeLabel} · ${(file.size / 1024).toFixed(1)} KB`;
            }

            objectUrl = URL.createObjectURL(file);
            if (file.type.startsWith('image/')) {
                if (image) {
                    image.src = objectUrl;
                    image.classList.remove('d-none');
                }
            } else if (file.type === 'application/pdf') {
                if (pdf) {
                    pdf.src = objectUrl;
                    pdf.classList.remove('d-none');
                }
            } else if (meta) {
                meta.textContent = `${file.name} · preview not available for this file type`;
            }

            if (openLink) {
                openLink.href = objectUrl;
                openLink.classList.remove('d-none');
            }
        }

        input.addEventListener('change', render);
        render();

        window.addEventListener('beforeunload', revokeObjectUrl);
    });
}

// Copy to clipboard utility
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="toast-body bg-success text-white">
                <i class="bi bi-check-circle"></i> Copied to clipboard!
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        setTimeout(function() {
            toast.remove();
        }, 3000);
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
};

// Form validation helper
window.validateForm = function(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return false;
    }
    return true;
};

// Print utility
window.printElement = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(function() {
        printWindow.print();
        printWindow.close();
    }, 250);
};

console.log('NPTEL Candidate Portal - Ready');
