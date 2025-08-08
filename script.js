document.addEventListener('DOMContentLoaded', () => {
    const projectLinks = document.querySelectorAll('#projects a');
    const projectView = document.getElementById('project-view');
    const projectContent = document.getElementById('project-content');
    const backBtn = document.getElementById('back-btn');
    const projectsSection = document.getElementById('projects');

    projectLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const mdFile = link.getAttribute('data-project');

            try {
                const response = await fetch(mdFile);
                if (!response.ok) throw new Error('Project not found');
                const markdown = await response.text();
                projectContent.innerHTML = marked.parse(markdown);

                projectsSection.classList.add('hidden');
                projectView.classList.remove('hidden');
            } catch (err) {
                projectContent.innerHTML = `<p>Error loading project.</p>`;
            }
        });
    });

    backBtn.addEventListener('click', () => {
        projectView.classList.add('hidden');
        projectsSection.classList.remove('hidden');
    });
});
