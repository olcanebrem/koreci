import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// .jpg dosyalarının bulunduğu klasör
const inputDir = 'public/images/cardi/';
// Çıktı klasörünü belirleyin
const outputDir = 'public/images/cardi/';

// Klasördeki tüm .jpg dosyalarını al
fs.readdirSync(inputDir)
  .filter(file => path.extname(file).toLowerCase() === '.jpg') // sadece .jpg dosyalarını al
  .forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputWebp = path.join(outputDir, `${path.basename(file, '.jpg')}.webp`);
    const outputAvif = path.join(outputDir, `${path.basename(file, '.jpg')}.avif`);

    // .webp formatına dönüştür
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputWebp, (err, info) => {
        if (err) {
          console.error(`WebP dönüştürme hatası (${file}):`, err);
        } else {
          console.log(`WebP dönüştürme başarılı (${file}):`, info);
        }
      });

    // .avif formatına dönüştür
    sharp(inputPath)
      .avif({ quality: 80 })
      .toFile(outputAvif, (err, info) => {
        if (err) {
          console.error(`AVIF dönüştürme hatası (${file}):`, err);
        } else {
          console.log(`AVIF dönüştürme başarılı (${file}):`, info);
        }
      });
  });
