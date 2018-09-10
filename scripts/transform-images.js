#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import path from 'path';
import glob from 'glob';
import Listr from 'listr';
import sharp from 'sharp';
import makeDir from 'make-dir';
import { promisify } from 'util';
import { isEmpty } from 'lodash/fp';

import { PAGES_PATH, IMAGES_PATH, BLOG_PATH } from '../src/constants/paths';

const globAsync = promisify(glob);

const ROOT_DIR = path.resolve(__dirname, '../src/');
const SOURCE = `${ROOT_DIR}${PAGES_PATH}${BLOG_PATH}/**/image.@(png|jpg|jpeg)`;
const DESTINATION = `${ROOT_DIR}${IMAGES_PATH}${BLOG_PATH}`;

const OUTPUT_MATRIX = [
  {
    name: 'thumbnail',
    formats: ['jpg', 'webp'],
    width: 350,
    height: 150,
    highDPI: true
  },
  {
    name: 'cover',
    formats: ['jpg', 'webp'],
    width: 1440,
    height: 300,
    highDPI: true
  }
];

function getPageSlug(absolutePath) {
  return path
    .dirname(absolutePath)
    .split('/')
    .pop();
}

function resizeImage(source, dest, { width, height, format = 'jpg' }) {
  const options = ['jpg', 'png'].includes(format)
    ? { progressive: true }
    : undefined;
  return sharp(source)
    .resize(width, height)
    .toFormat(format, options)
    .toFile(`${dest}.${format}`);
}

async function createResizedImages(source, pageSlug) {
  const destDir = `${DESTINATION}/${pageSlug}`;
  await makeDir(destDir);
  OUTPUT_MATRIX.forEach(({ name, formats, width, height, highDPI }) => {
    formats.forEach(format => {
      const dest = `${destDir}/${name}`;
      resizeImage(source, dest, { width, height, format });
      if (highDPI) {
        const dest2x = `${destDir}/${name}@2x`;
        resizeImage(source, dest2x, {
          width: width * 2,
          height: height * 2,
          format
        });
      }
    });
  });
}

const tasks = new Listr([
  {
    title: 'Find source images',
    task: async ctx => {
      const sourceFiles = await globAsync(SOURCE);
      ctx.sourceFiles = sourceFiles;
    }
  },
  {
    title: 'Create resized images',
    skip: ctx => isEmpty(ctx.sourceFiles),
    task: ctx =>
      new Listr(
        ctx.sourceFiles.map(source => {
          const pageSlug = getPageSlug(source);
          return {
            title: `Creating images for "${pageSlug}"`,
            task: async () => createResizedImages(source, pageSlug)
          };
        }),
        { concurrent: true }
      )
  }
]);

tasks.run();
