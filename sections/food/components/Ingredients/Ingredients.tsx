import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Text, styles } from '@madebyconnor/bamboo-ui';

import SectionHeading from '../../../../components/SectionHeading';
import { useIngredients } from '../../hooks/useIngredients';
import { RawIngredient, UnitSystem } from '../../types';
import { UnitSystemContext } from '../UnitSystemContext';
import { clamp } from '../../../../utils/clamp';

const sectionStyles = (theme) => css`
  margin-top: ${theme.spacing.s} !important;
`;

const listStyles = ({ theme }) => css`
  line-height: ${theme.lineHeight.l};

  > * {
    display: block;
  }
`;

const List = styled('ul')(listStyles);

const listItemStyles = ({ theme }) => css`
  text-indent: calc(-1 * ${theme.spacing.s});
  margin-left: ${theme.spacing.s};
`;

const ListItem = styled('li')(listItemStyles);

const Control = styled('div')`
  display: flex;
  align-items: center;
`;

const hrStyles = ({ theme }) => css`
  border: none;
  margin-top: ${theme.spacing.s};
  margin-bottom: ${theme.spacing.s};
`;

const Hr = styled('hr')(hrStyles);

const baseStyles = ({ theme }) => css`
  position: relative;
  height: 1.5rem;
  outline: none;
  padding: 0;
  background: ${theme.color.white};
  color: ${theme.color.bodyColor};
  text-align: center;
  font-size: ${theme.fontSize.s};
  line-height: ${theme.lineHeight.m};
  border: 1px solid ${theme.color.neutral[500]};
  transition: color ${theme.animation.micro},
    background-color ${theme.animation.micro}, border ${theme.animation.micro};
`;

const buttonStyles = ({ theme }) => css`
  z-index: 1;
  cursor: pointer;
  padding: 0 ${theme.spacing.xs};

  &:hover {
    background-color: ${theme.color.neutral[300]};
    border-color: ${theme.color.neutral[700]};
    z-index: 3;
  }

  &:active {
    color: ${theme.color.white};
    background-color: ${theme.color.neutral[700]};
    border-color: ${theme.color.neutral[700]};
  }

  ${styles.focusVisible(theme)};
`;

const leftStyles = ({ theme }) => css`
  margin-right: -1px;
  margin-left: ${theme.spacing.xs};
  border-top-left-radius: ${theme.borderRadius.s};
  border-bottom-left-radius: ${theme.borderRadius.s};
`;

const rightStyles = ({ theme }) => css`
  border-top-right-radius: ${theme.borderRadius.s};
  border-bottom-right-radius: ${theme.borderRadius.s};
`;

const DecrementButton = styled('button')(baseStyles, buttonStyles, leftStyles);

const IncrementButton = styled('button')(baseStyles, buttonStyles, rightStyles);

const servesInputStyles = ({ theme }) => css`
  width: 1.75rem;
  margin-right: -1px;
  appearance: textfield;

  &:hover {
    border-color: ${theme.color.neutral[700]};
    z-index: 3;
  }

  &:focus {
    border: 2px solid ${theme.color.primary[500]};
    z-index: 3;
  }
`;

const ServesInput = styled('input')(baseStyles, servesInputStyles);

const systemInputStyles = ({ theme }) => css`
  ${styles.hideVisually()};

  &:hover + label {
    border-color: ${theme.color.neutral[700]};
    z-index: 3;
  }

  &:focus + label {
    ${styles.focusOutline(theme)};
    border-color: ${theme.color.primary[500]};
    z-index: 3;
  }

  &:checked + label {
    color: ${theme.color.white};
    background-color: ${theme.color.neutral[700]};
    border-color: ${theme.color.neutral[700]};
    z-index: 3;
  }
`;

const SystemInput = styled('input')(systemInputStyles);

const MetricLabel = styled('label')(baseStyles, buttonStyles, leftStyles);

const ImperialLabel = styled('label')(baseStyles, buttonStyles, rightStyles);

export interface IngredientsProps {
  ingredients: RawIngredient[];
  serves: number;
}

export function Ingredients({
  serves,
  ingredients: baseIngredients,
  ...props
}: IngredientsProps): JSX.Element {
  const [value, setValue] = useState(serves);
  const [servings, setServings] = useState(serves);
  const [system, setSystem] = useContext(UnitSystemContext);
  const ingredients = useIngredients(baseIngredients, servings / serves || 1);

  const createChangeHandler = (fn: (prev: number) => number) => () => {
    setServings((prev) => {
      const newServings = clamp(fn(prev), 1, 99);
      setValue(newServings);
      return newServings;
    });
  };

  const handleChange = (event) => {
    // FIXME: Clamp to <99.
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);

    if (newValue) {
      setServings(clamp(newValue, 1, 99));
    }
  };
  const handleDecrement = createChangeHandler((prev) => prev - 1);
  const handleIncrement = createChangeHandler((prev) => prev + 1);
  const handleSystemChange = (newSystem: UnitSystem) => () => {
    setSystem(newSystem);
  };

  return (
    <div {...props}>
      <SectionHeading css={sectionStyles}>Ingredients</SectionHeading>
      <Control>
        <Text as="span" size="s" lineHeight="l" weight="bold">
          Serves
        </Text>
        <DecrementButton onClick={handleDecrement}>-</DecrementButton>
        <ServesInput
          type="number"
          step="1"
          value={value}
          onChange={handleChange}
        />
        <IncrementButton onClick={handleIncrement}>+</IncrementButton>
      </Control>

      <Control role="radiogroup" aria-labelledby="system-label">
        <Text as="span" size="s" lineHeight="l" weight="bold" id="system-label">
          Units in
        </Text>
        <SystemInput
          type="radio"
          id="system-metric"
          name="system"
          value="metric"
          checked={system === 'metric'}
          onClick={handleSystemChange('metric')}
          onChange={() => {
            /**
             * Noop to silence React warning:
             * https://github.com/facebook/react/issues/3070#issuecomment-73311114
             * Change is handled by onClick which has better browser support:
             * https://stackoverflow.com/a/5575369/4620154
             */
          }}
        />
        <MetricLabel htmlFor="system-metric">metric</MetricLabel>
        <SystemInput
          type="radio"
          id="system-imperial"
          name="system"
          value="imperial"
          checked={system === 'imperial'}
          onClick={handleSystemChange('imperial')}
          onChange={() => {
            /**
             * Noop to silence React warning:
             * https://github.com/facebook/react/issues/3070#issuecomment-73311114
             * Change is handled by onClick which has better browser support:
             * https://stackoverflow.com/a/5575369/4620154
             */
          }}
        />
        <ImperialLabel htmlFor="system-imperial">imperial</ImperialLabel>
      </Control>

      <Hr />

      <List>
        {ingredients.map(({ id, title, description }) => (
          <ListItem key={id}>
            <Text size="s" weight="bold">
              {`${title}${description ? ', ' : ' '}`}
            </Text>
            {description}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
