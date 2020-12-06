import { NextApiRequest, NextApiResponse } from 'next';

type PreviewQuery = {
  token?: string;
  slug?: string;
  features?: string;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { token, slug = '/', features } = req.query as PreviewQuery;

  if (!token) {
    res.clearPreviewData();
    res.redirect(slug);
    return;
  }

  if (token !== process.env.TOKEN) {
    res.clearPreviewData();
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  if (!features) {
    res.clearPreviewData();
    res.status(401).json({ message: 'No features selected' });
    return;
  }

  res.setPreviewData(features.split(','));
  res.redirect(slug);
};
