export function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

export function initTabs() {
    // MODIFICADO: El selector ahora es específico para las pestañas de la página de tecnología.
    const tabContainers = document.querySelectorAll('#tabs-container-tech');
    tabContainers.forEach(container => {
        const contentContainer = container.nextElementSibling;
        if (!contentContainer) return;

        container.addEventListener('click', (e) => {
            const button = e.target.closest('.tab-button');
            if (button && !button.classList.contains('active')) {
                container.querySelector('.tab-button.active')?.classList.remove('active');
                button.classList.add('active');
                contentContainer.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.toggle('active', content.id === button.dataset.tab);
                });
            }
        });
    });
}

export function initDataCards() {
    document.querySelectorAll('.data-card').forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.data-payload')?.classList.toggle('hidden');
        });
    });
}

export function initAccordion() {
    const accordionContainer = document.getElementById('accordion-container');
    if (!accordionContainer) return;

    // --- Lógica del Acordeón (para colapsar/expandir) ---
        accordionContainer.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('span:last-child');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

            header.classList.toggle('open', !isOpen);

            if (isOpen) {
                content.style.maxHeight = '0px';
                icon.textContent = '+';
            } else {
                // Se establece la altura máxima al tamaño real del contenido para la animación
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '-';
            }
        });
    });

    // --- Lógica de la Barra de Progreso ---
    const checklistItems = accordionContainer.querySelectorAll('.checklist-item');
    if (checklistItems.length === 0) {
        return; 
    }

    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const totalScore = 100;
    const CHECKLIST_STORAGE_KEY = 'fixfast-checklist-state';

    const updateProgress = () => {
        let currentScore = 0;
        checklistItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox?.checked) {
                currentScore += parseInt(item.dataset.points, 10) || 0;
                item.classList.add('checklist-item-done');
            } else {
                item.classList.remove('checklist-item-done');
            }
        });
        const percentage = totalScore > 0 ? (currentScore / totalScore) * 100 : 0;
        if (progressBar) progressBar.style.width = percentage + '%';
        if (progressPercentage) progressPercentage.textContent = Math.round(percentage) + '%';
    };

    const saveState = () => {
        const state = {};
        checklistItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox?.id) state[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state));
    };

    const loadState = () => {
        const savedState = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY));
        if (savedState) {
            checklistItems.forEach(item => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                if (checkbox?.id && savedState[checkbox.id] !== undefined) {
                    checkbox.checked = savedState[checkbox.id];
                }
            });
        }
    };

    checklistItems.forEach(item => {
        item.querySelector('input[type="checkbox"]')?.addEventListener('change', () => {
            updateProgress();
            saveState();
        });
    });

    loadState();
    updateProgress();
}