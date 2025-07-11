const fs = require('fs/promises');
const path = require('path');
const { glob } = require('glob');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

async function buildHtml() {
    try {
        console.log('Iniciando la construcción de HTML...');
        await fs.mkdir(DIST_DIR, { recursive: true });

        const headerMain = await fs.readFile(path.join(COMPONENTS_DIR, 'header-main.html'), 'utf-8');
        const headerSub = await fs.readFile(path.join(COMPONENTS_DIR, 'header-sub.html'), 'utf-8');
        const footer = await fs.readFile(path.join(COMPONENTS_DIR, 'footer.html'), 'utf-8');
        console.log('✓ Componentes cargados.');

        const htmlFiles = await glob(`${SRC_DIR}/*.html`);

        for (const filePath of htmlFiles) {
            let content = await fs.readFile(filePath, 'utf-8');
            const fileName = path.basename(filePath);
            const headerContent = (fileName === 'index.html') ? headerMain : headerSub;

            content = content.replace('', headerContent);
            content = content.replace('', footer);

            await fs.writeFile(path.join(DIST_DIR, fileName), content);
            console.log(`✓ Procesado: ${fileName}`);
        }

        const screensSrc = path.join(SRC_DIR, 'screens');
        const screensDest = path.join(DIST_DIR, 'screens');
        
        try {
            await fs.access(screensSrc);
            await fs.cp(screensSrc, screensDest, { recursive: true });
            console.log('✓ Copiada la carpeta de screens.');
        } catch (error) {
            console.log("i No se encontró la carpeta 'src/screens', se omitió la copia.");
        }

        console.log('Build de HTML completado exitosamente.');

    } catch (error) {
        console.error('Error durante el proceso de build de HTML:', error);
    }
}

buildHtml();