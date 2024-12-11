document.addEventListener('DOMContentLoaded', function() {
    // Mobile view notice
    if (window.innerWidth > 480) {
        const notice = document.createElement('div');
        notice.className = 'mobile-view-notice';
        notice.innerHTML = '<i class="fas fa-mobile-alt"></i> This is a mobile view. For best experience, use your mobile device.';
        document.body.appendChild(notice);

        setTimeout(() => {
            notice.remove();
        }, 6000);
    }

    // Modal functions
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    // Button click handlers
    const buttonMappings = {
        'book-now-btn': 'book-now-modal',
        'book-now-footer-btn': 'book-now-modal',
        'reviews-btn': 'reviews-modal',
        'nearby-btn': 'nearby-modal',
        'emergency-btn': 'emergency-modal',
        'rules-btn': 'rules-modal',
        'specials-btn': 'specials-modal',
        'host-favorites': 'host-favorites-modal',
        'amenities-card': 'amenities-modal',
        'gallery-card': 'gallery-modal'
    };

    // Add click handlers for all buttons
    Object.entries(buttonMappings).forEach(([btnId, modalId]) => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', () => openModal(modalId));
        }
    });

    // Close button handlers
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Share button functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Mrudhgandh PoolVilla - Digital Guidebook",
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
    }

    // Initialize collapsible sections
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('show');

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

    // Gallery functionality
    function initializeGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
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
                document.body.appendChild(lightbox);
                
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

    // Initialize gallery when gallery card is clicked
    const galleryCard = document.getElementById('gallery-card');
    if (galleryCard) {
        galleryCard.addEventListener('click', () => {
            setTimeout(initializeGallery, 100);
        });
    }
}); 