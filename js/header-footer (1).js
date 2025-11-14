// Function to load header and footer dynamically
function loadHeaderFooter() {
    // Determine the correct path based on current location
    const isInBlogArticles = window.location.pathname.includes('/blog-articles/');
    const basePath = isInBlogArticles ? '../' : './';
    
    // Load header
    fetch(basePath + 'header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeader();
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch(basePath + 'footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
    
    // Load modals
    loadModals(basePath);
}

// Function to load modals
function loadModals(basePath) {
    // Load consultation modal
    fetch(basePath + 'consultation-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modals-placeholder').innerHTML += data;
        })
        .catch(error => console.error('Error loading consultation modal:', error));
    
    // Load application modal
    fetch(basePath + 'application-modal.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('modals-placeholder').innerHTML += data;
            // Initialize modals after they are loaded
            setTimeout(initializeModals, 100);
        })
        .catch(error => console.error('Error loading application modal:', error));
}

// Initialize header functionality
function initializeHeader() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu when a link is clicked
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadHeaderFooter);
