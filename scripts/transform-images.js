#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import glob from 'glob';
import Listr from 'listr';
import sharp from 'sharp';
import makeDir from 'make-dir';
import { isEmpty } from 'lodash/fp';

const IMAGES_PATH = '/static/images';
const PAGES_PATH = `/pages`;
const BLOG_PATH = `/blog`;
const ROOT_DIR = path.resolve(__dirname, '../src/');

const transformations = [
  {
    name: 'main post',
    src: `${ROOT_DIR}${PAGES_PATH}${BLOG_PATH}/**/image.@(png|jpg|jpeg)`,
    dest: `${ROOT_DIR}${IMAGES_PATH}${BLOG_PATH}`,
    matrix: [
      {
        name: 'cover',
        formats: ['jpg', 'webp'],
        width: 1440,
        height: 480,
        highDPI: true
      },
      {
        name: 'thumbnail',
        formats: ['jpg', 'webp'],
        width: 350,
        height: 150,
        highDPI: true
      },
      {
        name: 'social',
        formats: ['jpg'],
        width: 1200,
        height: 800
      }
    ]
  },
  {
    name: 'post content',
    src: `${ROOT_DIR}${PAGES_PATH}${BLOG_PATH}/**/!(image*).@(png|jpg|jpeg)`,
    dest: `${ROOT_DIR}${IMAGES_PATH}${BLOG_PATH}`,
    matrix: [
      {
        formats: ['jpg', 'webp'],
        method: 'max',
        width: 1000,
        height: 1000,
        highDPI: true
      }
    ]
  }
  // {
  //   name: 'page',
  //   src: `${ROOT_DIR}${PAGES_PATH}/**/!(image*).@(png|jpg|jpeg)`,
  //   dest: `${ROOT_DIR}${IMAGES_PATH}`,
  //   matrix: [
  //     {
  //       formats: ['jpg', 'webp'],
  //       method: 'max',
  //       width: 1000,
  //       height: 1000,
  //       highDPI: true
  //     }
  //   ]
  // }
];

function getPageSlug(absolutePath) {
  return path
    .dirname(absolutePath)
    .split('/')
    .pop();
}

function resizeImage(
  source,
  dest,
  { format = 'jpg', method = 'crop', width, height }
) {
  const options = ['jpg', 'png'].includes(format)
    ? { progressive: true }
    : undefined;
  return sharp(source)
    .resize(width, height)
  [method]()
    .toFormat(format, options)
    .toFile(`${dest}.${format}`);
}

const formatTasks = (type, file, destDir) => {
  const taskList = [];

  const { name, width, height, method, highDPI } = type;

  makeDir.sync(destDir);

  type.formats.forEach(format => {
    const dest = `${destDir}/${name}`;

    taskList.push({
      title: `${format}`,
      task: () => resizeImage(file, dest, { format, method, width, height })
    });

    if (highDPI) {
      const dest2x = `${destDir}/${name}@2x`;

      taskList.push({
        title: `${format}@2x`,
        task: () =>
          resizeImage(file, dest2x, {
            format,
            method,
            width: width ? width * 2 : null,
            height: height ? height * 2 : null
          })
      });
    }
  });

  return new Listr(taskList, { concurrent: true });
};

const matrixTasks = (transformation, file, slug) => {
  const destDir = `${transformation.dest}/${slug}`;
  return new Listr(
    transformation.matrix.map(type => {
      const name = type.name || path.basename(file, path.extname(file));
      return {
        title: name,
        skip: () => isEmpty(type.formats),
        task: () => formatTasks({ ...type, name }, file, destDir)
      };
    }),
    { concurrent: true }
  );
};

const fileTasks = (transformation, files) =>
  new Listr(
    files.map(file => {
      const slug = getPageSlug(file);
      return {
        title: slug,
        skip: () => isEmpty(transformation.matrix),
        task: () => matrixTasks(transformation, file, slug)
      };
    })
  );

const tasks = new Listr(
  transformations.map(transformation => {
    const { src, name } = transformation;
    const files = glob.sync(src);
    return {
      title: `Transforming "${name}" images`,
      skip: () => isEmpty(files),
      task: () => fileTasks(transformation, files)
    };
  })
);

tasks.run().catch(err => {
  console.error(err);
});
