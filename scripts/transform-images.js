#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import path from 'path';
import glob from 'glob';
import Listr from 'listr';
import sharp from 'sharp';
import { promisify } from 'util';
import makeDir from 'make-dir';

import { PAGES_PATH, IMAGES_PATH, BLOG_PATH } from '../src/constants/paths';

const globAsync = promisify(glob);

const ROOTDIR = path.resolve(__dirname, '../src/');
const INPUT_DIR = `${ROOTDIR}${PAGES_PATH}${BLOG_PATH}`;
const GLOB_PATTERN = `${INPUT_DIR}/**/image.@(png|jpg|jpeg)`;
const OUTPUT_DIR = `${ROOTDIR}${IMAGES_PATH}${BLOG_PATH}`;

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
    .toFile(`${OUTPUT_DIR}/${pageSlug}/${name}.${format}`);
}

const tasks = new Listr([
  {
    title: 'Find source images',
    task: async ctx => {
      const sourceFiles = await globAsync(GLOB_PATTERN);
      ctx.sourceFiles = sourceFiles;
    }
  },
  {
    title: 'Create resized images',
    skip: ctx => !Array.isArray(ctx.sourceFiles) || !ctx.sourceFiles.length,
    task: ctx =>
      new Listr(
        ctx.sourceFiles.map(filePath => {
          const pageSlug = getPageSlug(filePath);
          return {
            title: `Creating images for "${pageSlug}"`,
            task: async () => {
              await makeDir(`${OUTPUT_DIR}/${pageSlug}`);
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
