
let defaultPresets;

// We release a ES version of Material-UI.
// It's something that matches the latest official supported features of JavaScript.
// Nothing more (stage-1, etc), nothing less (require, etc).
if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['modules', 'production-umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs',
      },
    ],
  ];
}

const defaultAlias = {
  'metadata-core': './packages/metadata-core/src',
};

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  generatorOpts: {
    jsescOption: {
      minimal: true
    }
  },
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
  ],
  env: {
    test: {
      sourceMaps: 'both',
      plugins: [
        [
          'babel-plugin-module-resolver',
          {
            root: ['./'],
            alias: defaultAlias,
          },
        ],
      ],
    },
    es: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        'transform-react-remove-prop-types',
        //'transform-dev-warning',
      ],
      // It's most likely a babel bug.
      // We are using this ignore option in the CLI command but that has no effect.
      ignore: ['**/*.test.js'],
    },
  },
};
