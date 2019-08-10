import CONFIG from '../utils/config';

// Base URLs
export const { BASE_URL, STATIC_URL } = CONFIG || {};

// Files
export const FAVICONS_PATH = `${STATIC_URL}/favicons`;
export const FONTS_PATH = `${STATIC_URL}/fonts`;

// Sections
export const PAGES_PATH = `/pages`;
export const BLOG_PATH = `/blog`;
export const CATEGORY_PATH = `${BLOG_PATH}/category`;
export const PROJECTS_PATH = `/projects`;
