import pluginUnicorn from 'eslint-plugin-unicorn';

const BASE_ABBREVIATIONS = {
  args: true,
  ctx: true,
  db: true,
  e2e: true,
  Env: true,
  env: true,
  err: true,
  fn: true,
  obj: true,
  params: true,
  Prod: true,
  prod: true,
  props: true,
  ref: true,
  Ref: true,
  req: true,
  res: true,
  util: true,
  utils: true,
};

const BASE_ABBREVIATION_IGNORE = ['(^|[._-]|[a-z])[eE]2[eE]($|[._-]|[A-Z])'];

const BASE_ABBREVIATION_REPLACEMENTS = {
  args: false,
  ctx: false,
  db: false,
  e2e: false,
  env: false,
  err: false,
  fn: false,
  obj: false,
  params: false,
  prod: false,
  props: false,
  ref: false,
  req: false,
  res: false,
  util: false,
  utils: false,
};

export function unicorn({ abbreviations = {}, abbreviationIgnore = [] } = {}) {
  return [
    pluginUnicorn.configs.recommended,
    {
      rules: {
        'unicorn/name-replacements': [
          'error',
          {
            allowList: { ...BASE_ABBREVIATIONS, ...abbreviations },
            ignore: [...BASE_ABBREVIATION_IGNORE, ...abbreviationIgnore],
            replacements: BASE_ABBREVIATION_REPLACEMENTS,
          },
        ],
        'unicorn/no-null': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-process-exit': 'off',
        // Default 1 flips `if (x) { a(); b(); }` into a negated guard (`if (!(x)) return;`), which reads worse.
        'unicorn/prefer-early-return': ['error', { maximumStatements: 3 }],
        'unicorn/prefer-continue': ['error', { maximumStatements: 3 }],
        // `always` folds multi-line branches into one sprawling ternary.
        'unicorn/prefer-ternary': ['error', 'only-single-line'],
        // `logical` rewrites `x === undefined ? {} : {…}` into `!(x === undefined) && {…}`.
        'unicorn/consistent-conditional-object-spread': ['error', 'ternary'],
        // Comment layout only; one-line `/** … */` and ` * ` prefixes are the TSDoc / editor default.
        'unicorn/single-line-block-comment-style': 'off',
        'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
        'unicorn/filename-case': [
          'error',
          {
            cases: { kebabCase: true, camelCase: true, pascalCase: true },
            // Jest's conventional directories; v78 started checking directory names.
            ignore: [/^__(tests|mocks|snapshots)__$/u],
          },
        ],
      },
    },
    {
      files: ['**/main.ts'],
      rules: {
        'unicorn/prefer-top-level-await': 'off',
      },
    },
  ];
}
