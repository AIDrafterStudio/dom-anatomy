const fs = require('fs');
const path = require('path');

console.log('Building Chrome Extension...');

const cssSrc = path.join(__dirname, '../cli/src/templates/xray-styles.css');
const jsSrc = path.join(__dirname, '../cli/src/templates/xray-script.js');
const i18nSrc = path.join(__dirname, '../i18n/es.json');

const cssDest = path.join(__dirname, '../extension/xray-styles.css');
const jsDest = path.join(__dirname, '../extension/content.js');

// 1. Copy CSS
fs.copyFileSync(cssSrc, cssDest);
console.log('Copied xray-styles.css');

// 2. Build Content Script (JS + i18n)
let js = fs.readFileSync(jsSrc, 'utf8');
const i18n = fs.readFileSync(i18nSrc, 'utf8');

// Replace i18n placeholder
js = js.replace('/* I18N_DATA */', `const i18n = ${i18n};`);

// Add a check to prevent multiple injections
const contentCode = `
if (!window.domAnatomyInjected) {
  window.domAnatomyInjected = true;
  console.log('Injecting DOM Anatomy from Extension...');
  ${js}
} else {
  console.log('DOM Anatomy is already active on this tab.');
}
`;

fs.writeFileSync(jsDest, contentCode.trim());
console.log('Successfully created extension/content.js');
