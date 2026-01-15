document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // 1. Mobile Menu Toggle
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        });
    }

    // 2. Sticky Header Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Auto-Active Link Highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');

        // Helper to remove slash and extension for comparison
        const normalize = (p) => p.replace(/^\//, '').replace(/\.html$/, '');

        const normCurrent = normalize(currentPath);
        const normHref = normalize(href);

        // Exact match (e.g. "about" == "about")
        if (normCurrent === normHref) {
            link.classList.add('active');
        }
        // Handle explicit Home case (empty string or index)
        else if ((normCurrent === '' || normCurrent === 'index') && (normHref === '' || normHref === 'index')) {
            link.classList.add('active');
        }
    });

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.innerHTML = '&#9776;';
                }
            }
        });
    });

    // 5. Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            const action = contactForm.getAttribute('action');

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Thanks for your message! We will be in touch shortly.');
                    contactForm.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                if (action === '/contact-submit' || action.includes('YOUR_FORM_ID')) {
                    setTimeout(() => {
                        alert('NOTE: Message simulated (Form not connected to live backend yet).\n\nPlease check DEPLOYMENT.md to configure Formspree.');
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalBtnText;
                    }, 500);
                    return;
                }
                alert('Oops! There was a problem submitting your form. Please try again.');
            } finally {
                if (action !== '/contact-submit' && !action.includes('YOUR_FORM_ID')) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }
            }
        });
    }
});
