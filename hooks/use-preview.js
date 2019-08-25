import { useRouter } from 'next/router';

export default function usePreview() {
  const router = useRouter();
  const { query = {} } = router;

  return !!query.preview;
}
