document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('project-content');
    const closeModal = document.getElementById('close-modal');
    const modalBox = document.querySelector('.modal-content');
    const navButtons = document.querySelectorAll('#top-nav .nav-btn');
    const sections = ['about', 'projects', 'contact'];
    const sectionElems = sections.map(id => document.getElementById(id));

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
                modal.setAttribute('aria-hidden', 'false');

                // Disable background scroll
                document.body.style.overflow = 'hidden';

                // Animate slide up
                modalBox.classList.remove('slide-up');
                void modalBox.offsetWidth; // trigger reflow
                modalBox.classList.add('slide-up');

                modalBox.focus();
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // Close modal
    function closeProjectModal() {
        // Animate slide down first
        modalBox.classList.remove('slide-up');
        modalBox.addEventListener('transitionend', () => {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Re-enable scroll
            modalContent.innerHTML = '';
        }, { once: true });
    }
    closeModal.addEventListener('click', closeProjectModal);

    // Close modal on outside click
    modal.addEventListener('click', e => {
        if (e.target === modal) closeProjectModal();
    });

    // Close modal on ESC key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });

    // Nav button click scroll to section
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update active nav button on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        let currentSection = sections[0];
        for (let id of sections) {
            const elem = document.getElementById(id);
            if (elem.offsetTop <= scrollPos) {
                currentSection = id;
            }
        }

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === currentSection);
        });
    });

    // Reveal animation on scroll
    const revealElems = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElems.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
