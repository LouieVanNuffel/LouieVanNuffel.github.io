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

                modalBox.classList.remove('fade-zoom');
                void modalBox.offsetWidth;
                modalBox.classList.add('fade-zoom');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

    // Navigation buttons
    const navButtons = document.querySelectorAll('#top-nav .nav-btn');
    const sections = ['about', 'projects', 'contact'].map(id => document.getElementById(id));

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active nav highlight on scroll
    window.addEventListener('scroll', () => {
        let currentSectionId = sections[0].id;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                currentSectionId = section.id;
            }
        });

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === currentSectionId);
        });
    });

    // Reveal sections on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
