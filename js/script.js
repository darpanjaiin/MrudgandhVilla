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
        'gallery-btn': 'gallery-modal',
        'gallery-card': 'gallery-modal',
        'footer-book-btn': 'book-now-modal'
    };

    // Function to open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            document.body.classList.add('modal-open');
            modal.style.display = 'block';
            
            // Reset scroll position
            modal.scrollTop = 0;
            
            // Initialize gallery if needed
            if (modalId === 'gallery-modal') {
                setTimeout(initializeGallery, 100);
            }
            
            // Ensure modal content is visible
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.opacity = '0';
                setTimeout(() => {
                    modalContent.style.opacity = '1';
                }, 10);
            }
        }
    }

    // Add click handlers for all buttons
    Object.keys(modalMapping).forEach(btnId => {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalMapping[btnId]);
        if (btn && modal) {
            btn.addEventListener('click', () => {
                openModal(modalMapping[btnId]);
            });
            // Add touch event handler for mobile
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                openModal(modalMapping[btnId]);
            }, { passive: false });
        }
    });

    // Initialize gallery functionality
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const body = document.body;

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                showLightbox(img);
            });
            
            item.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const img = item.querySelector('img');
                showLightbox(img);
            }, { passive: false });
        });
    }

    function showLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        setTimeout(() => lightbox.classList.add('active'), 10);
        
        closeBtn.addEventListener('click', () => closeLightbox(lightbox));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox(lightbox);
        });
    }

    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300);
    }

    // Close button functionality for all modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = closeBtn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
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
        const modal = document.getElementById(modalId);
        modal.style.display = "flex";
        modal.classList.add('active');
    }

    // When closing a modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
        modal.classList.remove('active');
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

    // Improve touch handling for all grid items
    document.querySelectorAll('.grid-item').forEach(item => {
        // Remove any existing listeners first
        item.removeEventListener('touchstart', handleTouch);
        item.removeEventListener('click', handleClick);

        // Add both click and touch handlers
        item.addEventListener('click', handleClick);
        item.addEventListener('touchstart', handleTouch, { passive: false });
    });

    function handleClick(e) {
        const btnId = this.id;
        if (modalMapping[btnId]) {
            openModal(modalMapping[btnId]);
        }
    }

    function handleTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        const btnId = this.id;
        if (modalMapping[btnId]) {
            openModal(modalMapping[btnId]);
        }
    }

    // Handle footer book now button
    const footerBookBtn = document.getElementById('footer-book-btn');
    if (footerBookBtn) {
        footerBookBtn.addEventListener('click', () => {
            openModal('book-now-modal');
        });
        footerBookBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            openModal('book-now-modal');
        }, { passive: false });
    }

    // Improve touch handling for review button and all links
    function initializeTouchHandlers() {
        // Handle review button
        const reviewButton = document.querySelector('.review-button');
        if (reviewButton) {
            reviewButton.addEventListener('click', handleReviewClick);
            reviewButton.addEventListener('touchstart', handleReviewTouch, { passive: false });
        }

        // Handle all external links
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('touchstart', handleLinkTouch, { passive: false });
        });

        // Handle booking platform links
        document.querySelectorAll('.booking-link').forEach(link => {
            link.addEventListener('touchstart', handleLinkTouch, { passive: false });
        });
    }

    function handleReviewClick(e) {
        e.preventDefault();
        const link = this.closest('a');
        if (link) {
            window.open(link.href, '_blank');
        }
    }

    function handleReviewTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        const link = this.closest('a');
        if (link) {
            window.open(link.href, '_blank');
        }
    }

    function handleLinkTouch(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(this.href, '_blank');
    }

    // Initialize touch handlers
    initializeTouchHandlers();
}); 