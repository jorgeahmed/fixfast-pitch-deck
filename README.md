# FixFast - Pitch Deck Interactivo

¡Bienvenido al repositorio del Pitch Deck de FixFast! Este proyecto es una aplicación web moderna y una presentación interactiva diseñada para conectar de forma fluida a administradores de propiedades con especialistas de oficios cualificados.

[![Estado del Proyecto](https://img.shields.io/badge/estado-en%20desarrollo-yellow)](https://github.com/jorgeahmed/fixfast-pitch-deck)
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://github.com/jorgeahmed/fixfast-pitch-deck/blob/main/LICENSE)
[![Deploy](https://img.shields.io/github/deployments/jorgeahmed/fixfast-pitch-deck/github-pages?label=deploy)](https://jorgeahmed.github.io/fixfast-pitch-deck/)

### 🚀 **Demo en Vivo: [https://jorgeahmed.github.io/fixfast-pitch-deck/](https://jorgeahmed.github.io/fixfast-pitch-deck/)**

---

## ✨ Visión General

FixFast busca simplificar y agilizar la resolución de incidencias y el mantenimiento de propiedades. Creamos un ecosistema digital que ofrece:
-   **Para Clientes:** Una forma centralizada y confiable de solicitar servicios de mantenimiento.
-   **Para Profesionales:** Un flujo constante de trabajos verificados y un sistema de pagos seguro.
-   **Para Inversionistas:** Un modelo de negocio escalable en un mercado con alta demanda de digitalización.

---

## 🛠️ Pila Tecnológica

Este proyecto es una prueba de concepto construida con tecnologías web modernas, enfocada en la rapidez y la interactividad.

-   **Interfaz (Frontend):** HTML5, CSS3 con **Tailwind CSS**.
-   **Interactividad (JavaScript):** Vanilla JS (ES6+), **Chart.js** para gráficos.
-   **Entorno de Desarrollo:** **Node.js** y **npm** para la gestión de paquetes y scripts.
-   **Empaquetado y Build:** **esbuild** para empaquetar JavaScript, **live-server** para desarrollo local.
-   **Hosting:** **GitHub Pages**, con despliegue automatizado.

---

## 🚀 Desarrollo y Despliegue Local

Para explorar o modificar el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/jorgeahmed/fixfast-pitch-deck.git](https://github.com/jorgeahmed/fixfast-pitch-deck.git)
    cd fixfast-pitch-deck
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm start
    ```
    Esto abrirá automáticamente el proyecto en tu navegador y se actualizará con cada cambio que guardes.

---

## 📈 Progreso del Desarrollo (MVP)

El MVP se ha completado conceptualmente a través de las 7 fases planificadas, demostrando la viabilidad de la arquitectura y los flujos de trabajo clave.

| Fase                                    | Hitos Clave                       | Puntuación | Estado |
| :-------------------------------------- | :-------------------------------- | :--------: | :----: |
| **Fase 1: Configuración Inicial** | Setup de Firebase y React/Vite    |  15 / 15   |   ✅   |
| **Fase 2: Autenticación y Roles** | Login, Registro, Gestión de Roles |  20 / 20   |   ✅   |
| **Fase 3: Gestión de Datos** | Modelo y CRUD en Firestore        |  20 / 20   |   ✅   |
| **Fase 4: Almacenamiento de Archivos** | Subida de imágenes y videos       |  10 / 10   |   ✅   |
| **Fase 5: Lógica de Backend** | Cloud Functions y Notificaciones  |  15 / 15   |   ✅   |
| **Fase 6: Reglas de Seguridad** | Reglas para Firestore y Storage   |  15 / 15   |   ✅   |
| **Fase 7: Integración de IA** | Análisis conceptual de incidencias |   5 / 5    |   ✅   |

**Total: 100 / 100 Puntos**

---

## 📂 Estructura del Repositorio

-   `/src`: Contiene todo el código fuente (HTML, CSS, JS, imágenes y componentes).
-   `/dist`: Contiene los archivos finales, optimizados y listos para producción. **Esta es la carpeta que se publica en la web.**
-   `build-js.js`, `build-html.js`: Scripts personalizados para construir el proyecto.
-   `package.json`: Define los scripts y dependencias del proyecto.