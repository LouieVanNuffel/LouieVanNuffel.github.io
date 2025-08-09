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

                // Animate modal sliding up
                modalBox.classList.remove('slide-up');
                void modalBox.offsetWidth; // trigger reflow
                modalBox.classList.add('slide-up');
            } catch (err) {
                modalContent.innerHTML = `<p>Error loading project.</p>`;
                modal.classList.remove('hidden');
            }
        });
    });

    // Close modal with slide down animation
    function closeProjectModal() {
        modalBox.classList.remove('slide-up');

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

    // Navigation buttons & sections
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = ['about', 'projects', 'contact'];

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Update nav buttons based on scroll position
    const sectionElems = sections.map(id => document.getElementById(id));

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight / 2;

        let currentSection = sections[0];

        for (let i = 0; i < sectionElems.length; i++) {
            if (sectionElems[i].offsetTop <= scrollPos) {
                currentSection = sections[i];
            }
        }

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === currentSection);
        });
    });

    // Reveal on scroll for fade in effect
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('visible');
            } else {
                reveal.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load
});
