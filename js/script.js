document.addEventListener('DOMContentLoaded', function() {
    // Add this at the beginning of your existing DOMContentLoaded function
    if (window.innerWidth > 480) {
        // Create mobile view notice
        const notice = document.createElement('div');
        notice.className = 'mobile-view-notice';
        notice.innerHTML = '<i class="fas fa-mobile-alt"></i> This is a mobile view. For best experience, use your mobile device.';
        document.body.appendChild(notice);

        // Remove notice after animation
        setTimeout(() => {
            notice.remove();
        }, 6000);
    }

    // Modal mapping
    const modalMapping = {
        'wifi-btn': 'wifi-modal',
        'reviews-btn': 'reviews-modal',
        'nearby-btn': 'nearby-modal',
        'emergency-btn': 'emergency-modal',
        'rules-btn': 'rules-modal',
        'specials-btn': 'specials-modal',
        'host-favorites': 'host-favorites-modal',
        'amenities-card': 'amenities-modal',
        'gallery-card': 'gallery-modal',
        'feedback-btn': 'feedback-modal'
    };

    // Add click handlers for all buttons
    Object.keys(modalMapping).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalMapping[btnId]);
        if (btn && modal) {
            btn.addEventListener('click', () => {
                openModal(modalMapping[btnId]);
            });
        }
    });

    // Share functionality
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Joey's In - Digital Guidebook",
                    text: 'Check out this amazing property!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
                alert('Unable to share at this time');
            }
        } else {
            alert('Share via: [Copy URL functionality to be implemented]');
        }
    });

    // Feedback form submission
    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your feedback!');
        closeModal('feedback-modal');
        feedbackForm.reset();
    });

    // Close button functionality for all modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeModal(closeBtn.closest('.modal').id);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // When opening a modal
    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.classList.add('modal-open');
    }

    // When closing a modal
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.classList.remove('modal-open');
    }

    // Add this with your other modal-related code
    const bookNowBtn = document.getElementById('book-now-btn');
    const bookNowModal = document.getElementById('book-now-modal');

    // Add event listener for the book now button
    bookNowBtn.addEventListener('click', () => {
        bookNowModal.style.display = 'block';
    });

    // Make sure the book now modal closes with the close button
    bookNowModal.querySelector('.close').addEventListener('click', () => {
        bookNowModal.style.display = 'none';
    });

    // Close book now modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === bookNowModal) {
            bookNowModal.style.display = 'none';
        }
    });

    // Initialize collapsible sections
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class on header
            this.classList.toggle('active');
            
            // Get the content section
            const content = this.nextElementSibling;
            
            // Toggle show class on content
            content.classList.toggle('show');
            
            // Optional: Close other sections when opening one
            if (this.classList.contains('active')) {
                categoryHeaders.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.classList.remove('show');
                    }
                });
            }
        });
    });
    
    // Open first category by default
    if (categoryHeaders.length > 0) {
        categoryHeaders[0].classList.add('active');
        categoryHeaders[0].nextElementSibling.classList.add('show');
    }

    // Add this to your existing script.js
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const body = document.body;

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(closeBtn);
                body.appendChild(lightbox);
                
                setTimeout(() => lightbox.classList.add('active'), 10);
                
                const closeLightbox = () => {
                    lightbox.classList.remove('active');
                    setTimeout(() => lightbox.remove(), 300);
                };
                
                closeBtn.addEventListener('click', closeLightbox);
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) closeLightbox();
                });
            });
        });
    }

    // Add this to your DOMContentLoaded event listener
    document.getElementById('gallery-btn').addEventListener('click', () => {
        setTimeout(initializeGallery, 100);
    });
}); 