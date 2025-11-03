// Mobile Menu Functionality for MediBand Website
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('#mobile-nav');
        
        if (!mobileMenuToggle || !mobileNav) {
            return; // Elements not found, exit gracefully
        }
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            const isOpen = mobileNav.classList.contains('mobile-menu-open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
        
        // Open mobile menu
        function openMobileMenu() {
            mobileNav.classList.add('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            
            // Animate hamburger to X
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            }
            
            // Add click outside listener
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 100);
        }
        
        // Close mobile menu
        function closeMobileMenu() {
            mobileNav.classList.remove('mobile-menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
            
            // Remove click outside listener
            document.removeEventListener('click', handleClickOutside);
        }
        
        // Handle click outside menu
        function handleClickOutside(event) {
            const header = document.querySelector('header');
            if (header && !header.contains(event.target)) {
                closeMobileMenu();
            }
        }
        
        // Handle menu item clicks
        function handleMenuItemClick() {
            // Close menu when a link is clicked
            closeMobileMenu();
        }
        
        // Handle escape key
        function handleEscapeKey(event) {
            if (event.key === 'Escape' && mobileNav.classList.contains('mobile-menu-open')) {
                closeMobileMenu();
            }
        }
        
        // Add event listeners
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        
        // Add click listeners to all nav links
        const navLinks = mobileNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', handleMenuItemClick);
        });
        
        // Add escape key listener
        document.addEventListener('keydown', handleEscapeKey);
        
        // Close menu on window resize (in case user rotates device)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
        
        // Set initial aria attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'mobile-nav');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
})();