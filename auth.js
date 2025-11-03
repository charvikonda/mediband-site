// Basic Password Protection for MediBand Website
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        password: 'mediband2025', // Change this to your desired password
        sessionKey: 'mediband_authenticated',
        sessionDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        maxAttempts: 3,
        attemptsKey: 'mediband_attempts',
        lockoutDuration: 15 * 60 * 1000 // 15 minutes in milliseconds
    };
    
    // Check if user is currently locked out
    function isLockedOut() {
        const lockoutData = localStorage.getItem('mediband_lockout');
        if (!lockoutData) return false;
        
        const lockoutTime = parseInt(lockoutData);
        const now = Date.now();
        
        if (now - lockoutTime < CONFIG.lockoutDuration) {
            return true;
        } else {
            // Lockout period expired, clear it
            localStorage.removeItem('mediband_lockout');
            localStorage.removeItem(CONFIG.attemptsKey);
            return false;
        }
    }
    
    // Check if user is authenticated
    function isAuthenticated() {
        const authData = localStorage.getItem(CONFIG.sessionKey);
        if (!authData) return false;
        
        try {
            const { timestamp } = JSON.parse(authData);
            const now = Date.now();
            
            // Check if session is still valid
            if (now - timestamp < CONFIG.sessionDuration) {
                return true;
            } else {
                // Session expired, remove it
                localStorage.removeItem(CONFIG.sessionKey);
                return false;
            }
        } catch (e) {
            // Invalid auth data, remove it
            localStorage.removeItem(CONFIG.sessionKey);
            return false;
        }
    }
    
    // Set authenticated session
    function setAuthenticated() {
        const authData = {
            timestamp: Date.now(),
            authenticated: true
        };
        localStorage.setItem(CONFIG.sessionKey, JSON.stringify(authData));
        localStorage.removeItem(CONFIG.attemptsKey);
        localStorage.removeItem('mediband_lockout');
    }
    
    // Get current attempt count
    function getAttemptCount() {
        const attempts = localStorage.getItem(CONFIG.attemptsKey);
        return attempts ? parseInt(attempts) : 0;
    }
    
    // Increment attempt count
    function incrementAttempts() {
        const currentAttempts = getAttemptCount() + 1;
        localStorage.setItem(CONFIG.attemptsKey, currentAttempts.toString());
        return currentAttempts;
    }
    
    // Set lockout
    function setLockout() {
        localStorage.setItem('mediband_lockout', Date.now().toString());
    }
    
    // Create and show login modal
    function showLoginModal() {
        // Check if already locked out
        if (isLockedOut()) {
            const remainingTime = Math.ceil((CONFIG.lockoutDuration - (Date.now() - parseInt(localStorage.getItem('mediband_lockout')))) / 60000);
            alert(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
            return;
        }
        
        const attemptCount = getAttemptCount();
        const remainingAttempts = CONFIG.maxAttempts - attemptCount;
        
        // Create modal HTML
        const modalHTML = `
            <div id="auth-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                ">
                    <div style="margin-bottom: 1.5rem;">
                        <img src="logo.png" alt="MediBand Logo" style="height: 40px; margin-bottom: 1rem;" onerror="this.style.display='none'">
                        <h2 style="color: #333; margin: 0; font-size: 1.5rem;">Protected Access</h2>
                        <p style="color: #666; margin: 0.5rem 0 0; font-size: 0.9rem;">This MediBand website is password protected</p>
                    </div>
                    
                    <form id="auth-form" style="margin-bottom: 1rem;">
                        <input 
                            type="password" 
                            id="password-input" 
                            placeholder="Enter password" 
                            style="
                                width: 100%;
                                padding: 12px;
                                border: 2px solid #e1e5e9;
                                border-radius: 8px;
                                font-size: 1rem;
                                margin-bottom: 1rem;
                                box-sizing: border-box;
                                outline: none;
                                transition: border-color 0.2s;
                            "
                            required
                        >
                        <button 
                            type="submit" 
                            style="
                                width: 100%;
                                padding: 12px;
                                background: #4169e1;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-weight: 500;
                                cursor: pointer;
                                transition: background 0.2s;
                            "
                            onmouseover="this.style.background='#3558d1'"
                            onmouseout="this.style.background='#4169e1'"
                        >
                            Access Website
                        </button>
                    </form>
                    
                    ${attemptCount > 0 ? `
                        <p style="color: #e74c3c; font-size: 0.85rem; margin: 0;">
                            ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining
                        </p>
                    ` : ''}
                    
                    <p style="color: #999; font-size: 0.75rem; margin: 1rem 0 0;">
                        Created for DECA by Charvi Konda & Nitya Shah
                    </p>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Focus on password input
        const passwordInput = document.getElementById('password-input');
        passwordInput.focus();
        
        // Handle form submission
        document.getElementById('auth-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const enteredPassword = passwordInput.value;
            
            if (enteredPassword === CONFIG.password) {
                // Correct password
                setAuthenticated();
                document.getElementById('auth-modal').remove();
                
                // Show success message briefly
                const successMsg = document.createElement('div');
                successMsg.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #27ae60;
                        color: white;
                        padding: 1rem 1.5rem;
                        border-radius: 8px;
                        z-index: 10001;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    ">
                        ✓ Access Granted - Welcome to MediBand!
                    </div>
                `;
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
                
            } else {
                // Wrong password
                const attempts = incrementAttempts();
                const remaining = CONFIG.maxAttempts - attempts;
                
                if (attempts >= CONFIG.maxAttempts) {
                    // Lock out user
                    setLockout();
                    document.getElementById('auth-modal').remove();
                    alert('Too many failed attempts. Access locked for 15 minutes.');
                } else {
                    // Show error and update remaining attempts
                    passwordInput.value = '';
                    passwordInput.style.borderColor = '#e74c3c';
                    passwordInput.style.backgroundColor = '#fdf2f2';
                    
                    setTimeout(() => {
                        passwordInput.style.borderColor = '#e1e5e9';
                        passwordInput.style.backgroundColor = 'white';
                    }, 2000);
                    
                    // Update remaining attempts display
                    const attemptMsg = document.querySelector('#auth-modal p[style*="color: #e74c3c"]');
                    if (attemptMsg) {
                        attemptMsg.textContent = `${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`;
                    } else {
                        const form = document.getElementById('auth-form');
                        form.insertAdjacentHTML('afterend', `
                            <p style="color: #e74c3c; font-size: 0.85rem; margin: 0;">
                                ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining
                            </p>
                        `);
                    }
                    
                    passwordInput.focus();
                }
            }
        });
    }
    
    // Initialize protection
    function initProtection() {
        // Only run on actual page load, not in admin/development contexts
        if (window.location.protocol === 'file:' || 
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            
            // Development mode - check if authentication should be skipped
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('skip_auth') === 'true') {
                console.log('Development mode: Authentication skipped');
                return;
            }
        }
        
        // Check authentication status
        if (!isAuthenticated()) {
            // Hide page content
            document.body.style.visibility = 'hidden';
            
            // Show login modal when page loads
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', showLoginModal);
            } else {
                showLoginModal();
            }
        }
    }
    
    // Add logout functionality
    window.medibandLogout = function() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem(CONFIG.sessionKey);
            window.location.reload();
        }
    };
    
    // Add session management
    window.medibandExtendSession = function() {
        if (isAuthenticated()) {
            setAuthenticated(); // Refresh timestamp
            alert('Session extended for 24 hours');
        } else {
            alert('Please log in again');
            window.location.reload();
        }
    };
    
    // Start protection
    initProtection();
    
})();