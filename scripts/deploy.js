#! /usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import Listr from 'listr';
import execa from 'execa';

import nowConfig from '../now.json';
import staticConfig from '../src/static/now.json';

const tasks = new Listr([
  {
    title: 'Static files',
    task: (_, task) =>
      new Listr([
        {
          title: 'Deploying to now',
          task: ctx =>
            execa
              .stdout('now', ['src/static', '--static', '--no-clipboard'])
              .then(result => {
                // eslint-disable-next-line no-param-reassign
                task.title = `Static files: ${result}`;
                ctx.staticDeployment = result;
              })
        },
        {
          title: 'Aliasing deployment',
          task: ctx =>
            execa
              .stdout('now', [
                'alias',
                ctx.staticDeployment,
                staticConfig.alias
              ])
              .then(() => {
                // eslint-disable-next-line no-param-reassign
                task.title = `Static files: ${staticConfig.alias}`;
              })
        }
      ])
  },
  {
    title: 'Application',
    task: (_, task) =>
      new Listr([
        {
          title: 'Deploying to now',
          task: () =>
            execa
              .stdout('now', ['-e', `STATIC_URL=${staticConfig.alias}`])
              .then(result => {
                // eslint-disable-next-line no-param-reassign
                task.title = `Application: ${result}`;
              })
        },
        {
          title: 'Aliasing deployment',
          task: () =>
            execa.stdout('now', ['alias']).then(() => {
              // eslint-disable-next-line no-param-reassign
              task.title = `Application: https://${nowConfig.alias}`;
            })
        }
      ])
  }
]);

tasks.run().catch(err => {
  console.error(err);
});
