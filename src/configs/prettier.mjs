import prettierConfig from 'eslint-config-prettier';

export function prettier() {
  return [
    prettierConfig,
    // eslint-config-prettier sets curly to 0 as a "special rule"; with "all" it never conflicts with Prettier
    // (its README, [curly]), so restore the base setting it would otherwise switch off.
    { rules: { curly: ['error', 'all'] } },
  ];
}
