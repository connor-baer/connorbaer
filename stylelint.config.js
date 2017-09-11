module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  defaultSeverity: 'warning',
  ignoreFiles: ['src/brand-styles/**'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['local']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include']
      }
    ],
    'max-nesting-depth': 3,
    'selector-class-pattern': '',
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute']
      }
    ]
  }
};
