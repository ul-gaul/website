import { readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const carouselDirectory = resolve('src/assets/img/page-home/carousel');
const outputFile = resolve('src/app/home/carousel-images.ts');

const images = readdirSync(carouselDirectory)
  .filter((file) => /\.(webp|png|jpe?g|gif)$/i.test(file))
  .sort();

const content = `export const carouselImages = ${JSON.stringify(images, null, 2)} as const;\n`;

writeFileSync(outputFile, content);
console.log(`Carousel manifest generated with ${images.length} image(s).`);