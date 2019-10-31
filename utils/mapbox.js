import { MAPBOX } from '../constants/tokens';

const MAPBOX_BASE_URL = 'https://api.mapbox.com';

// eslint-disable-next-line import/prefer-default-export
export function constructStaticImageUrl({
  username = 'mapbox',
  themeId = 'streets-v9',
  lon = -109.3497,
  lat = -27.1227,
  zoom = 11,
  bearing = 0,
  pitch = 0,
  width = 1000,
  height = 600,
  highResolution = false
} = {}) {
  // eslint-disable-next-line max-len
  return `${MAPBOX_BASE_URL}/styles/v1/${username}/${themeId}/${lon},${lat},${zoom},${bearing},${pitch}/${width}x${height}${
    highResolution ? '@2x' : ''
  }?access_token=${MAPBOX}`;
}
