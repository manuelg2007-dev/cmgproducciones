# C.M.G. Producciones — Sitio Web

Portfolio profesional de fotografía y video. Publicado en GitHub Pages.

## 🌐 URL del sitio
`https://TUUSUARIO.github.io/cmg-web/`

## 📁 Estructura
```
cmg-web/
├── index.html          ← Inicio
├── portfolio.html      ← Galería por evento
├── servicios.html      ← Servicios detallados
├── nosotros.html       ← Historia y equipo
├── testimonios.html    ← Reseñas de clientes
├── contacto.html       ← Formulario + FAQ
├── style.css           ← Estilos compartidos
├── components.js       ← Nav, footer, WhatsApp
├── .nojekyll           ← Requerido por GitHub Pages
└── img/
    ├── quince/
    │   └── julieta/    ← ✅ 10 fotos cargadas
    ├── bodas/          ← Subir fotos de bodas acá
    ├── empresas/
    │   └── a3vte/      ← Subir fotos de A3VTE acá
    └── videos/
        └── yolo/       ← Subir thumbnails de Yolo acá
```

## ➕ Cómo agregar un nuevo evento al portfolio

### 1. Subir las fotos
- Crear carpeta: `img/quince/nombre/` o `img/bodas/nombre-pareja/`
- Subir las fotos JPG a esa carpeta en GitHub

### 2. Agregar la pestaña en portfolio.html
En la sección correspondiente, agregar:
```html
<button class="etab" onclick="switchEvent('quince','nombre',this)">XV de Nombre</button>
```

### 3. Agregar el panel de galería
Copiar el bloque `ev-quince-julieta` y reemplazar rutas y textos.

### 4. Agregar al array de lightbox
```js
'quince-nombre': [
  'img/quince/nombre/foto1.jpg',
  'img/quince/nombre/foto2.jpg',
],
```

## 🚀 Publicar en GitHub Pages
1. Subir todos los archivos a un repo público
2. Settings → Pages → Branch: main → /root → Save
3. Listo en 2-3 minutos
