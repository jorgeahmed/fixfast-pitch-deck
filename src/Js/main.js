import { initAccordion, initTabs, initMobileMenu, initDataCards } from './ui-interactions';
import { initAllCharts } from './charts';
import { initDemo } from './demo';

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordion();
    initTabs();
    initDataCards();
    initAllCharts();
    initDemo();
});