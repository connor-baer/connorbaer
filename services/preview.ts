export function getPreview({
  preview,
  previewData,
}: {
  preview?: boolean;
  previewData?: string[];
}) {
  return [Boolean(preview), previewData || []];
}
