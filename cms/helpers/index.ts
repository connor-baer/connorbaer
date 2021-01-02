import { TinaCMS } from 'tinacms';

import * as logger from '../../services/logger';

type SubmitFn<T> = (values: T) => Promise<any>;

export function createSubmit<T>(cms: TinaCMS, fn: SubmitFn<T>) {
  return async (values: T) => {
    try {
      cms.alerts.info('Saving entry...');

      await fn(values);

      cms.alerts.success('Saved entry.');
    } catch (error) {
      cms.alerts.error('Error saving entry!', 5000);
      logger.error(error);
    }
  };
}
