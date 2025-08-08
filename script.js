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

                // Reset animation
                modalBox.classList.remove('fade-zoom');
                void modalBox.offsetWidth; // reflow trick
                modalBox.classList.add('fade-zoom');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal with ✕
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal by clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Navigation buttons and active highlight logic
    const navButtons = document.querySelectorAll('#top-nav .nav-btn');
    const sections = ['about', 'projects', 'contact'].map(id => document.getElementById(id));

    // Scroll to section on nav button click
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', target: targetSection.top });
            }
        });
    });

    // Highlight nav button based on scroll position
    window.addEventListener('scroll', () => {
        let currentSectionId = sections[0].id;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                currentSectionId = section.id;
            }
        });

        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === currentSectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    });
});
