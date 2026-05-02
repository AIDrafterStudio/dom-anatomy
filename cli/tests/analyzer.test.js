const { analyzeHTML } = require('../src/analyzer');
const fs = require('fs');
const path = require('path');
const os = require('os');

describe('DOM Anatomy Analyzer', () => {
  let tempDir;
  let outputDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dom-anatomy-test-'));
    outputDir = path.join(tempDir, 'output');
    fs.mkdirSync(outputDir, { recursive: true });
  });

  afterEach(() => {
    // Cleanup temp directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('should analyze a single HTML file', async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head><title>Test</title></head>
        <body>
          <main>
            <h1>Hello</h1>
            <div class="container">
              <p>World</p>
            </div>
          </main>
        </body>
      </html>
    `;
    
    const inputFile = path.join(tempDir, 'test.html');
    fs.writeFileSync(inputFile, htmlContent);

    const results = await analyzeHTML(inputFile, {
      outputDir,
      language: 'en',
      recursive: false,
      generateManual: false,
      generateBulkReport: false
    });

    expect(results.files).toHaveLength(1);
    expect(results.generated).toHaveLength(1);
    expect(fs.existsSync(path.join(outputDir, 'test_xray.html'))).toBe(true);
  });

  test('should generate X-Ray HTML with overlay', async () => {
    const htmlContent = `
      <html><body>
        <header><h1>Title</h1></header>
        <main><p>Content</p></main>
        <footer><span>Footer</span></footer>
      </body></html>
    `;
    
    const inputFile = path.join(tempDir, 'simple.html');
    fs.writeFileSync(inputFile, htmlContent);

    await analyzeHTML(inputFile, {
      outputDir,
      language: 'en',
      recursive: false,
      generateManual: false,
      generateBulkReport: false
    });

    const xrayContent = fs.readFileSync(path.join(outputDir, 'simple_xray.html'), 'utf8');
    expect(xrayContent).toContain('xray-panel');
    expect(xrayContent).toContain('xray-legend');
    expect(xrayContent).toContain('xray-tag-header');
    expect(xrayContent).toContain('xray-tag-main');
  });

  test('should generate manual when requested', async () => {
    const htmlContent = `
      <html><body>
        <div id="app" class="container">
          <h1 class="title">Test</h1>
        </div>
      </body></html>
    `;
    
    const inputFile = path.join(tempDir, 'manual-test.html');
    fs.writeFileSync(inputFile, htmlContent);

    const results = await analyzeHTML(inputFile, {
      outputDir,
      language: 'en',
      recursive: false,
      generateManual: true,
      generateBulkReport: false
    });

    expect(results.generated).toHaveLength(2);
    expect(fs.existsSync(path.join(outputDir, 'manual-test_MANUAL.md'))).toBe(true);
    
    const manualContent = fs.readFileSync(path.join(outputDir, 'manual-test_MANUAL.md'), 'utf8');
    expect(manualContent).toContain('#app');
    expect(manualContent).toContain('.container');
    expect(manualContent).toContain('.title');
  });

  test('should generate bulk report for multiple files', async () => {
    fs.writeFileSync(path.join(tempDir, 'a.html'), '<html><body><header></header></body></html>');
    fs.writeFileSync(path.join(tempDir, 'b.html'), '<html><body><footer></footer></body></html>');

    const results = await analyzeHTML(tempDir, {
      outputDir,
      language: 'en',
      recursive: false,
      generateManual: false,
      generateBulkReport: true
    });

    expect(results.files).toHaveLength(2);
    expect(fs.existsSync(path.join(outputDir, 'BULK_ANALYSIS_REPORT.md'))).toBe(true);
    
    const report = fs.readFileSync(path.join(outputDir, 'BULK_ANALYSIS_REPORT.md'), 'utf8');
    expect(report).toContain('**Files Analyzed**: 2');
  });

  test('should support Spanish language', async () => {
    const htmlContent = '<html><body><main><h1>Hola</h1></main></body></html>';
    const inputFile = path.join(tempDir, 'es-test.html');
    fs.writeFileSync(inputFile, htmlContent);

    await analyzeHTML(inputFile, {
      outputDir,
      language: 'es',
      recursive: false,
      generateManual: false,
      generateBulkReport: false
    });

    const xrayContent = fs.readFileSync(path.join(outputDir, 'es-test_xray.html'), 'utf8');
    expect(xrayContent).toContain('Inspector de Elementos HTML');
  });
});
