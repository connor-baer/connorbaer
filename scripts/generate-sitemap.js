import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob);
const statAsync = promisify(fs.stat);

const EXTENSIONS = ['js', 'jsx', 'mdx', 'md'];
const EXTENSIONS_REGEXP = new RegExp(`.(${EXTENSIONS.join('|')})$`);
const ROOT_DIR = path.resolve(__dirname, '../src');
const PAGES_DIR = `${ROOT_DIR}/pages`;
const SOURCE = `${PAGES_DIR}/**/!(_*).@(${EXTENSIONS.join('|')})`;

async function buildLastMod(page) {
  const stats = await statAsync(page);
  const modDate = new Date(stats.mtime);
  const modYear = modDate.getFullYear();
  const modMonth = `0${modDate.getMonth() + 1}`.slice(-2);
  const modDay = `0${modDate.getDate()}`.slice(-2);
  return `${modYear}-${modMonth}-${modDay}`;
}

function buildLoc(page, baseUrl) {
  const locPath = page
    .replace(PAGES_DIR, '')
    .replace(EXTENSIONS_REGEXP, '')
    .replace(/(.*)index$/, '$1')
    .replace(/\/$/, '');
  return `${baseUrl}${locPath}`;
}

async function buildPageXml(page, baseUrl) {
  const lastMod = await buildLastMod(page);
  const loc = buildLoc(page, baseUrl);

  let pageXml = '';
  pageXml += '<url>';
  pageXml += `<loc>${loc}</loc>`;
  pageXml += `<lastmod>${lastMod}</lastmod>`;
  pageXml += `<changefreq>always</changefreq>`;
  pageXml += `<priority>0.5</priority>`;
  pageXml += '</url>';

  return pageXml;
}

async function buildSitemap(pages, baseUrl) {
  let xml = '';
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  const pagePromises = pages.map(page => buildPageXml(page, baseUrl));
  const pagesXml = await Promise.all(pagePromises);

  xml += pagesXml.join('');
  xml += '</urlset>';

  return xml;
}

export default async function generateSitemap(baseUrl) {
  const pages = await globAsync(SOURCE);
  const sitemap = await buildSitemap(pages, baseUrl);
  return sitemap;
}
