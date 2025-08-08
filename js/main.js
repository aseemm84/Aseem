/**
 * Main JavaScript file for the Resume Web App.
 *
 * This file contains the main script to dynamically populate the resume content.
 * It calls functions to create different sections of the resume like personal info,
 * professional journey, technical expertise, projects, and certifications.
 */

// A check to ensure the resumeData object is available before running any functions.
if (typeof resumeData === 'undefined') {
    console.error('Error: resumeData object not found. Make sure data.js is loaded before main.js');
}

/**
 * Populates the personal information section in the header.
 */
function populatePersonalInfo() {
    // Correctly access the personalInfo object from the main resumeData object.
    const info = resumeData.personalInfo;
    if (!info) return; // Exit if data is not found

    document.getElementById('name').textContent = info.name;
    document.getElementById('title').textContent = info.title;
    document.getElementById('location').textContent = info.location;
    document.getElementById('email').textContent = info.email;
    document.getElementById('email').href = `mailto:${info.email}`;
    document.getElementById('linkedin').href = info.linkedin;
    document.getElementById('github').href = info.github;
    document.getElementById('summary-text').textContent = info.summary;
}

/**
 * Creates and populates the statistics cards section.
 */
function populateStats() {
    const statsContainer = document.getElementById('stats-cards');
    // Correctly access the stats object from the main resumeData object.
    const statsData = resumeData.stats;

    if (statsData && statsContainer) {
        statsContainer.innerHTML = ''; // Clear any placeholder content

        // The data is an object, so we create an array of stats to iterate over.
        const stats = [
            { value: statsData.yearsOfExperience, label: 'Years of Experience' },
            { value: statsData.liveApplications, label: 'Live Applications' },
            { value: statsData.budgetManaged, label: 'Budget Managed ($K)' },
            { value: statsData.efficiencyImprovement, label: 'Efficiency Improvement (%)' }
        ];

        stats.forEach(stat => {
            // createStatsCard is expected to be in components.js
            const card = createStatsCard(stat.value, stat.label);
            statsContainer.appendChild(card);
        });

        // Animate the numbers after they are added to the DOM.
        const counters = document.querySelectorAll('.stat-value');
        counters.forEach(counter => {
            // animateValue is expected to be in animations.js
            if (typeof animateValue === 'function') {
                animateValue(counter, 0, counter.dataset.value, 2000);
            }
        });
    }
}

/**
 * Populates the professional journey timeline.
 */
function populateJourney() {
    const journeyContainer = document.querySelector('#professional-journey .timeline-container');
    // Correctly access the professionalJourney array from the main resumeData object.
    const journeyData = resumeData.professionalJourney;

    if (journeyData && journeyContainer) {
        journeyContainer.innerHTML = ''; // Clear any placeholder content
        journeyData.forEach((item, index) => {
            const side = index % 2 === 0 ? 'left' : 'right';
            // createTimelineItem is expected to be in components.js
            const journeyItem = createTimelineItem(item, side);
            journeyContainer.appendChild(journeyItem);
        });
    }
}

/**
 * Populates the technical expertise section.
 */
function populateExpertise() {
    const expertiseContainer = document.querySelector('#technical-expertise .expertise-container');
    // Correctly access the technicalExpertise array from the main resumeData object.
    const expertiseData = resumeData.technicalExpertise;

    if (expertiseData && expertiseContainer) {
        expertiseContainer.innerHTML = ''; // Clear any placeholder content
        expertiseData.forEach(item => {
            // createExpertiseItem is expected to be in components.js
            const expertiseItem = createExpertiseItem(item.category, item.skills);
            expertiseContainer.appendChild(expertiseItem);
        });
    }
}

/**
 * Populates the featured projects section.
 */
function populateProjects() {
    const projectsContainer = document.querySelector('#featured-projects .projects-container');
    // Correctly access the featuredProjects array from the main resumeData object.
    const projectsData = resumeData.featuredProjects;

    if (projectsData && projectsContainer) {
        projectsContainer.innerHTML = ''; // Clear any placeholder content
        projectsData.forEach(item => {
            // createProjectCard is expected to be in components.js
            const projectCard = createProjectCard(item);
            projectsContainer.appendChild(projectCard);
        });
    }
}

/**
 * Populates the professional certifications section.
 */
function populateCertifications() {
    const certificationsContainer = document.querySelector('#professional-certifications .certifications-container');
    // Correctly access the professionalCertifications array from the main resumeData object.
    const certificationsData = resumeData.professionalCertifications;

    if (certificationsData && certificationsContainer) {
        certificationsContainer.innerHTML = ''; // Clear any placeholder content
        certificationsData.forEach(item => {
            // createCertificationItem is expected to be in components.js
            const certificationItem = createCertificationItem(item);
            certificationsContainer.appendChild(certificationItem);
        });
    }
}

/**
 * Event listener to call all population functions once the DOM is fully loaded.
 * This ensures that the script doesn't try to access elements that haven't been created yet.
 */
document.addEventListener('DOMContentLoaded', () => {
    // A final check inside the listener ensures data is available before populating.
    if (typeof resumeData !== 'undefined') {
        populatePersonalInfo();
        populateStats();
        populateJourney();
        populateExpertise();
        populateProjects();
        populateCertifications();
    }
});
