export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-id-pattern': null,
    'selector-class-pattern': null,
  },
};
