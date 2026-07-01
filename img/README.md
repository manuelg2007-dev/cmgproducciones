# 📁 Estructura de carpetas para fotos

## Cómo agregar fotos a cada evento

### 15 Años
```
img/quince/julieta/    ← fotos del XV de Kevin Adorno ✅ (ya cargadas)
img/quince/NOMBRE/      ← crear carpeta con nombre de la quinceañera
```

### Bodas
```
img/bodas/boda-jimmy/   ← fotos de la boda de Jimmy Adorno ✅ (ya cargadas)
img/bodas/NOMBRE-PAREJA/  ← ej: img/bodas/maria-rodrigo/
```

### Corporativo
```
img/empresas/a3vte/    ← fotos del evento A3VTE ✅ (ya cargadas)
img/empresas/NOMBRE/   ← otros clientes corporativos
```

### Creación de Contenidos
```
img/contenido/yolo/    ← fotos y clips del proyecto Yolo ✅ (ya cargados)
img/contenido/PROYECTO/  ← otras marcas
```

## Formato recomendado

- JPG o WebP
- Máximo 2MB por foto para carga rápida
- Nombre sugerido: CMG_001.jpg, CMG_002.jpg...
- **Evitá espacios en los nombres de carpetas y archivos** (usá guiones).
  URLs con espacios sin codificar rompen los links — por eso se renombró
  la carpeta original `creacion de contenidos/` a `contenido/`.

## Si agregás una galería nueva a portfolio.html

Las galerías del portfolio están definidas como datos en
`assets/js/pages/portfolio.js` (objeto `galleries`), no hardcodeadas en
el HTML. Para agregar una galería nueva:

1. Subí las fotos a `img/CATEGORIA/NOMBRE/`.
2. Agregá una entrada a `galleries` en `portfolio.js` con las rutas.
3. Agregá los `data-gallery="NOMBRE" data-index="N"` correspondientes
   en el HTML de esa sección (mirá un bloque `.ev-thumb` existente como
   ejemplo).
