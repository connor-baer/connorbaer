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

const OUTPUT_FORMATS = [
  {
    name: 'thumbnail',
    width: 700,
    height: 300
  },
  {
    name: 'cover',
    width: 2880,
    height: 600
  }
];

function getPageSlug(absolutePath) {
  return path
    .dirname(absolutePath)
    .split('/')
    .pop();
}

function createResizedImage(
  filePath,
  pageSlug,
  { name, width, height, format = 'jpg' }
) {
  return sharp(filePath)
    .resize(width, height)
    .toFile(`${DESTINATION}/${pageSlug}/${name}.${format}`);
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
        ctx.sourceFiles.map(filePath => {
          const pageSlug = getPageSlug(filePath);
          return {
            title: `Creating images for "${pageSlug}"`,
            task: async () => {
              await makeDir(`${DESTINATION}/${pageSlug}`);
              OUTPUT_FORMATS.forEach(format => {
                createResizedImage(filePath, pageSlug, format);
              });
            }
          };
        }),
        { concurrent: true }
      )
  }
]);

tasks.run();
