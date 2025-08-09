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
                const res = await fetch(mdFile);
                if (!res.ok) throw new Error('Markdown file not found');
                const mdText = await res.text();
                modalContent.innerHTML = marked.parse(mdText);

                // Add target=_blank to itch.io links automatically
                modalContent.querySelectorAll('a[href*="itch.io"]').forEach(link => {
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                });

                // Add itch.io button style if itch links are images or buttons (optional)
                modalContent.querySelectorAll('a[href*="itch.io"]').forEach(link => {
                    link.classList.add('itch-button');
                });

                modal.classList.remove('hidden');
                // Trigger animation
                setTimeout(() => modalBox.classList.add('fade-slide'), 10);
                document.body.style.overflow = 'hidden'; // prevent background scroll
            } catch (error) {
                modalContent.innerHTML = `<p style="color: #f55;">Failed to load project details.</p>`;
            }
        });
    });

    // Close modal on clicking close button or outside modal content
    closeModal.addEventListener('click', closeModalFn);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModalFn();
    });

    function closeModalFn() {
        modalBox.classList.remove('fade-slide');
        setTimeout(() => {
            modal.classList.add('hidden');
            modalContent.innerHTML = '';
            document.body.style.overflow = ''; // re-enable scroll
        }, 350);
    }

    // Navbar buttons scroll to sections and update active state
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

    // Update nav active button on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        let current = 'about';
        for (const section of sections) {
            if (scrollPos >= section.offsetTop) current = section.id;
        }
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === current);
        });

        // Reveal elements on scroll
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    });

    // Trigger scroll event once on load to set active nav and reveal
    window.dispatchEvent(new Event('scroll'));
});
