import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handleMediaRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const publicId = req.query.public_id as string;

    if (req.method === 'DELETE') {
      await cloudinary.uploader.destroy(publicId);

      res.json({ public_id: publicId });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
