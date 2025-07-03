const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path to source logo (png or svg). Place your high-res logo at project root named 'logo.png'.
const SOURCE = path.join(__dirname, '..', 'logo.jpeg');

if (!fs.existsSync(SOURCE)) {
  console.error('\n⚠️  logo.png not found at project root. Please add it and re-run.');
  process.exit(1);
}

const outDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  try {
    await sharp(SOURCE)
      .resize(1024, 1024, { fit: 'contain', background: 'white' })
      .png()
      .toFile(path.join(outDir, 'icon.png'));

    await sharp(SOURCE)
      .resize(432, 432, { fit: 'contain', background: 'transparent' })
      .png()
      .toFile(path.join(outDir, 'adaptive-icon.png'));

    await sharp(SOURCE)
      .resize(512, 512, { fit: 'contain', background: 'transparent' })
      .png()
      .toFile(path.join(outDir, 'favicon.png'));

    console.log('✅ Icons generated in assets/images');
  } catch (e) {
    console.error('Error generating icons', e);
    process.exit(1);
  }
})(); 