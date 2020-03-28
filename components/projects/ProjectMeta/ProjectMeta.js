import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { Small } from '@madebyconnor/bamboo-ui';

function stringifySkills(skills) {
  const firstSkills = skills.slice(0);
  const lastSkill = firstSkills.pop();
  return `${firstSkills.join(', ')} & ${lastSkill}`;
}

export default function ProjectMeta({ skills, ...props }) {
  if (isEmpty(skills)) {
    return null;
  }

  return <Small {...props}>{stringifySkills(skills)}</Small>;
}

ProjectMeta.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string),
};
