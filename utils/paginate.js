import { slice } from 'lodash/fp';

export default function paginate(page = 1, skip = 10) {
  return slice((page - 1) * skip, page * skip);
}
