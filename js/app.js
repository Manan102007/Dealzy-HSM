// Dealzy App - Unified Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Page to Login Page Transition (for splash/index if applicable)
    const loadingPage = document.getElementById('loading-page');
    if (loadingPage) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2500);
    }

    // 2. Segmented Tab Switching (Sign In <-> Sign Up) with animated sliding pill
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const pill = document.getElementById('segmented-pill');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formHeading = document.getElementById('form-heading');
    const formSubheading = document.getElementById('form-subheading');
    const demoFillBtn = document.getElementById('btn-fill-demo');

    function switchToLogin() {
        if (!tabLogin) return;
        tabLogin.classList.add('active');
        tabLogin.setAttribute('aria-selected', 'true');
        tabSignup.classList.remove('active');
        tabSignup.setAttribute('aria-selected', 'false');

        if (pill) {
            pill.style.transform = 'translateX(0)';
        }

        if (loginForm && signupForm) {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        }

        if (formHeading && formSubheading) {
            formHeading.textContent = 'Welcome Back';
            formSubheading.textContent = 'Sign in to access your local deals, vouchers & stores';
        }

        if (demoFillBtn) {
            demoFillBtn.style.display = 'inline-flex';
        }
    }

    function switchToSignup() {
        if (!tabSignup) return;
        tabSignup.classList.add('active');
        tabSignup.setAttribute('aria-selected', 'true');
        tabLogin.classList.remove('active');
        tabLogin.setAttribute('aria-selected', 'false');

        if (pill) {
            pill.style.transform = 'translateX(100%)';
        }

        if (loginForm && signupForm) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }

        if (formHeading && formSubheading) {
            formHeading.textContent = 'Join DEALZY';
            formSubheading.textContent = 'Create your account to unlock neighborhood discounts';
        }

        if (demoFillBtn) {
            demoFillBtn.style.display = 'none';
        }
    }

    if (tabLogin && tabSignup) {
        tabLogin.addEventListener('click', switchToLogin);
        tabSignup.addEventListener('click', switchToSignup);
    }

    // 3. One-click Demo Credentials Auto-Fill
    if (demoFillBtn) {
        demoFillBtn.addEventListener('click', () => {
            const emailInput = document.getElementById('login-identifier');
            const passInput = document.getElementById('login-password');
            if (emailInput && passInput) {
                emailInput.value = 'shopper@dealzy.com';
                passInput.value = 'Dealzy@2026!';
                if (typeof showToast === 'function') {
                    showToast('Demo credentials filled! Click Sign In.', 'success');
                }
            }
        });
    }

    // 4. Universal Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn, .toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetBtn = e.currentTarget;
            const parent = targetBtn.closest('.input-icon-box') || targetBtn.closest('.password-input-wrapper') || targetBtn.parentElement;
            const input = parent.querySelector('input');
            if (!input) return;

            const icon = targetBtn.querySelector('i') || targetBtn;
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    // 5. Password Strength Meter for Sign Up
    const signupPasswordInput = document.getElementById('signup-password');
    const strengthBox = document.getElementById('password-strength-box');
    const seg1 = document.getElementById('strength-seg-1');
    const seg2 = document.getElementById('strength-seg-2');
    const seg3 = document.getElementById('strength-seg-3');
    const seg4 = document.getElementById('strength-seg-4');
    const strengthText = document.getElementById('strength-text');

    if (signupPasswordInput && strengthBox) {
        signupPasswordInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if (!val) {
                strengthBox.style.display = 'none';
                return;
            }
            strengthBox.style.display = 'block';

            let score = 0;
            if (val.length >= 6) score++;
            if (val.length >= 8 && /[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            // Reset segments
            [seg1, seg2, seg3, seg4].forEach(seg => {
                if (seg) seg.style.backgroundColor = '#E5E7EB';
            });

            if (score <= 1) {
                if (seg1) seg1.style.backgroundColor = '#EF4444';
                if (strengthText) {
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = '#EF4444';
                }
            } else if (score === 2) {
                if (seg1) seg1.style.backgroundColor = '#F59E0B';
                if (seg2) seg2.style.backgroundColor = '#F59E0B';
                if (strengthText) {
                    strengthText.textContent = 'Fair';
                    strengthText.style.color = '#F59E0B';
                }
            } else if (score === 3) {
                if (seg1) seg1.style.backgroundColor = '#3B82F6';
                if (seg2) seg2.style.backgroundColor = '#3B82F6';
                if (seg3) seg3.style.backgroundColor = '#3B82F6';
                if (strengthText) {
                    strengthText.textContent = 'Good';
                    strengthText.style.color = '#3B82F6';
                }
            } else {
                [seg1, seg2, seg3, seg4].forEach(seg => {
                    if (seg) seg.style.backgroundColor = '#10B981';
                });
                if (strengthText) {
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = '#10B981';
                }
            }
        });
    }

    // 6. Forgot Password Modal Triggers
    const forgotTrigger = document.getElementById('trigger-forgot-password');
    const forgotModal = document.getElementById('forgot-password-modal');
    const forgotClose = document.getElementById('close-forgot-modal');

    if (forgotTrigger && forgotModal) {
        forgotTrigger.addEventListener('click', () => {
            forgotModal.classList.add('active');
        });
    }

    if (forgotClose && forgotModal) {
        forgotClose.addEventListener('click', () => {
            forgotModal.classList.remove('active');
        });

        // Close on clicking backdrop
        forgotModal.addEventListener('click', (e) => {
            if (e.target === forgotModal) {
                forgotModal.classList.remove('active');
            }
        });
    }

    // 7. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
});
