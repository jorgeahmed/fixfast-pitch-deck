document.addEventListener('DOMContentLoaded', function() {
    const tabsContainer = document.getElementById('tabs-container');
    const contentTarget = document.getElementById('phone-screen-content');
    const demoContainer = document.getElementById('demo-container');

    const loadContent = (url) => {
        contentTarget.innerHTML = '<div style="font-family: Noto Sans, sans-serif;" class="flex items-center justify-center p-8 text-gray-400">Cargando...</div>';
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`Archivo no encontrado: ${url}`);
                return response.text();
            })
            .then(html => {
                contentTarget.innerHTML = html;
            })
            .catch(error => {
                console.error('Error al cargar la pantalla:', error);
                contentTarget.innerHTML = `<div class="p-4 text-center text-red-400"><b>Error:</b> No se pudo cargar el archivo.<br><span class="text-xs">${error.message}</span></div>`;
            });
    };

    const generateTabs = async () => {
        try {
            const response = await fetch('screens/manifest.json');
            if (!response.ok) throw new Error('No se encontró manifest.json en la carpeta /screens/');
            const screens = await response.json();

            if (!screens || screens.length === 0) return;

            screens.forEach((screen, index) => {
                const button = document.createElement('button');
                button.className = 'tab-button';
                button.dataset.src = `screens/${screen.file}`;
                button.textContent = screen.name;
                if (index === 0) button.classList.add('active');
                tabsContainer.appendChild(button);
            });

            loadContent(`screens/${screens[0].file}`);

            tabsContainer.addEventListener('click', (e) => {
                const button = e.target.closest('.tab-button');
                if (button && !button.classList.contains('active')) {
                    tabsContainer.querySelector('.tab-button.active').classList.remove('active');
                    button.classList.add('active');
                    loadContent(button.dataset.src);
                }
            });

        } catch (error) {
            console.error('No se pudo generar las pestañas:', error);
            demoContainer.innerHTML = `<p class="text-center text-red-500 p-4"><b>Error Crítico:</b> No se pudo cargar el archivo <b>manifest.json</b>.<br>Asegúrate de que el archivo exista en la carpeta <b>/screens/</b>.</p>`;
        }
    };

    generateTabs();
});