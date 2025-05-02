/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // === Fully randomized glitch effect with rare super glitch for all .glitch-pop-bar elements ===
    const glitchEls = document.querySelectorAll('.glitch-pop-bar');

    glitchEls.forEach(glitchEl => {
        let glitchTimeout;
        let isHovering = false;

        function getRandomColor() {
            const neonColors = ['#faff00', '#ff00c8', '#00ffe7', '#ff5e00', '#39ff14'];
            return neonColors[Math.floor(Math.random() * neonColors.length)];
        }

        function getRandomClipPath() {
            const top = Math.floor(Math.random() * 80);
            const bottom = Math.floor(Math.random() * 80);
            return `inset(${top}% 0 ${bottom}% 0)`;
        }

        function getRandomTransform() {
            const x = (Math.random() * 8 - 4).toFixed(1);
            const y = (Math.random() * 8 - 4).toFixed(1);
            return `translate(${x}px, ${y}px)`;
        }

        function triggerRandomGlitch(force = false) {
            if (!isHovering && !force || !glitchEl) return;

            const layers = [];
            const duration = Math.random() * 300 + 200;

            const applyLayer = (pseudo, className, delay) => {
                setTimeout(() => {
                    const style = document.createElement('style');
                    const color = getRandomColor();
                    const transform = getRandomTransform();
                    const clip = getRandomClipPath();
                    const key = `glitch-${pseudo}-${Math.random().toString(36).substr(2, 5)}`;
                    style.innerHTML = `
                        .${className}::${pseudo} {
                            background-color: ${color};
                            clip-path: ${clip};
                            transform: ${transform};
                            animation: ${key} ${duration}ms steps(2, end);
                            opacity: 1 !important;
                        }
                        @keyframes ${key} {
                            0% {
                                clip-path: ${clip};
                                transform: ${transform};
                            }
                            100% {
                                clip-path: ${getRandomClipPath()};
                                transform: ${getRandomTransform()};
                            }
                        }
                    `;
                    document.head.appendChild(style);
                    glitchEl.classList.add(className);
                    layers.push(style);
                }, delay);
            };

            const beforeDelay = Math.random() * 150;
            const afterDelay = Math.random() * 150;

            applyLayer('before', 'glitch-before', beforeDelay);
            applyLayer('after', 'glitch-after', afterDelay);

            if (Math.random() < 0.1) {
                applyLayer('before', 'glitch-before', 100);
                applyLayer('after', 'glitch-after', 150);
            }

            setTimeout(() => {
                glitchEl.classList.remove('glitch-before', 'glitch-after');
                layers.forEach(style => style.remove());
                const nextDelay = Math.random() * 1200 + 300;
                glitchTimeout = setTimeout(() => triggerRandomGlitch(force), nextDelay);
            }, duration + 50);
        }

        glitchEl.addEventListener('mouseenter', () => {
            isHovering = true;
            triggerRandomGlitch();
        });

        glitchEl.addEventListener('mouseleave', () => {
            isHovering = false;
            clearTimeout(glitchTimeout);
            glitchEl.classList.remove('glitch-before', 'glitch-after');
        });

        // Start idle glitch loop for this element
        (function idleLoop() {
            const delay = Math.random() * 20000 + 10000;
            setTimeout(() => {
                if (!isHovering) {
                    triggerRandomGlitch(true);
                }
                idleLoop();
            }, delay);
        })();
    });

    // === Contact Form Handling via Formspree JSON ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = {
                Name: contactForm.name.value,
                Email: contactForm.email.value,
                Phone: contactForm.phone.value,
                Message: contactForm.message.value,
            };

            try {
                const response = await fetch('https://formspree.io/f/xdkgeknl', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const statusMsg = document.getElementById('status-msg');
                if (response.ok) {
                    if (statusMsg) statusMsg.textContent = 'Message sent!';
                    contactForm.reset();
                } else {
                    if (statusMsg) statusMsg.textContent = 'Error sending message.';
                }
            } catch (error) {
                const statusMsg = document.getElementById('status-msg');
                if (statusMsg) statusMsg.textContent = 'Something went wrong.';
            }
        });
    }

});
