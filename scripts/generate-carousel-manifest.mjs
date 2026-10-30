import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const carouselDirectory = resolve('src/assets/img/page-home/carousel');

const images = readdirSync(carouselDirectory)
  .filter((file) => /\.(webp|png|jpe?g|gif)$/i.test(file))
  .sort();

console.log(`Carousel assets found: ${images.length} image(s). Titles remain in src/app/home/carousel-images.ts.`);