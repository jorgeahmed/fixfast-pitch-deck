export function initDemo() {
    const tabsContainer = document.getElementById('tabs-container-demo');
    const contentTarget = document.getElementById('phone-screen-content');
    const descriptionTarget = document.getElementById('screen-description');
    
    if (!tabsContainer || !contentTarget || !descriptionTarget) {
        return;
    }

    // Función para manejar la actualización de contenido y descripción
        const updateScreen = (button) => {
        if (!button) return;

        // Actualizar el estado visual de los botones
        tabsContainer.querySelector('.tab-button.active')?.classList.remove('active');
        button.classList.add('active');

        // Obtener datos del botón y cargar contenido
        const url = button.dataset.src;
        const description = button.dataset.description;
        
        if(descriptionTarget) descriptionTarget.textContent = description;
        if(contentTarget) contentTarget.innerHTML = `<div class="flex items-center justify-center h-full p-8 text-center text-gray-400">Cargando...</div>`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`El archivo ${url} no fue encontrado (Error 404).`);
                return response.text();
            })
            .then(htmlString => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, 'text/html');
                
                // Busca el contenedor principal de la pantalla o, en su defecto, usa el body del archivo.
                const newContentContainer = doc.querySelector('.group\\/design-root') || doc.body;
                
                if (contentTarget && newContentContainer) {
                    // Inyectamos solo el HTML del interior de nuestro contenedor.
                    contentTarget.innerHTML = newContentContainer.innerHTML;
                }
            })
            .catch(error => {
                console.error('Error al cargar la pantalla:', error);
                if (contentTarget) {
                    contentTarget.innerHTML = `<div class="p-4 text-center text-red-400"><b>Error:</b> No se pudo cargar la pantalla. <br><small>${error.message}</small></div>`;
                }
            });
    };

    const generateTabs = async () => {
        try {
            const response = await fetch('screens/manifest.json');
            if (!response.ok) throw new Error('No se encontró el archivo manifest.json.');
            
            const screens = await response.json();
            if (!screens || screens.length === 0) return;

            tabsContainer.innerHTML = ''; 

            screens.forEach((screen, index) => {
                const button = document.createElement('button');
                button.className = 'tab-button';
                button.dataset.src = `screens/${screen.file}`;
                button.dataset.description = screen.description || '';
                button.textContent = screen.name;
                
                if (index === 0) {
                    button.classList.add('active');
                }
                tabsContainer.appendChild(button);
            });
            
            // Cargar el contenido de la primera pestaña después de crear todas
            updateScreen(tabsContainer.querySelector('.tab-button'));

            // Añadir el listener para los clics
            tabsContainer.addEventListener('click', (e) => {
                const button = e.target.closest('.tab-button');
                if (button && !button.classList.contains('active')) {
                    updateScreen(button);
                }
            });

        } catch (error) {
            console.error('Error al generar las pestañas:', error);
            const demoContainer = document.getElementById('demo-container');
            if(demoContainer) {
                 demoContainer.innerHTML = `<p class="text-center text-red-500 p-4"><b>Error Crítico:</b> No se pudo cargar manifest.json.</p>`;
            }
        }
    };

    generateTabs();
}