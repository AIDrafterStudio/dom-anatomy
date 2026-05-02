const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const cheerio = require('cheerio');

// Load i18n dictionaries
function loadI18n(language) {
  const i18nPath = path.join(__dirname, '..', '..', 'i18n', `${language}.json`);
  if (fs.existsSync(i18nPath)) {
    return JSON.parse(fs.readFileSync(i18nPath, 'utf8'));
  }
  // Fallback to English
  const enPath = path.join(__dirname, '..', '..', 'i18n', 'en.json');
  return JSON.parse(fs.readFileSync(enPath, 'utf8'));
}

// Read template files
function loadTemplate(name) {
  const templatePath = path.join(__dirname, 'templates', `${name}.css`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }
  return '';
}

function loadScriptTemplate() {
  const templatePath = path.join(__dirname, 'templates', 'xray-script.js');
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }
  return '';
}

// Generate X-Ray HTML from original
function generateXRayHTML(originalHtml, i18n, fileName) {
  const $ = cheerio.load(originalHtml, { decodeEntities: false });
  
  // Add X-Ray styles before closing </head>
  const xrayStyles = loadTemplate('xray-styles');
  if ($('head').length) {
    $('head').append(`\n<!-- DOM Anatomy X-Ray Layer -->\n<style>\n${xrayStyles}\n</style>`);
  }
  
  // Add X-Ray script before closing </body>
  let xrayScript = loadScriptTemplate();
  
  // Inject i18n data into script
  const i18nJson = JSON.stringify(i18n).replace(/\/\*/g, '/ *').replace(/\*\//g, '* /');
  xrayScript = xrayScript.replace('/* I18N_DATA */', `const i18n = ${i18nJson};`);
  
  if ($('body').length) {
    $('body').append(`\n<!-- DOM Anatomy X-Ray Script -->\n<script>\n${xrayScript}\n</script>`);
  }
  
  return $.html();
}

// Generate Markdown manual
function generateManual(originalHtml, i18n, fileName) {
  const $ = cheerio.load(originalHtml);
  const tags = new Set();
  const classes = new Set();
  const ids = new Set();
  
  $('*').each((i, el) => {
    tags.add(el.tagName.toLowerCase());
    if (el.attribs && el.attribs.class) {
      el.attribs.class.split(/\s+/).forEach(c => classes.add(c));
    }
    if (el.attribs && el.attribs.id) {
      ids.add(el.attribs.id);
    }
  });
  
  let manual = `# DOM Anatomy Manual: ${fileName}\n\n`;
  manual += `## Overview\n\n`;
  manual += `- **Total Tags**: ${tags.size}\n`;
  manual += `- **Unique Classes**: ${classes.size}\n`;
  manual += `- **Unique IDs**: ${ids.size}\n\n`;
  
  manual += `## Tag Glossary\n\n`;
  Array.from(tags).sort().forEach(tag => {
    const desc = i18n.tags[tag] || `HTML <${tag}> element.`;
    manual += `### <${tag}>\n${desc}\n\n`;
  });
  
  if (classes.size > 0) {
    manual += `## CSS Classes\n\n`;
    Array.from(classes).sort().forEach(cls => {
      manual += `- \`.${cls}\`\n`;
    });
    manual += '\n';
  }
  
  if (ids.size > 0) {
    manual += `## IDs\n\n`;
    Array.from(ids).sort().forEach(id => {
      manual += `- \`#${id}\`\n`;
    });
    manual += '\n';
  }
  
  manual += `## Structure Tree\n\n\`\`\`\n`;
  function buildTree(el, depth = 0) {
    let result = '';
    const tagName = el.tagName ? el.tagName.toLowerCase() : 'unknown';
    const id = el.attribs && el.attribs.id ? `#${el.attribs.id}` : '';
    const cls = el.attribs && el.attribs.class ? `.${el.attribs.class.split(/\s+/).join('.')}` : '';
    result += '  '.repeat(depth) + `<${tagName}${id}${cls}>\n`;
    
    if (el.children) {
      el.children.forEach(child => {
        if (child.type === 'tag') {
          result += buildTree(child, depth + 1);
        }
      });
    }
    return result;
  }
  
  const body = $('body')[0];
  if (body) {
    manual += buildTree(body);
  }
  manual += `\`\`\`\n`;
  
  return manual;
}

// Generate bulk analysis report
function generateBulkReport(allResults, i18n) {
  const allTags = new Set();
  const allClasses = new Set();
  const allIds = new Set();
  
  allResults.forEach(result => {
    result.tags.forEach(t => allTags.add(t));
    result.classes.forEach(c => allClasses.add(c));
    result.ids.forEach(i => allIds.add(i));
  });
  
  let report = `# DOM Anatomy - Bulk Analysis Report\n\n`;
  report += `## Summary\n\n`;
  report += `- **Files Analyzed**: ${allResults.length}\n`;
  report += `- **Unique Tags**: ${allTags.size}\n`;
  report += `- **Unique Classes**: ${allClasses.size}\n`;
  report += `- **Unique IDs**: ${allIds.size}\n\n`;
  
  report += `## Files\n\n`;
  allResults.forEach(result => {
    report += `- ${result.fileName}\n`;
  });
  report += '\n';
  
  report += `## All Tags Found (${allTags.size})\n\n`;
  Array.from(allTags).sort().forEach(tag => {
    const desc = i18n.tags[tag] || '';
    report += `- \`<${tag}>\` - ${desc}\n`;
  });
  report += '\n';
  
  if (allClasses.size > 0) {
    report += `## All Classes Found (${allClasses.size})\n\n`;
    Array.from(allClasses).sort().forEach(cls => {
      report += `- \`.${cls}\`\n`;
    });
    report += '\n';
  }
  
  return report;
}

// Main analysis function
async function analyzeHTML(inputPath, options) {
  const { outputDir, language, recursive, generateManual, generateBulkReport } = options;
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Load i18n
  const i18n = loadI18n(language);
  
  // Find HTML files
  let htmlFiles = [];
  const stat = fs.statSync(inputPath);
  
  if (stat.isFile()) {
    if (inputPath.endsWith('.html') || inputPath.endsWith('.htm')) {
      htmlFiles.push(inputPath);
    }
  } else if (stat.isDirectory()) {
    const pattern = recursive ? '**/*.html' : '*.html';
    htmlFiles = await glob(pattern, { cwd: inputPath, absolute: true });
  }
  
  if (htmlFiles.length === 0) {
    throw new Error('No HTML files found');
  }
  
  const results = {
    files: [],
    generated: [],
    bulkResults: []
  };
  
  for (const file of htmlFiles) {
    const fileName = path.basename(file);
    const baseName = path.basename(file, path.extname(file));
    const originalHtml = fs.readFileSync(file, 'utf8');
    
    console.log(`  📄 Processing: ${fileName}`);
    
    // Generate X-Ray HTML
    const xrayHtml = generateXRayHTML(originalHtml, i18n, fileName);
    const xrayPath = path.join(outputDir, `${baseName}_xray.html`);
    fs.writeFileSync(xrayPath, xrayHtml, 'utf8');
    results.generated.push(xrayPath);
    
    // Generate manual if requested
    if (generateManual) {
      const manual = generateManualContent(originalHtml, i18n, fileName);
      const manualPath = path.join(outputDir, `${baseName}_MANUAL.md`);
      fs.writeFileSync(manualPath, manual, 'utf8');
      results.generated.push(manualPath);
    }
    
    // Collect data for bulk report
    const $ = cheerio.load(originalHtml);
    const fileTags = new Set();
    const fileClasses = new Set();
    const fileIds = new Set();
    
    $('*').each((i, el) => {
      fileTags.add(el.tagName.toLowerCase());
      if (el.attribs && el.attribs.class) {
        el.attribs.class.split(/\s+/).forEach(c => fileClasses.add(c));
      }
      if (el.attribs && el.attribs.id) {
        fileIds.add(el.attribs.id);
      }
    });
    
    results.bulkResults.push({
      fileName,
      tags: Array.from(fileTags),
      classes: Array.from(fileClasses),
      ids: Array.from(fileIds)
    });
    
    results.files.push(file);
  }
  
  // Generate bulk report
  if (generateBulkReport && results.bulkResults.length > 1) {
    const bulkContent = generateBulkReportFn(results.bulkResults, i18n);
    const bulkPath = path.join(outputDir, 'BULK_ANALYSIS_REPORT.md');
    fs.writeFileSync(bulkPath, bulkContent, 'utf8');
    results.bulkReport = bulkPath;
    results.generated.push(bulkPath);
  }
  
  return results;
}

// Wrapper to avoid naming conflict
function generateManualContent(originalHtml, i18n, fileName) {
  return generateManual(originalHtml, i18n, fileName);
}

function generateBulkReportFn(allResults, i18n) {
  return generateBulkReport(allResults, i18n);
}

module.exports = {
  analyzeHTML,
  generateXRayHTML,
  generateManual: generateManualContent,
  generateBulkReport: generateBulkReportFn
};
