# 📖 Guía Completa para Principiantes: DOM Anatomy

> **¿Qué es esto?** Esta guía te enseña, paso a paso y sin dar nada por sentado, a usar **DOM Anatomy** y a publicarlo en internet para que otros lo usen.

---

## 📋 Índice

1. [¿Qué es DOM Anatomy?](#1-qué-es-dom-anatomy)
2. [¿Qué necesito antes de empezar?](#2-qué-necesito-antes-de-empezar)
3. [Cómo usar la herramienta](#3-cómo-usar-la-herramienta)
   - 3.1 [Modo CLI (desde la terminal)](#31-modo-cli-desde-la-terminal)
   - 3.2 [Modo Bookmarklet (arrastrar a favoritos)](#32-modo-bookmarklet-arrastrar-a-favoritos)
   - 3.3 [Modo X-Ray (interpretar los colores)](#33-modo-x-ray-interpretar-los-colores)
4. [Cómo publicar tu proyecto en GitHub](#4-cómo-publicar-tu-proyecto-en-github)
5. [Cómo publicar tu proyecto en NPM](#5-cómo-publicar-tu-proyecto-en-npm)
6. [Solución de problemas comunes](#6-solución-de-problemas-comunes)
7. [Glosario para principiantes](#7-glosario-para-principiantes)

---

## 1. ¿Qué es DOM Anatomy?

**DOM Anatomy** es una herramienta que convierte cualquier página web en un **laboratorio de aprendizaje interactivo**.

Imagina que tienes una página HTML y quieres entender qué hace cada elemento: ¿qué es ese `<div>`, para qué sirve esa clase `.container`, por qué hay un `<section>` ahí? DOM Anatomy te lo muestra todo con colores, tooltips y un panel explicativo.

### Funciones disponibles:

| Función | ¿Qué hace? | ¿Para quién? |
|---------|-----------|--------------|
| **Analizar un archivo** | Genera una copia X-Ray de un `.html` | Estudiantes |
| **Analizar una carpeta** | Procesa todos los HTML de un proyecto | Devs |
| **Bookmarklet** | Activa X-Ray en cualquier página web | Curiosos |
| **Manual automático** | Crea documentación Markdown | Equipos |
| **Reporte Bulk** | Analiza todo un proyecto y resume hallazgos | Arquitectos |

---

## 2. ¿Qué necesito antes de empezar?

Dependiendo de cómo quieras usarlo, necesitas diferentes cosas:

### Para usar el Bookmarklet (modo fácil):
- Un navegador web (Chrome, Firefox, Edge, Safari)
- Nada más. Literalmente.

### Para usar el CLI (modo pro):
- **Node.js** instalado en tu computadora (es un programa que permite ejecutar JavaScript fuera del navegador)
- **Una terminal** (Command Prompt en Windows, Terminal en Mac/Linux)

### Para publicar en GitHub:
- Una cuenta gratuita en [github.com](https://github.com)
- **Git** instalado (es un sistema de control de versiones, como un "historial de cambios" para tu código)

### Para publicar en NPM:
- Una cuenta gratuita en [npmjs.com](https://npmjs.com)
- Node.js instalado

---

## 3. Cómo usar la herramienta

### 3.1 Modo CLI (desde la terminal)

El **CLI** significa "Command Line Interface" (Interfaz de Línea de Comandos). Es decir: escribes comandos de texto en una venta negra y la computadora los ejecuta.

#### Paso 1: Abrir la terminal

**Windows:**
- Presiona la tecla `Windows`
- Escribe `cmd` y presiona Enter
- Se abre una ventana negra con texto blanco

**Mac:**
- Presiona `Cmd + Espacio`
- Escribe `Terminal` y presiona Enter

**Linux:**
- Presiona `Ctrl + Alt + T`

#### Paso 2: Verificar que tienes Node.js

Escribe esto en la terminal y presiona Enter:

```bash
node --version
```

Si ves algo como `v18.17.0` o superior, ¡perfecto! Si dice "comando no encontrado", descarga Node.js desde [nodejs.org](https://nodejs.org) e instálalo.

#### Paso 3: Instalar DOM Anatomy

Escribe esto en la terminal:

```bash
npm install -g dom-anatomy
```

**¿Qué significa esto?**
- `npm` = Node Package Manager (el "app store" de Node.js)
- `install` = instalar
- `-g` = global (instala para todo el sistema, no solo una carpeta)
- `dom-anatomy` = el nombre de nuestro paquete

Presiona Enter y espera. Verás mucho texto moviéndose. Cuando termine y vuelva a aparecer el cursor, listo.

#### Paso 4: Usar el comando básico

Supón que tienes un archivo llamado `mi-pagina.html` en tu escritorio.

**Windows:**
```bash
dom-anatomy C:\Users\TuNombre\Desktop\mi-pagina.html
```

**Mac/Linux:**
```bash
dom-anatomy ~/Desktop/mi-pagina.html
```

Presiona Enter.

**¿Qué pasó?**
- Se creó una carpeta llamada `dom-anatomy-output` en la misma ubicación
- Dentro hay un archivo `mi-pagina_xray.html`
- Ábrelo con doble click y verás tu página con colores y el panel inspector

#### Paso 5: Opciones avanzadas del CLI

Aquí están todos los comandos que puedes usar. Después de `dom-anatomy`, puedes añadir opciones:

```bash
# Analizar un solo archivo
dom-anatomy mi-pagina.html

# Analizar y generar manual
dom-anatomy mi-pagina.html --manual

# Analizar toda una carpeta (incluyendo subcarpetas)
dom-anatomy ./mi-proyecto --recursive

# Analizar carpeta + manuales + reporte bulk
dom-anatomy ./mi-proyecto -r -m -b

# Cambiar idioma a inglés
dom-anatomy mi-pagina.html -l en

# Especificar carpeta de salida
dom-anatomy mi-pagina.html --output ./mis-docs

# Ver todos los comandos disponibles
dom-anatomy --help
```

**Tabla de opciones:**

| Opción | Corta | Descripción | Ejemplo |
|--------|-------|-------------|---------|
| `--output` | `-o` | Carpeta donde guardar resultados | `-o ./docs` |
| `--language` | `-l` | Idioma: `es` o `en` | `-l en` |
| `--recursive` | `-r` | Buscar en subcarpetas | `-r` |
| `--manual` | `-m` | Generar archivos MANUAL.md | `-m` |
| `--bulk` | `-b` | Generar reporte bulk | `-b` |
| `--watch` | `-w` | Re-generar al detectar cambios | `-w` |
| `--help` | `-h` | Mostrar ayuda | `--help` |

#### Paso 6: Entender los archivos generados

Después de ejecutar el comando, encontrarás:

```
dom-anatomy-output/
├── mi-pagina_xray.html      ← Tu página con modo X-Ray activado
├── mi-pagina_MANUAL.md      ← Documentación educativa (si usaste -m)
└── BULK_ANALYSIS_REPORT.md  ← Resumen del proyecto (si usaste -b)
```

**`mi-pagina_xray.html`**:
- Es una copia de tu HTML original
- Pero con bordes de colores, tooltips y un panel flotante
- Ábrelo en el navegador y pasa el mouse por los elementos
- El panel de la derecha explica qué es cada cosa

**`mi-pagina_MANUAL.md`**:
- Es un archivo de texto con documentación
- Lista todos los tags que usaste
- Explica qué hace cada uno
- Muestra el árbol de estructura
- Abrelo con cualquier editor de texto

**`BULK_ANALYSIS_REPORT.md`**:
- Solo aparece si analizaste varios archivos
- Resume: cuántos archivos, qué tags únicos, qué clases CSS
- Útil para entender proyectos grandes

---

### 3.2 Modo Bookmarklet (arrastrar a favoritos)

Un **bookmarklet** es un "favorito mágico": es un link en tu barra de favoritos que, al hacer click, ejecuta código JavaScript en la página que estás viendo.

#### Paso 1: Abrir el archivo demo

Ve a la carpeta `dom-anatomy/bookmarklet/` y abre `demo.html` con tu navegador.

#### Paso 2: Arrastrar el botón a favoritos

En la página demo verás un botón morado que dice **"🔍 DOM Anatomy"**.

- **Haz click y arrástralo** a tu barra de favoritos/bookmarks
- En Chrome: arrástralo justo debajo de la barra de direcciones
- En Firefox: arrástralo a la barra de favoritos

#### Paso 3: Probar en cualquier página

1. Ve a cualquier página web (ejemplo: Wikipedia)
2. Haz click en el favorito "🔍 DOM Anatomy"
3. Espera 1-2 segundos
4. ¡La página se ilumina con colores!

#### Paso 4: Desactivar

Para quitar el modo X-Ray:
- Refresca la página (F5)
- O haz click en el favorito otra vez (si implementamos toggle)

#### ⚠️ Limitaciones del Bookmarklet

Algunas páginas **no permiten** que scripts externos se inyecten. Esto se llama **CSP** (Content Security Policy). Si haces click y no pasa nada, es porque esa página tiene CSP estricto.

**Sitios donde funciona:** Blogs, páginas personales, documentación, tu localhost
**Sitios donde NO funciona:** GitHub, Twitter, Facebook, bancos

**Solución:** Para esos sitios, usa el **CLI** o espera a la extensión de navegador.

---

### 3.3 Modo X-Ray (interpretar los colores)

Cuando activas el modo X-Ray, la página cambia visualmente. Aquí te explicamos qué significa cada cosa.

#### Los colores de los bordes

Cada elemento HTML recibe un borde de color según su tipo:

| Color | Significado | Tags |
|-------|-------------|------|
| 🔵 **Azul** | Estructura principal | `<main>` |
| 🟣 **Violeta** | Secciones | `<header>`, `<section>`, `<nav>`, `<article>` |
| 🔵 **Cyan** | Laterales y pie | `<aside>`, `<footer>`, `<form>` |
| ⚪ **Gris** | Contenedores genéricos | `<div>` |
| 🟢 **Verde** | Texto | `<h1>`, `<h2>`, `<h3>`, `<p>`, `<span>`, `<input>` |
| 🟣 **Violeta claro** | Listas | `<ul>`, `<li>` |
| 🟡 **Ámbar** | Scripts y metadatos | `<script>`, `<link>`, `<meta>`, `<title>`, `<button>` |
| 🩷 **Rosa** | Iconos | `<i>` |
| 🟠 **Naranja** | Enlaces | `<a>` |
| 🟡 **Amarillo** | Imágenes | `<img>` |

#### Las etiquetas flotantes

Sobre cada elemento verás una pequeña etiqueta con el nombre del tag:

```
┌─ <div> ─┐
│         │
└─────────┘
```

Esto te dice inmediatamente qué tipo de elemento es.

#### El tooltip gemelo (sobre el elemento)

Cuando pasas el mouse sobre un elemento, aparece un **recuadro flotante justo encima**:

```
┌─ <div> ─────┐
│ #mi-id       │
│ .clase1      │
│ .clase2      │
└──────────────┘
```

Este tooltip muestra:
1. El tag con su color (ej: `<div>` en gris)
2. El ID si tiene (ej: `#mi-id`)
3. Las clases CSS como pastillas (ej: `.container`, `.active`)

**Para qué sirve:** Para saber **sobre qué elemento específico** estás parado sin tener que mirar al panel de la derecha.

#### El panel inspector (arriba a la derecha)

Es una caja fija en la esquina superior derecha que muestra:

**Recuadro Visual Identificador:**
```
┌─ <div> ──────────────┐
│ id: #mi-id           │
│ [ .container ]       │
│ [ .active ]          │
│ data-target="12"     │
└──────────────────────┘
```

**Nombre técnico:**
```
<div> #mi-id .container .active
```

**Breadcrumb (jerarquía):**
```
body > main > div.container > section > div#mi-id
```

Esto te muestra "dónde estás" en el árbol del documento.

**Descripción:**
```
División Genérica / Contenedor de Bloque. La caja básica sin
significado semántico. Se usa para agrupar elementos y aplicarles
estilos o layout (Flexbox/Grid).
```

**CSS de ejemplo:**
```css
div {
  display: block;
}

.container {
  ...
}

.active {
  ...
}
```

#### La leyenda (abajo a la izquierda)

Es una pequeña caja que siempre está visible y recuerda qué significa cada color.

---

## 4. Cómo publicar tu proyecto en GitHub

GitHub es como un "Google Drive para código". Te permite guardar tu proyecto en la nube, compartirlo con otros, y colaborar.

### Paso 1: Crear una cuenta en GitHub

1. Ve a [github.com](https://github.com)
2. Haz click en "Sign up" (Registrarse)
3. Sigue los pasos (email, contraseña, nombre de usuario)
4. Verifica tu email

### Paso 2: Instalar Git

**Windows:**
1. Ve a [git-scm.com](https://git-scm.com)
2. Descarga el instalador
3. Ejecutalo y sigue los pasos (deja las opciones por defecto)
4. Para verificar, abre la terminal y escribe: `git --version`

**Mac:**
```bash
xcode-select --install
```

**Linux:**
```bash
sudo apt-get install git
```

### Paso 3: Configurar Git

En la terminal, escribe (reemplaza con tu nombre y email):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 4: Crear un repositorio nuevo en GitHub

1. Ve a github.com y haz login
2. Haz click en el botón verde "New" (o el + arriba a la derecha)
3. En "Repository name" escribe: `dom-anatomy`
4. En "Description" escribe: "Transform any HTML into an interactive learning laboratory"
5. Deja "Public" seleccionado (así cualquiera puede verlo)
6. **NO** marques "Add a README" (ya tenemos uno)
7. Haz click en "Create repository"

### Paso 5: Subir tu código

En la terminal, navega a tu carpeta del proyecto:

**Windows:**
```bash
cd C:\Users\TuNombre\Desktop\dom-anatomy
```

**Mac/Linux:**
```bash
cd ~/Desktop/dom-anatomy
```

Ahora ejecuta estos comandos uno por uno:

```bash
# Inicializar git en esta carpeta
git init

# Agregar todos los archivos
git add .

# Crear el primer commit (fotografía del proyecto)
git commit -m "Initial commit: DOM Anatomy v1.0"

# Conectar con GitHub (reemplaza 'tu-usuario' con tu nombre de usuario)
git remote add origin https://github.com/tu-usuario/dom-anatomy.git

# Subir todo a GitHub
git push -u origin main
```

Te pedirá tu nombre de usuario y contraseña de GitHub.

### Paso 6: Verificar

1. Refresca la página de tu repo en GitHub
2. Deberías ver todos los archivos ahí
3. ¡Tu proyecto ya está en internet!

---

## 5. Cómo publicar tu proyecto en NPM

**NPM** es el "App Store" de Node.js. Publicar aquí permite que cualquiera instale tu herramienta con un simple comando.

### Paso 1: Crear cuenta en NPM

1. Ve a [npmjs.com](https://npmjs.com)
2. Haz click en "Sign Up"
3. Completa el formulario
4. Verifica tu email

### Paso 2: Verificar que el package.json está correcto

Abre el archivo `dom-anatomy/package.json` y verifica:

```json
{
  "name": "dom-anatomy",
  "version": "1.0.0",
  "description": "Transform any HTML into an interactive learning laboratory",
  "main": "cli/src/index.js",
  "bin": {
    "dom-anatomy": "./cli/bin/dom-anatomy"
  }
}
```

**Importante:** Si alguien ya tomó el nombre `dom-anatomy`, tendrás que cambiarlo por algo como `@tu-usuario/dom-anatomy`.

### Paso 3: Login desde la terminal

```bash
npm login
```

Te pedirá:
- Username: (tu usuario de npm)
- Password: (tu contraseña)
- Email: (tu email)

### Paso 4: Publicar

Asegúrate de estar en la carpeta del proyecto:

```bash
cd ~/dom-anatomy
```

Luego publica:

```bash
npm publish
```

**¿Qué pasó?**
- NPM empaquetó tu proyecto
- Lo subió a sus servidores
- Ahora cualquiera en el mundo puede instalarlo con `npm install -g dom-anatomy`

### Paso 5: Verificar

1. Ve a npmjs.com y busca `dom-anatomy`
2. Debería aparecer tu paquete
3. ¡Listo!

### Paso 6: Actualizar versiones (cuando hagas cambios)

Cada vez que mejores la herramienta:

```bash
# Cambiar la versión (ej: de 1.0.0 a 1.0.1)
npm version patch

# Publicar la nueva versión
npm publish
```

---

## 6. Solución de problemas comunes

### "No se reconoce el comando 'dom-anatomy'"

**Causa:** No está instalado globalmente o la terminal no lo encuentra.

**Solución:**
```bash
# Reinstalar globalmente
npm install -g dom-anatomy

# O usar npx (no requiere instalación)
npx dom-anatomy mi-pagina.html
```

### "No se reconoce el comando 'npm'"

**Causa:** Node.js no está instalado.

**Solución:** Descarga e instala desde [nodejs.org](https://nodejs.org)

### "Error: No HTML files found"

**Causa:** La ruta que proporcionaste no tiene archivos `.html`

**Solución:** Verifica la ruta. En Windows usa barras invertidas `\` o barras normales `/`. En Mac/Linux usa `~/`.

### "El bookmarklet no hace nada"

**Causa:** La página tiene Content Security Policy (CSP) estricto.

**Solución:** Prueba en otra página. Usa el CLI para archivos locales. O espera la extensión de navegador.

### "git push me pide contraseña todo el tiempo"

**Causa:** Git no tiene guardadas tus credenciales.

**Solución:**
```bash
# Guardar credenciales
git config --global credential.helper store
```

### "npm publish dice que el nombre ya existe"

**Causa:** Alguien más ya publicó un paquete con ese nombre.

**Solución:** Cambia el nombre en `package.json`:
```json
{
  "name": "@tu-usuario/dom-anatomy"
}
```

---

## 7. Glosario para principiantes

| Término | Explicación simple |
|---------|-------------------|
| **HTML** | Lenguaje para crear páginas web. Usa "etiquetas" como `<div>`, `<p>`, etc. |
| **CSS** | Lenguaje para dar estilo (colores, tamaños, posiciones) al HTML. |
| **JavaScript (JS)** | Lenguaje de programación que hace que las páginas sean interactivas. |
| **DOM** | "Document Object Model". Es la representación en memoria de tu página HTML. |
| **Tag / Etiqueta** | Palabra entre `<` y `>` en HTML. Ejemplo: `<div>`, `<h1>`. |
| **Clase CSS** | Nombre que agrupa estilos. Se escribe con punto: `.container`. |
| **ID** | Identificador único de un elemento. Se escribe con `#`: `#header`. |
| **Terminal / Consola** | Ventana negra donde escribes comandos de texto. |
| **CLI** | "Command Line Interface". Programa que se controla escribiendo comandos. |
| **NPM** | "Node Package Manager". Es como una tienda de apps para programadores. |
| **Git** | Sistema que guarda el historial de cambios de tu código. |
| **GitHub** | Página web donde subes tu código (usando Git) para compartirlo. |
| **Repositorio / Repo** | Carpeta de tu proyecto que está versionada con Git. |
| **Commit** | "Fotografía" de tu código en un momento específico. |
| **Push** | Subir tus commits a GitHub. |
| **Bookmarklet** | Favorito del navegador que ejecuta código JavaScript. |
| **CSP** | Política de seguridad que bloquea scripts en algunas páginas. |
| **README** | Archivo de texto que explica qué hace tu proyecto. |
| **Markdown (.md)** | Formato de texto simple que permite títulos, listas, negritas, etc. |

---

## 🎓 Consejos Finales

1. **Empieza con el bookmarklet**: Es la forma más fácil de ver la herramienta en acción.
2. **Prueba con tu propio HTML**: Crea un archivo `.html` simple y analízalo.
3. **Lee los manuales generados**: Son documentación educativa automática.
4. **No tengas miedo de la terminal**: Los comandos son como recetas de cocina, solo hay que seguir los pasos.
5. **Comparte**: Si te sirvió, comparte el repo. La comunidad frontend necesita herramientas educativas.

---

**¿Preguntas?** Abre un issue en GitHub o revisa la sección de solución de problemas arriba.

**¡Feliz aprendizaje!** 🚀
