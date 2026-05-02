const fs = require('fs');
const path = require('path');

console.log('Building bookmarklet loader...');

const cssPath = path.join(__dirname, '../cli/src/templates/xray-styles.css');
const jsPath = path.join(__dirname, '../cli/src/templates/xray-script.js');
const i18nPath = path.join(__dirname, '../i18n/es.json');
const outPath = path.join(__dirname, '../bookmarklet/xray-loader.js');

const css = fs.readFileSync(cssPath, 'utf8');
let js = fs.readFileSync(jsPath, 'utf8');
const i18n = fs.readFileSync(i18nPath, 'utf8');

// Replace i18n placeholder
js = js.replace('/* I18N_DATA */', `const i18n = ${i18n};`);

const escapedCss = css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\\\$');

const loaderCode = `
(function() {
  if (document.getElementById('dom-anatomy-xray-styles')) {
    console.log('DOM Anatomy is already active.');
    return;
  }

  console.log('Injecting DOM Anatomy X-Ray...');
  
  const style = document.createElement('style');
  style.id = 'dom-anatomy-xray-styles';
  style.textContent = \`${escapedCss}\`;
  document.head.appendChild(style);

  // Execute main logic
  ${js}
})();
`;

fs.writeFileSync(outPath, loaderCode.trim());
console.log('Successfully created bookmarklet/xray-loader.js');
