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
                void modalBox.offsetWidth;
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

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });

    const navLinks = document.querySelectorAll('#top-nav a');
const sections = [...navLinks].map(link => {
    const targetId = link.getAttribute('href').substring(1);
    return document.getElementById(targetId);
});

function onScroll() {
    const scrollPos = window.scrollY + 90; // 90 = nav height + offset
    let currentSectionId = sections[0].id;

    for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
            currentSectionId = section.id;
        }
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSectionId);
    });
}

window.addEventListener('scroll', onScroll);
onScroll(); // initialize on load

});
