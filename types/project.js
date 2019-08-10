import { Image } from './image';

export interface Project {
  title: string;
  subtitle: string;
  slug: string;
  introduction: string;
  client: string;
  skills: string[];
  link: string;
  image: Image;
}
