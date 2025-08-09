document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('project-content');
    const closeModal = document.getElementById('close-modal');
    const modalBox = document.querySelector('.modal-content');

    // Open modal when clicking a project card
    projectCards.forEach(card => {
        card.addEventListener('click', async () => {
            const mdFile = card.getAttribute('data-project');

            try {
                const response = await fetch(mdFile);
                if (!response.ok) throw new Error('Project not found');
                const markdown = await response.text();
                modalContent.innerHTML = marked.parse(markdown);

                modal.classList.remove('hidden');

                // Disable background scroll
                document.body.style.overflow = 'hidden';

                modalBox.classList.remove('fade-slide-up');
                void modalBox.offsetWidth; // trigger reflow for animation restart
                modalBox.classList.add('fade-slide-up');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal function
    function closeProjectModal() {
        // Animate modal sliding down before hiding
        modalBox.classList.remove('fade-slide-up');
        modalBox.classList.add('fade-slide-down');

        modalBox.addEventListener('animationend', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // re-enable scroll
            modalBox.classList.remove('fade-slide-down');
        }, { once: true });
    }

    // Close modal on close button click
    closeModal.addEventListener('click', closeProjectModal);

    // Close modal on clicking outside modal content
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Navigation buttons and sections
    const navButtons = document.querySelectorAll('#top-nav .nav-btn');
    const sections = [...navButtons].map(btn => document.getElementById(btn.dataset.target));

    // Update active nav button based on scroll position
    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        let currentIndex = 0;
        sections.forEach((section, idx) => {
            if (section.offsetTop <= scrollPos) currentIndex = idx;
        });

        navButtons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentIndex);
        });
    }
    updateActiveNav();

    window.addEventListener('scroll', updateActiveNav);

    // Scroll to section on nav button click
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSection = document.getElementById(btn.dataset.target);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.85) {
                el.classList.add('visible');
            }
        });
    }

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});
