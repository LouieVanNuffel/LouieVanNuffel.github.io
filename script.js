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

                // Animate slide up
                modalBox.classList.remove('fade-zoom');
                void modalBox.offsetWidth; // trigger reflow
                modalBox.classList.add('fade-zoom');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal with slide down animation
    function closeProjectModal() {
        modalBox.classList.remove('fade-zoom');

        modalBox.addEventListener('transitionend', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            modalContent.innerHTML = '';
        }, { once: true });
    }

    closeModal.addEventListener('click', closeProjectModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    // Navigation button switching content
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = ['about', 'projects', 'contact'];

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            sections.forEach(sec => {
                const sectionEl = document.getElementById(sec);
                if (sec === target) {
                    sectionEl.scrollIntoView({ behavior: 'smooth' });
                }
            });

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Reveal animation on scroll
    function reveal() {
        const reveals = document.querySelectorAll('.reveal');
        for (let elem of reveals) {
            const windowHeight = window.innerHeight;
            const revealTop = elem.getBoundingClientRect().top;
            const revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
                elem.classList.add('visible');
            }
        }
    }
    window.addEventListener('scroll', reveal);
    reveal();
});
