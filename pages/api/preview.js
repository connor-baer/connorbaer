export default (req, res) => {
  if (!req.query.token) {
    res.clearPreviewData();
    res.redirect(req.query.slug || '/');
    return;
  }

  if (req.query.token !== 'PANDA') {
    res.clearPreviewData();
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  if (!req.query.features) {
    res.clearPreviewData();
    res.status(401).json({ message: 'No features selected' });
    return;
  }

  res.setPreviewData(req.query.features.split(','));
  res.redirect(req.query.slug || '/');
};
