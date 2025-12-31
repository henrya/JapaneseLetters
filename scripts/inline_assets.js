const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '../build');
const indexPath = path.join(buildDir, 'index.html');

console.log('Starting asset inlining for:', indexPath);

fs.readFile(indexPath, 'utf8', (err, htmlData) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  let modifiedHtml = htmlData;
  let filesToDelete = [];

  // 1. Inline CSS - Removed as no <link rel="stylesheet"> tags found in index.html
  // CSS seems to be handled by JS or inlined directly by Webpack.
  // The original CSS inlining logic is not needed.

  // 2. Inline JavaScript
  // This regex targets all .js files in /static/js/, including main, chunks, and runtime
  const jsScriptRegex = /<script(?: defer="defer")? src="(\/static\/js\/[^"]+\.js)"><\/script>/g;
  let jsMatch;
  // Collect all JS files first
  let jsToInline = [];
  while ((jsMatch = jsScriptRegex.exec(htmlData)) !== null) {
    jsToInline.push({
      fullMatch: jsMatch[0],
      fileName: jsMatch[1]
    });
  }

  for (const entry of jsToInline) {
    const jsFilePath = path.join(buildDir, entry.fileName);
    if (fs.existsSync(jsFilePath)) {
      const jsContent = fs.readFileSync(jsFilePath, 'utf8');
      modifiedHtml = modifiedHtml.replace(entry.fullMatch, `<script>${jsContent}</script>`);
      filesToDelete.push(jsFilePath);
      console.log('Inlined JS:', entry.fileName);
    } else {
      console.warn('JavaScript file not found:', jsFilePath);
    }
  }

  // Write the modified HTML back to index.html
  fs.writeFile(indexPath, modifiedHtml, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing modified index.html:', writeErr);
      return;
    }
    console.log('All assets inlined successfully into index.html');

    // Delete the original external files
    for (const filePath of filesToDelete) {
      try {
        fs.unlinkSync(filePath);
        console.log('Deleted external file:', filePath);
      } catch (unlinkErr) {
        console.warn('Error deleting external file:', filePath, unlinkErr.message);
      }
    }

    // Optional: Clean up empty static directories
    try {
      const staticCssDir = path.join(buildDir, 'static', 'css');
      if (fs.existsSync(staticCssDir) && fs.readdirSync(staticCssDir).length === 0) {
        fs.rmdirSync(staticCssDir, { recursive: true });
        console.log('Cleaned up empty static/css directory.');
      }
      const staticJsDir = path.join(buildDir, 'static', 'js');
      if (fs.existsSync(staticJsDir) && fs.readdirSync(staticJsDir).length === 0) {
        fs.rmdirSync(staticJsDir, { recursive: true });
        console.log('Cleaned up empty static/js directory.');
      }
      const staticMediaDir = path.join(buildDir, 'static', 'media'); // React build often puts images/media here
      if (fs.existsSync(staticMediaDir) && fs.readdirSync(staticMediaDir).length === 0) {
        fs.rmdirSync(staticMediaDir, { recursive: true });
        console.log('Cleaned up empty static/media directory.');
      }
    } catch (cleanupErr) {
      console.warn('Error during static directories cleanup:', cleanupErr);
    }
  });
});
