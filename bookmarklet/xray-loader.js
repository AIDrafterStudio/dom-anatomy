(function() {
  if (document.getElementById('dom-anatomy-xray-styles')) {
    console.log('DOM Anatomy is already active.');
    return;
  }

  console.log('Injecting DOM Anatomy X-Ray...');
  
  const style = document.createElement('style');
  style.id = 'dom-anatomy-xray-styles';
  style.textContent = `/* DOM Anatomy - X-Ray Layer Styles */

.xray-panel {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 340px;
    max-height: 90vh;
    overflow-y: auto;
    background: rgba(3, 7, 18, 0.97);
    border: 2px solid #f59e0b;
    border-radius: 14px;
    padding: 1.25rem;
    z-index: 99999;
    backdrop-filter: blur(12px);
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
    transition: border-color 0.3s, box-shadow 0.3s;
}
.xray-panel h3 {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #f59e0b;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
    padding-bottom: 0.5rem;
}
.xray-visual-id {
    margin: 0.75rem 0;
    background: rgba(0,0,0,0.6);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 0.75rem;
    font-family: 'JetBrains Mono', monospace;
}
.xray-visual-tag {
    display: inline-block;
    background: #64748b;
    color: #fff;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}
.xray-visual-idname {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-bottom: 0.4rem;
    word-break: break-all;
}
.xray-visual-idname .label {
    color: #64748b;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.xray-visual-idname .value {
    color: #f59e0b;
}
.xray-visual-classes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.4rem;
}
.xray-visual-class-pill {
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #a78bfa;
    font-size: 0.65rem;
    padding: 2px 8px;
    border-radius: 4px;
}
.xray-visual-attrs {
    font-size: 0.65rem;
    color: #475569;
    padding-top: 0.4rem;
    border-top: 1px solid rgba(255,255,255,0.06);
}
.xray-term {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #fff;
    line-height: 1.3;
}
.xray-breadcrumb {
    font-size: 0.65rem;
    color: #64748b;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    word-break: break-all;
}
.xray-desc {
    font-size: 0.8rem;
    color: #94a3b8;
    margin-bottom: 0.75rem;
    line-height: 1.5;
    font-family: system-ui, sans-serif;
}
.xray-css {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    background: rgba(0,0,0,0.4);
    padding: 0.6rem;
    border-radius: 6px;
    color: #a5f3fc;
    white-space: pre-wrap;
    word-break: break-all;
    border: 1px solid rgba(255,255,255,0.06);
}
.xray-hint {
    margin-top: 1rem;
    font-size: 0.65rem;
    color: #475569;
    font-style: italic;
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 0.5rem;
}
.xray-legend {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    background: rgba(3, 7, 18, 0.97);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    z-index: 99999;
    font-size: 0.7rem;
    color: #f8fafc;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
}
.xray-legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
}
.xray-legend-color {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
}

/* Tooltip flotante sobre el elemento */
.xray-element-tooltip {
    position: absolute;
    z-index: 999999;
    background: rgba(3, 7, 18, 0.95);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    font-family: 'JetBrains Mono', monospace;
    pointer-events: none;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    transition: opacity 0.15s ease;
    opacity: 0;
    max-width: 260px;
}
.xray-element-tooltip.visible {
    opacity: 1;
}
.xray-element-tooltip .et-tag {
    display: inline-block;
    background: #64748b;
    color: #fff;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 1px 6px;
    border-radius: 3px;
    margin-bottom: 0.35rem;
}
.xray-element-tooltip .et-id {
    font-size: 0.7rem;
    color: #f59e0b;
    margin-bottom: 0.25rem;
}
.xray-element-tooltip .et-classes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
}
.xray-element-tooltip .et-class-pill {
    background: rgba(139, 92, 246, 0.25);
    border: 1px solid rgba(139, 92, 246, 0.4);
    color: #c4b5fd;
    font-size: 0.6rem;
    padding: 1px 5px;
    border-radius: 3px;
}

/* Tag outlines */
.xray-tag-main { outline: 2px dashed #3b82f6; outline-offset: -2px; position: relative; }
.xray-tag-main::before { content: '<main>'; position: absolute; top: -11px; left: 6px; background: #3b82f6; color: #000; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-header { outline: 2px dashed #8b5cf6; outline-offset: -2px; position: relative; }
.xray-tag-header::before { content: '<header>'; position: absolute; top: -11px; left: 6px; background: #8b5cf6; color: #fff; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-section { outline: 2px dashed #8b5cf6; outline-offset: -2px; position: relative; }
.xray-tag-section::before { content: '<section>'; position: absolute; top: -11px; left: 6px; background: #8b5cf6; color: #fff; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-aside { outline: 2px dashed #06b6d4; outline-offset: -2px; position: relative; }
.xray-tag-aside::before { content: '<aside>'; position: absolute; top: -11px; left: 6px; background: #06b6d4; color: #000; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-footer { outline: 2px dashed #06b6d4; outline-offset: -2px; position: relative; }
.xray-tag-footer::before { content: '<footer>'; position: absolute; top: -11px; left: 6px; background: #06b6d4; color: #000; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-div { outline: 1px dotted #64748b; outline-offset: -1px; position: relative; }
.xray-tag-div::before { content: '<div>'; position: absolute; top: -9px; left: 4px; background: #64748b; color: #fff; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-h1 { outline: 1px solid #22c55e; outline-offset: -1px; position: relative; }
.xray-tag-h1::before { content: '<h1>'; position: absolute; top: -9px; left: 4px; background: #22c55e; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-h2 { outline: 1px solid #22c55e; outline-offset: -1px; position: relative; }
.xray-tag-h2::before { content: '<h2>'; position: absolute; top: -9px; left: 4px; background: #22c55e; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-h3 { outline: 1px solid #22c55e; outline-offset: -1px; position: relative; }
.xray-tag-h3::before { content: '<h3>'; position: absolute; top: -9px; left: 4px; background: #22c55e; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-p { outline: 1px solid rgba(34, 197, 94, 0.6); outline-offset: -1px; position: relative; }
.xray-tag-p::before { content: '<p>'; position: absolute; top: -8px; left: 4px; background: rgba(34, 197, 94, 0.9); color: #000; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-span { outline: 1px solid rgba(34, 197, 94, 0.4); outline-offset: -1px; position: relative; }
.xray-tag-span::before { content: '<span>'; position: absolute; top: -8px; left: 4px; background: rgba(34, 197, 94, 0.8); color: #000; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-ul { outline: 1px dashed #a78bfa; outline-offset: -1px; position: relative; }
.xray-tag-ul::before { content: '<ul>'; position: absolute; top: -8px; left: 4px; background: #a78bfa; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-li { outline: 1px dotted rgba(167, 139, 250, 0.5); outline-offset: -1px; position: relative; }
.xray-tag-li::before { content: '<li>'; position: absolute; top: -7px; right: 4px; background: rgba(167, 139, 250, 0.8); color: #000; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.75; line-height: 1; }

.xray-tag-script { outline: 2px dashed #f59e0b; outline-offset: -2px; position: relative; }
.xray-tag-script::before { content: '<script>'; position: absolute; top: -11px; left: 6px; background: #f59e0b; color: #000; font-size: 0.6rem; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99998; white-space: nowrap; pointer-events: none; opacity: 0.9; line-height: 1; }

.xray-tag-link { outline: 1px dashed #f59e0b; outline-offset: -1px; position: relative; }
.xray-tag-link::before { content: '<link>'; position: absolute; top: -8px; left: 4px; background: #f59e0b; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-meta { outline: 1px dashed #f59e0b; outline-offset: -1px; position: relative; }
.xray-tag-meta::before { content: '<meta>'; position: absolute; top: -8px; left: 4px; background: #f59e0b; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-title { outline: 1px dashed #f59e0b; outline-offset: -1px; position: relative; }
.xray-tag-title::before { content: '<title>'; position: absolute; top: -8px; left: 4px; background: #f59e0b; color: #000; font-size: 0.55rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99997; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-i { outline: 1px solid #ec4899; outline-offset: -1px; position: relative; }
.xray-tag-i::before { content: '<i>'; position: absolute; top: -8px; left: 4px; background: #ec4899; color: #fff; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-a { outline: 1px solid #f97316; outline-offset: -1px; position: relative; }
.xray-tag-a::before { content: '<a>'; position: absolute; top: -8px; left: 4px; background: #f97316; color: #fff; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

.xray-tag-img { outline: 1px solid #eab308; outline-offset: -1px; position: relative; }
.xray-tag-img::before { content: '<img>'; position: absolute; top: -8px; left: 4px; background: #eab308; color: #000; font-size: 0.5rem; padding: 1px 4px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-weight: bold; z-index: 99996; white-space: nowrap; pointer-events: none; opacity: 0.85; line-height: 1; }

[class*="xray-tag-"]:hover {
    background: rgba(255, 255, 255, 0.04) !important;
    cursor: help;
}

@media (max-width: 1100px) {
    .xray-panel { position: relative; width: 100%; top: auto; right: auto; margin-bottom: 1rem; }
    .xray-legend { display: none; }
}
`;
  document.head.appendChild(style);

  // Execute main logic
  (function() {
    'use strict';

    const i18n = {
  "tags": {
    "html": "Elemento Raíz. Contiene todo el documento HTML. El atributo lang define el idioma para accesibilidad y SEO.",
    "head": "Cabecera del documento. Contiene metadatos INVISIBLES: charset, viewport, título, enlaces a CSS, fuentes e iconos.",
    "body": "Cuerpo del Documento. Contiene TODO el contenido visible que se renderiza en la pantalla.",
    "main": "Contenido Principal Semántico. Indica a navegadores y lectores de pantalla que aquí está el contenido central. Crucial para SEO.",
    "header": "Encabezado Semántico. Agrupa contenido introductorio: títulos, logos, estados. NO confundir con <head>.",
    "section": "Sección Temática. Agrupa contenido relacionado entre sí. Tiene significado semántico; a diferencia de <div>, describe el propósito del contenido.",
    "aside": "Barra Lateral / Contenido Tangencial. Información secundaria que complementa al contenido principal: widgets, listas, enlaces.",
    "footer": "Pie de Página. Contiene información final: copyright, créditos, enlaces secundarios, texto legal.",
    "div": "División Genérica / Contenedor de Bloque. La caja básica sin significado semántico. Se usa para agrupar elementos y aplicarles estilos o layout (Flexbox/Grid).",
    "h1": "Encabezado de Nivel 1. El título MÁS IMPORTANTE de la página. Debe ser único por documento. Factor clave para SEO.",
    "h2": "Encabezado de Nivel 2. Subtítulo principal. Organiza la página en secciones grandes debajo de <h1>.",
    "h3": "Encabezado de Nivel 3. Título de sección menor. Subdivide el contenido de un <h2> en categorías más pequeñas.",
    "p": "Párrafo. Bloque de texto continuo. El navegador le añade márgenes automáticos arriba y abajo.",
    "span": "Contenedor en Línea (Inline). No fuerza salto de línea. Ideal para estilizar fragmentos pequeños de texto dentro de otro bloque.",
    "ul": "Lista Desordenada (Unordered List). Muestra viñetas (bullets) por defecto. Agrupa elementos donde el orden NO importa.",
    "li": "Elemento de Lista (List Item). Cada ítem individual dentro de una <ul> o <ol>.",
    "script": "Script de JavaScript. Contiene o vincula código de programación que añade interactividad, lógica y comportamiento dinámico a la página.",
    "link": "Vínculo a Recurso Externo. Conecta archivos externos al documento: hojas de estilo CSS, fuentes tipográficas, iconos.",
    "meta": "Meta Información. Datos invisibles sobre el documento: charset (caracteres), viewport (responsive), description (SEO).",
    "title": "Título del Documento. Texto que aparece en la pestaña del navegador, marcadores y resultados de búsqueda.",
    "i": "Elemento de Icono (Icon Font). Originalmente itálica, pero en diseño moderno se usa para mostrar iconos vectoriales (FontAwesome).",
    "a": "Enlace de Anclaje (Anchor). Crea hipervínculos a otras páginas, secciones o recursos.",
    "img": "Imagen. Incrusta una imagen en el documento. Requiere el atributo src.",
    "nav": "Navegación. Sección con enlaces de navegación principales del sitio.",
    "article": "Artículo. Contenido independiente y autocontenido (post de blog, noticia, comentario).",
    "form": "Formulario. Contiene controles interactivos para enviar datos al servidor.",
    "input": "Campo de Entrada. Permite al usuario introducir datos (texto, números, fechas, etc.).",
    "button": "Botón. Elemento interactivo que ejecuta una acción al ser clickeado."
  },
  "ui": {
    "panel_title": "Inspector de Elementos HTML",
    "no_id": "sin id",
    "no_classes": "Sin clases CSS",
    "no_attrs": "Sin atributos adicionales",
    "hint": "Cada color de borde representa un tipo de etiqueta HTML.",
    "legend_main": "Estructura Principal",
    "legend_sections": "Secciones",
    "legend_aside": "Laterales/Pie",
    "legend_divs": "Contenedores",
    "legend_text": "Texto",
    "legend_lists": "Listas",
    "legend_meta": "Metadatos/Scripts",
    "legend_icons": "Iconos"
  }
}
;

    const tagCss = {
        'main': 'main {\n  display: block;\n}',
        'header': 'header {\n  display: block;\n}',
        'section': 'section {\n  display: block;\n}',
        'aside': 'aside {\n  display: block;\n}',
        'footer': 'footer {\n  display: block;\n}',
        'div': 'div {\n  display: block;\n}',
        'h1': 'h1 {\n  display: block;\n  font-size: 2em;\n  font-weight: bold;\n}',
        'h2': 'h2 {\n  display: block;\n  font-size: 1.5em;\n  font-weight: bold;\n}',
        'h3': 'h3 {\n  display: block;\n  font-size: 1.17em;\n  font-weight: bold;\n}',
        'p': 'p {\n  display: block;\n  margin: 1em 0;\n}',
        'span': 'span {\n  display: inline;\n}',
        'ul': 'ul {\n  display: block;\n  list-style-type: disc;\n  padding-left: 2rem;\n}',
        'li': 'li {\n  display: list-item;\n}',
        'script': 'script {\n  display: none;\n}',
        'link': 'link {\n  display: none;\n}',
        'meta': 'meta {\n  display: none;\n}',
        'title': 'title {\n  display: none;\n}',
        'i': 'i {\n  display: inline;\n  font-style: italic;\n}',
        'a': 'a {\n  display: inline;\n  color: blue;\n  text-decoration: underline;\n}',
        'img': 'img {\n  display: inline-block;\n}',
        'nav': 'nav {\n  display: block;\n}',
        'article': 'article {\n  display: block;\n}',
        'form': 'form {\n  display: block;\n}',
        'input': 'input {\n  display: inline-block;\n}',
        'button': 'button {\n  display: inline-block;\n}'
    };

    function getTagColor(tag) {
        const colors = {
            'main': '#3b82f6', 'header': '#8b5cf6', 'section': '#8b5cf6',
            'aside': '#06b6d4', 'footer': '#06b6d4', 'div': '#64748b',
            'h1': '#22c55e', 'h2': '#22c55e', 'h3': '#22c55e',
            'p': '#22c55e', 'span': '#22c55e', 'ul': '#a78bfa',
            'li': '#a78bfa', 'script': '#f59e0b', 'link': '#f59e0b',
            'meta': '#f59e0b', 'title': '#f59e0b', 'i': '#ec4899',
            'a': '#f97316', 'img': '#eab308', 'nav': '#8b5cf6',
            'article': '#8b5cf6', 'form': '#06b6d4', 'input': '#22c55e',
            'button': '#f59e0b'
        };
        return colors[tag] || '#94a3b8';
    }

    function cleanClasses(className) {
        if (!className || typeof className !== 'string') return '';
        return className.split(' ')
            .filter(c => c && !c.startsWith('xray-tag-') && c !== 'reveal' && c !== 'visible')
            .join(' ');
    }

    function getBreadcrumb(el) {
        const path = [];
        let curr = el;
        while (curr && curr.tagName !== 'HTML' && curr.tagName !== 'BODY') {
            let name = curr.tagName.toLowerCase();
            if (curr.id) name += '#' + curr.id;
            const cls = cleanClasses(curr.className);
            if (cls) name += '.' + cls.split(' ').join('.');
            path.unshift(name);
            curr = curr.parentElement;
            if (path.length > 6) { path.unshift('...'); break; }
        }
        return path.join(' > ');
    }

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'xray-panel';
    panel.innerHTML = `
        <h3>${i18n.ui.panel_title}</h3>
        <div class="xray-visual-id" id="xray-visual-id">
            <div class="xray-visual-tag">&lt;tag&gt;</div>
            <div class="xray-visual-idname"><span class="label">id:</span> <span style="opacity:0.35">— ${i18n.ui.no_id} —</span></div>
            <div class="xray-visual-classes" id="xray-visual-classes"></div>
            <div class="xray-visual-attrs" id="xray-visual-attrs"></div>
        </div>
        <div class="xray-term" id="xray-term">${i18n.ui.hint}</div>
        <div class="xray-breadcrumb" id="xray-breadcrumb"></div>
        <div class="xray-desc" id="xray-desc"></div>
        <div class="xray-css" id="xray-css">/* css */</div>
        <div class="xray-hint">${i18n.ui.hint}</div>
    `;
    document.body.appendChild(panel);

    // Create legend
    const legend = document.createElement('div');
    legend.className = 'xray-legend';
    legend.innerHTML = `
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#3b82f6"></div><span>${i18n.ui.legend_main} (&lt;main&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#8b5cf6"></div><span>${i18n.ui.legend_sections} (&lt;header&gt;, &lt;section&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#06b6d4"></div><span>${i18n.ui.legend_aside} (&lt;aside&gt;, &lt;footer&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#64748b"></div><span>${i18n.ui.legend_divs} (&lt;div&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#22c55e"></div><span>${i18n.ui.legend_text} (&lt;h1&gt;-&lt;h3&gt;, &lt;p&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#a78bfa"></div><span>${i18n.ui.legend_lists} (&lt;ul&gt;, &lt;li&gt;)</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#f59e0b"></div><span>${i18n.ui.legend_meta}</span></div>
        <div class="xray-legend-item"><div class="xray-legend-color" style="background:#ec4899"></div><span>${i18n.ui.legend_icons} (&lt;i&gt;)</span></div>
    `;
    document.body.appendChild(legend);

    const termEl = document.getElementById('xray-term');
    const breadcrumbEl = document.getElementById('xray-breadcrumb');
    const descEl = document.getElementById('xray-desc');
    const cssEl = document.getElementById('xray-css');
    const visualIdEl = document.getElementById('xray-visual-id');
    const visualClassesEl = document.getElementById('xray-visual-classes');
    const visualAttrsEl = document.getElementById('xray-visual-attrs');

    // Element tooltip
    const elementTooltip = document.createElement('div');
    elementTooltip.className = 'xray-element-tooltip';
    document.body.appendChild(elementTooltip);

    function updateElementTooltip(el) {
        const tag = el.tagName.toLowerCase();
        const tagColor = getTagColor(tag);
        const cleanCls = cleanClasses(el.className);
        let html = '<div class="et-tag" style="background:' + tagColor + ';color:' + ((tagColor === '#f59e0b' || tagColor === '#22c55e' || tagColor === '#eab308') ? '#000' : '#fff') + '">&lt;' + tag + '&gt;</div>';
        if (el.id) html += '<div class="et-id">#' + el.id + '</div>';
        if (cleanCls) {
            html += '<div class="et-classes">';
            cleanCls.split(' ').forEach(cls => { html += '<span class="et-class-pill">.' + cls + '</span>'; });
            html += '</div>';
        }
        elementTooltip.innerHTML = html;
    }

    function positionElementTooltip(el) {
        const rect = el.getBoundingClientRect();
        const tooltipRect = elementTooltip.getBoundingClientRect();
        const padding = 8;
        let top = rect.top + window.scrollY - tooltipRect.height - padding;
        let left = rect.left + window.scrollX + padding;
        if (top < window.scrollY + 10) top = rect.bottom + window.scrollY + padding;
        if (left + tooltipRect.width > window.innerWidth - 10) left = rect.right + window.scrollX - tooltipRect.width - padding;
        elementTooltip.style.top = top + 'px';
        elementTooltip.style.left = left + 'px';
    }

    function annotateElement(el) {
        if (el.closest && (el.closest('.xray-panel') || el.closest('.xray-legend') || el.closest('.xray-element-tooltip'))) return;
        const tag = el.tagName.toLowerCase();
        if (document.querySelector('.xray-tag-' + tag)) el.classList.add('xray-tag-' + tag);
        let term = '<' + tag + '>';
        if (el.id) term += ' #' + el.id;
        const cleanCls = cleanClasses(el.className);
        if (cleanCls) term += ' .' + cleanCls.split(' ').join(' .');
        let desc = (i18n.tags[tag] || ('HTML <' + tag + '> element.'));
        let css = (tagCss[tag] || ('/* ' + tag + ' { ... } */'));
        if (cleanCls) {
            const classes = cleanCls.split(' ');
            css += '\n\n/* Classes */\n.' + classes.join(',\n.') + ' { ... }';
        }
        el.setAttribute('data-term', term);
        el.setAttribute('data-desc', desc);
        el.setAttribute('data-css', css);
    }

    document.head.querySelectorAll('*').forEach(annotateElement);
    document.body.querySelectorAll('*').forEach(annotateElement);
    annotateElement(document.documentElement);
    annotateElement(document.head);
    annotateElement(document.body);

    document.body.addEventListener('mouseover', function(e) {
        const el = e.target;
        if (!el.hasAttribute || !el.hasAttribute('data-term')) return;
        if (el.closest('.xray-panel') || el.closest('.xray-legend')) return;
        termEl.textContent = el.getAttribute('data-term');
        breadcrumbEl.textContent = getBreadcrumb(el);
        descEl.textContent = el.getAttribute('data-desc');
        cssEl.textContent = el.getAttribute('data-css');
        const tag = el.tagName.toLowerCase();
        const tagColor = getTagColor(tag);
        const tagBadge = visualIdEl.querySelector('.xray-visual-tag');
        tagBadge.textContent = '<' + tag + '>';
        tagBadge.style.background = tagColor;
        tagBadge.style.color = (tagColor === '#f59e0b' || tagColor === '#22c55e' || tagColor === '#eab308') ? '#000' : '#fff';
        const idLabel = visualIdEl.querySelector('.xray-visual-idname');
        if (el.id) idLabel.innerHTML = '<span class="label">id:</span> <span class="value">#' + el.id + '</span>';
        else idLabel.innerHTML = '<span class="label">id:</span> <span style="opacity:0.35">— ' + i18n.ui.no_id + ' —</span>';
        visualClassesEl.innerHTML = '';
        const cleanCls = cleanClasses(el.className);
        if (cleanCls) {
            cleanCls.split(' ').forEach(cls => {
                const pill = document.createElement('span');
                pill.className = 'xray-visual-class-pill';
                pill.textContent = '.' + cls;
                visualClassesEl.appendChild(pill);
            });
        } else {
            visualClassesEl.innerHTML = '<span style="font-size:0.65rem; color:#475569; font-style:italic;">' + i18n.ui.no_classes + '</span>';
        }
        let attrsText = '';
        const attrs = el.attributes;
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];
            if (attr.name.startsWith('data-') || attr.name === 'class') continue;
            attrsText += attr.name + '=\"' + attr.value + '\"  ';
        }
        visualAttrsEl.textContent = attrsText || i18n.ui.no_attrs;
        panel.style.borderColor = '#22c55e';
        panel.style.boxShadow = '0 0 24px rgba(34, 197, 94, 0.25)';
        updateElementTooltip(el);
        requestAnimationFrame(() => { positionElementTooltip(el); elementTooltip.classList.add('visible'); });
    });

    document.body.addEventListener('mousemove', function(e) {
        const el = e.target;
        if (!el.hasAttribute || !el.hasAttribute('data-term')) return;
        if (el.closest('.xray-panel') || el.closest('.xray-legend')) return;
        if (!elementTooltip.classList.contains('visible')) return;
        requestAnimationFrame(() => { positionElementTooltip(el); });
    });

    document.body.addEventListener('mouseout', function(e) {
        const el = e.target;
        if (!el.hasAttribute || !el.hasAttribute('data-term')) return;
        panel.style.borderColor = '#f59e0b';
        panel.style.boxShadow = '0 10px 40px rgba(0,0,0,0.6)';
        elementTooltip.classList.remove('visible');
    });

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    annotateElement(node);
                    node.querySelectorAll('*').forEach(annotateElement);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('%c 🔍 DOM ANATOMY ACTIVATED ', 'background: #f59e0b; color: #000; font-weight: bold; padding: 6px 10px; border-radius: 4px;');
})();

})();