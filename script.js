document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('#mobile-menu a').forEach(anchor => {
        anchor.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // Tabs functionality
    const tabsContainer = document.getElementById('tabs-container');
    if(tabsContainer) {
        const tabContentContainer = document.getElementById('tab-content-container');
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        const tabContents = tabContentContainer.querySelectorAll('.tab-content');

        tabsContainer.addEventListener('click', (e) => {
            if (e.target.matches('.tab-button')) {
                const tabId = e.target.dataset.tab;
                tabButtons.forEach(button => button.classList.remove('active'));
                e.target.classList.add('active');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Data Cards toggle
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach(card => {
        card.addEventListener('click', () => {
            const payload = card.querySelector('.data-payload');
            if (payload) {
                payload.classList.toggle('hidden');
            }
        });
    });

    // Chart.js doughnut chart
    const functionsChartCtx = document.getElementById('functionsChart')?.getContext('2d');
    if (functionsChartCtx) {
        new Chart(functionsChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Disparadores de Firestore', 'Funciones HTTP', 'Notificaciones'],
                datasets: [{
                    label: 'Tipos de Cloud Functions',
                    data: [65, 15, 20],
                    backgroundColor: ['rgba(30, 64, 175, 0.8)','rgba(219, 39, 119, 0.8)','rgba(234, 179, 8, 0.8)'],
                    borderColor: ['rgba(30, 64, 175, 1)','rgba(219, 39, 119, 1)','rgba(234, 179, 8, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 12 } } },
                    title: { display: true, text: 'Composición de la Lógica de Backend', font: { size: 14, weight: 'bold' } }
                }
            }
        });
    }

    // Checklist Accordion & Progress Bar
    const accordionContainer = document.getElementById('accordion-container');
    if (accordionContainer) {
        const accordionHeaders = accordionContainer.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const icon = header.querySelector('span:last-child');
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.textContent = '+';
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.textContent = '-';
                }
            });
        });

        const checklistItems = accordionContainer.querySelectorAll('.checklist-item');
        const progressBar = document.getElementById('progress-bar');
        const progressPercentage = document.getElementById('progress-percentage');
        const totalScore = 100;

        const updateProgress = () => {
            let currentScore = 0;
            checklistItems.forEach(item => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox.checked) {
                    currentScore += parseInt(item.dataset.points, 10);
                    item.classList.add('checklist-item-done');
                } else {
                    item.classList.remove('checklist-item-done');
                }
            });
            const percentage = totalScore > 0 ? (currentScore / totalScore) * 100 : 0;
            progressBar.style.width = percentage + '%';
            progressPercentage.textContent = Math.round(percentage) + '%';
        };

        checklistItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', updateProgress);
        });
        
        updateProgress(); // Initial calculation on page load
    }
});
