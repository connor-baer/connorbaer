import path from 'path';
import { promisify } from 'util';

import { v2 as cloudinary } from 'cloudinary';
import { Media, MediaListOptions } from 'tinacms';
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';

export interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export const mediaHandlerConfig = {
  api: {
    bodyParser: false,
  },
};

export const createMediaHandler = (config: CloudinaryConfig) => {
  cloudinary.config(config);

  return async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        return listMedia(req, res);
      case 'POST':
        return uploadMedia(req, res);
      default:
        return res.end(404);
    }
  };
};

async function uploadMedia(req, res) {
  const upload = promisify(
    multer({
      storage: multer.diskStorage({
        directory: (_, file, cb) => {
          cb(null, '/tmp');
        },
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }).single('file'),
  );

  await upload(req, res);

  const { directory } = req.body;

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: directory.replace(/^\//, ''),
    use_filename: true,
    overwrite: false,
  });

  res.json(result);
}

async function listMedia(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { directory = '""', limit = 500 } = req.query as MediaListOptions;

    const query = `folder=${directory}`;

    const response = await cloudinary.search
      .expression(query)
      .max_results(limit)
      .execute();

    const files = response.resources.map(cloudinaryToTina);

    // @ts-expect-error TODO: Open PR to cloudinary-core
    // to add folders to types.
    cloudinary.api.folders = (dir = '""') => {
      if (dir === '""') {
        return cloudinary.api.root_folders();
      }
      return cloudinary.api.sub_folders(dir);
    };

    // @ts-expect-error See comment above.
    let { folders } = await cloudinary.api.folders(directory);

    folders = folders.map(
      (folder: { name: string; path: string }): Media => ({
        id: folder.path,
        type: 'dir',
        filename: path.basename(folder.path),
        directory: path.dirname(folder.path),
      }),
    );

    res.json({ items: [...folders, ...files] });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({ error });
  }
}

function cloudinaryToTina(file: any): Media {
  const filename = path.basename(file.public_id);
  const directory = path.dirname(file.public_id);

  return {
    id: file.public_id,
    filename,
    directory,
    previewSrc: file.url,
    type: 'file',
  };
}
