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

                // Animate modal slide in
                modalBox.classList.remove('fade-slide-in');
                void modalBox.offsetWidth;  // trigger reflow
                modalBox.classList.add('fade-slide-in');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal function with slide out animation
    function closeProjectModal() {
        // Animate slide out
        modalBox.classList.remove('fade-slide-in');
        // Wait for animation to finish before hiding modal
        modalBox.addEventListener('transitionend', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scroll
            modalContent.innerHTML = ''; // clear content
        }, { once: true });
    }
    closeModal.addEventListener('click', closeProjectModal);

    // Close modal on clicking outside modal content
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Section buttons scroll & highlight
    const navButtons = document.querySelectorAll('#top-nav .nav-btn');
    const sections = [...navButtons].map(btn => document.getElementById(btn.dataset.target));

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
});
