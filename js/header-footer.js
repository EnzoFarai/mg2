// Automatically detect base path
// Works on GitHub Pages AND Hostinger
let base = window.location.pathname.split('/')[1];

// If running inside a repo like /Mg2/
if (base && base !== '') {
    base = '/' + base + '/';
} else {
    // If running on Hostinger root
    base = '/';
}

// Function to load header and footer dynamically
function loadHeaderFooter() {
    fetch(base + 'header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeader();
        });

    fetch(base + 'footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    loadModals();
}

function loadModals() {
    fetch(base + 'consultation-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modals-placeholder').innerHTML += data;
        });

    fetch(base + 'application-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modals-placeholder').innerHTML += data;
            setTimeout(initializeModals, 100);
        });
}

function initializeHeader() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetElement = document.querySelector(anchor.getAttribute('href'));
            if (!targetElement) return;
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', loadHeaderFooter);
            
