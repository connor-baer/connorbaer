export function getPreview({
  preview,
  previewData,
}: {
  preview?: boolean;
  previewData?: string[];
}): [boolean, string[]] {
  return [Boolean(preview), previewData || []];
}
