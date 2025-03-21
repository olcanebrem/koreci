import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname'i ES modülünde kullanmak için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const changelogPath = path.join(__dirname, '../CHANGELOG.md');
const changelogContent = fs.readFileSync(changelogPath, 'utf-8');

// Markdown'u MDX formatına dönüştür
const mdxContent = changelogContent
  .replace(/### (.*)/g, '### $1\n<Changelog date="$1">')
  .replace(/<\/Changelog>/g, '</Changelog>\n');

// Mevcut MDX içeriğini oku (eğer varsa)
const mdxPath = path.join(__dirname, '../src/content/changelog.mdx');
let existingContent = '';
if (fs.existsSync(mdxPath)) {
  existingContent = fs.readFileSync(mdxPath, 'utf-8');
}

// Yeni içeriği mevcut içeriğe ekle
const updatedContent = mdxContent + '\n\n' + existingContent;

// Tarihe göre sırala (örnek bir regex ile tarihleri çıkarabilirsiniz)
const sortedContent = updatedContent
  .split('\n\n') // Her girişi ayır
  .sort((a, b) => {
    const dateA = a.match(/### (.*)/)?.[1]; // Tarihi çıkar
    const dateB = b.match(/### (.*)/)?.[1]; // Tarihi çıkar
    return new Date(dateB) - new Date(dateA); // Tarihe göre sırala
  })
  .join('\n\n'); // Girişleri birleştir

// MDX dosyasını güncelle
fs.writeFileSync(mdxPath, sortedContent);

console.log('Changelog girişleri tarihe göre sıralandı ve MDX dosyası güncellendi!');