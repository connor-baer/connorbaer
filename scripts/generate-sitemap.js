#! /usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import Listr from 'listr';
import makeDir from 'make-dir';
import { promisify } from 'util';
import { isEmpty } from 'lodash/fp';

import { BASE_URL } from '../src/constants';
import { PAGES_PATH, STATIC_PATH } from '../src/constants/paths';

const globAsync = promisify(glob);
const statAsync = promisify(fs.stat);
const writeFileAsync = promisify(fs.writeFile);

const EXTENSIONS = ['js', 'jsx', 'mdx', 'md'];
const EXTENSIONS_REGEXP = new RegExp(`.(${EXTENSIONS.join('|')})$`);
const ROOT_DIR = path.resolve(__dirname, '../src');
const PAGES_DIR = `${ROOT_DIR}${PAGES_PATH}`;
const SOURCE = `${PAGES_DIR}/**/!(_*).@(${EXTENSIONS.join('|')})`;
const DESTINATION = `${ROOT_DIR}${STATIC_PATH}`;

async function buildLastMod(page) {
  const stats = await statAsync(page);
  const modDate = new Date(stats.mtime);
  const modYear = modDate.getFullYear();
  const modMonth = `0${modDate.getMonth() + 1}`.slice(-2);
  const modDay = `0${modDate.getDate()}`.slice(-2);
  return `${modYear}-${modMonth}-${modDay}`;
}

function buildLoc(page) {
  const locPath = page
    .replace(PAGES_DIR, '')
    .replace(EXTENSIONS_REGEXP, '')
    .replace(/(.*)index$/, '$1');
  return `${BASE_URL}${locPath}`;
}

async function buildPageXml(page) {
  const lastMod = await buildLastMod(page);
  const loc = buildLoc(page);

  let pageXml = '';
  pageXml += '<url>';
  pageXml += `<loc>${loc}</loc>`;
  pageXml += `<lastmod>${lastMod}</lastmod>`;
  pageXml += `<changefreq>always</changefreq>`;
  pageXml += `<priority>0.5</priority>`;
  pageXml += '</url>';

  return pageXml;
}

async function buildSitemap(pages) {
  let xml = '';
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  const pagePromises = pages.map(buildPageXml);
  const pagesXml = await Promise.all(pagePromises);

  xml += pagesXml.join('');
  xml += '</urlset>';

  return xml;
}

const tasks = new Listr([
  {
    title: 'Find pages',
    task: async ctx => {
      const pages = await globAsync(SOURCE);
      ctx.pages = pages;
    }
  },
  {
    title: 'Generate sitemap',
    skip: ctx => isEmpty(ctx.pages),
    task: async ctx => {
      const sitemap = await buildSitemap(ctx.pages);
      ctx.sitemap = sitemap;
    }
  },
  {
    title: 'Write sitemap to disk',
    skip: ctx => isEmpty(ctx.pages),
    task: async ctx => {
      await makeDir(DESTINATION);
      writeFileAsync(`${DESTINATION}/sitemap.xml`, ctx.sitemap);
    }
  }
]);

tasks.run();
