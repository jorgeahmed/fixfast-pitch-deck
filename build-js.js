const { build } = require('esbuild');
const path = require('path');

console.log('Iniciando empaquetado de JavaScript...');

build({
    entryPoints: [path.join(__dirname, 'src/js/main.js')],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: path.join(__dirname, 'dist/js/bundle.js'),
}).then(() => {
    console.log("✓ JavaScript empaquetado en dist/js/bundle.js.");
}).catch(() => process.exit(1));